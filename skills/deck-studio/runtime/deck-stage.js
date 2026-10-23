(() => {
  const DESIGN_WIDTH = 1920;
  const DESIGN_HEIGHT = 1080;
  const CONTROL_HIDE_MS = 1600;

  const clampIndex = (value, total) => Math.max(0, Math.min(total - 1, value));
  const pad2 = (value) => String(value).padStart(2, "0");

  const state = {
    index: 0,
    numberBuffer: "",
    controlsTimer: 0,
    numberTimer: 0,
  };

  const stage = document.querySelector(".deck-stage");
  const slides = Array.from(document.querySelectorAll(".slide"));

  if (!stage || slides.length === 0) {
    document.documentElement.dataset.webSlidesError = "missing-stage-or-slides";
    return;
  }

  const controls = document.createElement("nav");
  controls.className = "deck-controls";
  controls.setAttribute("aria-label", "Slide controls");
  controls.innerHTML = `
    <button class="deck-button" type="button" data-action="prev" aria-label="Previous slide">‹</button>
    <span class="deck-count" aria-live="polite"><span data-current>01</span>/<span data-total>${pad2(slides.length)}</span></span>
    <button class="deck-button" type="button" data-action="next" aria-label="Next slide">›</button>
    <button class="deck-button" type="button" data-action="reset" aria-label="Reset to first slide" title="Reset to first slide (R)" aria-keyshortcuts="R"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10a9 9 0 1 1 2.7 8.4M3 4v6h6"/></svg></button>
  `;

  document.body.append(controls);
  stage.tabIndex = -1;

  const currentEl = controls.querySelector("[data-current]");

  const scaleStage = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scale = Math.min(viewportWidth / DESIGN_WIDTH, viewportHeight / DESIGN_HEIGHT);
    const left = (viewportWidth - DESIGN_WIDTH * scale) / 2;
    const top = (viewportHeight - DESIGN_HEIGHT * scale) / 2;
    stage.style.transform = `translate(${left}px, ${top}px) scale(${scale})`;
    stage.dataset.scale = String(scale);
    stage.dataset.offsetLeft = String(left);
    stage.dataset.offsetTop = String(top);
  };

  const showControls = () => {
    controls.dataset.visible = "true";
    window.clearTimeout(state.controlsTimer);
    state.controlsTimer = window.setTimeout(() => {
      controls.dataset.visible = "false";
    }, CONTROL_HIDE_MS);
  };

  const dispatchSlideChange = (previousIndex, reason) => {
    const event = new CustomEvent("webslides:slidechange", {
      bubbles: true,
      detail: {
        index: state.index,
        previousIndex,
        total: slides.length,
        reason,
        slide: slides[state.index],
      },
    });
    stage.dispatchEvent(event);
  };

  const goTo = (targetIndex, reason = "api") => {
    if (!Number.isInteger(targetIndex)) return state.index;
    const nextIndex = clampIndex(targetIndex, slides.length);
    const previousIndex = state.index;
    // Native hash links can dispatch both popstate and hashchange. The second
    // notification must not cancel number entry begun after the first one.
    if (reason !== "history" || nextIndex !== previousIndex) {
      window.clearTimeout(state.numberTimer);
      state.numberBuffer = "";
    }
    const hash = `#slide-${nextIndex + 1}`;
    if (window.location.hash !== hash) {
      const method = reason === "init" || reason === "history" ? "replaceState" : "pushState";
      window.history[method](null, "", hash);
    }
    if (nextIndex === previousIndex && reason !== "init") {
      showControls();
      return state.index;
    }

    if (slides[previousIndex].contains(document.activeElement)) stage.focus({ preventScroll: true });
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === nextIndex;
      slide.classList.toggle("active", active);
      slide.classList.toggle("visible", active);
      slide.setAttribute("aria-hidden", active ? "false" : "true");
      slide.inert = !active;
      if (active) {
        slide.dataset.active = "true";
      } else {
        delete slide.dataset.active;
      }
    });

    state.index = nextIndex;
    currentEl.textContent = pad2(nextIndex + 1);
    document.documentElement.dataset.currentSlide = String(nextIndex + 1);
    showControls();
    dispatchSlideChange(previousIndex, reason);
    return state.index;
  };

  const next = (reason = "api") => goTo(state.index + 1, reason);
  const prev = (reason = "api") => goTo(state.index - 1, reason);
  const reset = (reason = "api") => goTo(0, reason);

  const parseHashIndex = () => {
    const match = window.location.hash.match(/^#slide-([1-9]\d*)$/);
    if (!match) return 0;
    const value = Number(match[1]);
    return Number.isSafeInteger(value) ? clampIndex(value - 1, slides.length) : 0;
  };

  const flushNumberBuffer = () => {
    if (!state.numberBuffer) return;
    const target = Number(state.numberBuffer);
    state.numberBuffer = "";
    if (Number.isFinite(target) && target >= 1) {
      goTo(target - 1, "keyboard");
    }
  };

  const handleKeydown = (event) => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey ||
        event.isComposing || isInteractive(event.target)) return;

    if (/^\d$/.test(event.key)) {
      state.numberBuffer = `${state.numberBuffer}${event.key}`.slice(-3);
      window.clearTimeout(state.numberTimer);
      state.numberTimer = window.setTimeout(flushNumberBuffer, 700);
      showControls();
      event.preventDefault();
      return;
    }

    if (event.key === "Escape" || event.key === "Enter") {
      if (!state.numberBuffer) return;
      window.clearTimeout(state.numberTimer);
      if (event.key === "Enter") flushNumberBuffer();
      else state.numberBuffer = "";
      event.preventDefault();
      return;
    }

    const actions = {
      ArrowRight: () => next("keyboard"),
      PageDown: () => next("keyboard"),
      " ": () => next("keyboard"),
      ArrowLeft: () => prev("keyboard"),
      PageUp: () => prev("keyboard"),
      Home: () => goTo(0, "keyboard"),
      End: () => goTo(slides.length - 1, "keyboard"),
      r: () => reset("keyboard"),
      R: () => reset("keyboard"),
    };

    const action = actions[event.key];
    if (action) {
      action();
      event.preventDefault();
    }
  };

  const isInteractive = (target) => target instanceof Element && Boolean(target.closest(
    'a, button, input, textarea, select, summary, video, audio, [contenteditable]:not([contenteditable="false"]), [tabindex]:not([tabindex="-1"]), [role="button"], [role="link"], [role="textbox"], [role="slider"], [role="menu"], [role="tablist"]',
  ));

  const handlePointerAction = (event) => {
    const target = event.target instanceof Element ? event.target.closest("[data-action]") : null;
    if (!target) return;
    const action = target.dataset.action;
    if (action === "next") next("tap");
    if (action === "prev") prev("tap");
    if (action === "reset") reset("tap");
  };

  slides.forEach((slide, index) => {
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `${index + 1} of ${slides.length}`);
    if (!slide.dataset.title) {
      slide.dataset.title = `Slide ${index + 1}`;
    }
  });

  window.addEventListener("resize", scaleStage);
  window.addEventListener("orientationchange", scaleStage);
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("hashchange", () => goTo(parseHashIndex(), "history"));
  window.addEventListener("popstate", () => goTo(parseHashIndex(), "history"));
  controls.addEventListener("click", handlePointerAction);
  controls.addEventListener("focusin", showControls);
  controls.addEventListener("focusout", showControls);
  // Observe taps without adding an overlay above audience links or controls.
  let touchStart = null;
  document.addEventListener("pointerdown", (event) => {
    touchStart = event.pointerType === "touch" && !isInteractive(event.target)
      ? { id: event.pointerId, x: event.clientX, y: event.clientY } : null;
  });
  document.addEventListener("pointercancel", () => { touchStart = null; });
  document.addEventListener("pointerup", (event) => {
    const start = touchStart;
    touchStart = null;
    if (!start || start.id !== event.pointerId || event.defaultPrevented || isInteractive(event.target) ||
        Math.hypot(event.clientX - start.x, event.clientY - start.y) > 12) return;
    if (event.clientX < window.innerWidth / 3) prev("tap");
    else if (event.clientX > window.innerWidth * 2 / 3) next("tap");
    else showControls();
  });
  document.addEventListener("pointermove", showControls);

  window.WebSlidesStudio = {
    current: () => state.index,
    total: () => slides.length,
    goTo,
    next,
    prev,
    reset,
    scaleStage,
  };

  scaleStage();
  goTo(parseHashIndex(), "init");
  document.documentElement.dataset.webSlidesReady = "true";
})();
