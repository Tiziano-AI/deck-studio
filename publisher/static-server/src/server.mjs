#!/usr/bin/env node
import { createReadStream, readFileSync, realpathSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { timingSafeEqual } from "node:crypto";
import { ArtifactLibrary } from "./library.mjs";
import { artifactPath, DECK_CSP } from "../../../skills/deck-studio/scripts/delivery_profile.mjs";
import { GatewayError, PolicyStore, verifier } from "./policy.mjs";
import { renderGallery, renderLogin } from "./gallery.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const COOKIE_NAME = "decks_session";
const MAX_BODY_BYTES = 16384;
const GALLERY_CSP = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'";

function equal(left, right) {
  return typeof left === "string" && typeof right === "string" && timingSafeEqual(Buffer.from(verifier(left)), Buffer.from(verifier(right)));
}

function cookies(request) {
  return new Map((request.headers.cookie ?? "").split(";").map(part => {
    const separator = part.indexOf("=");
    return [part.slice(0, separator).trim(), part.slice(separator + 1).trim()];
  }).filter(([key]) => key));
}

function cookie(value, production, clear = false) {
  return [`${COOKIE_NAME}=${value}`, "Path=/", "HttpOnly", "SameSite=Lax", `Max-Age=${clear ? 0 : 43200}`, ...(production ? ["Secure"] : [])].join("; ");
}

function csrfToken(sessionSecret) { return verifier(`decks-csrf\0${sessionSecret}`); }

function returnPath(path, fallback = "/collection") {
  if (typeof path !== "string" || path.length > 1500 || path.includes("?") || path.includes("#") || path.includes("\\") || /[\x00-\x20\x7f]/.test(path)) return fallback;
  if (path === "/" || path === "/collection") return path;
  const normalized = path.endsWith("/") ? path.slice(0, -1) : path;
  return normalized.startsWith("/decks/") && artifactPath(normalized.slice(1)) ? path : fallback;
}

async function body(request, type) {
  if ((request.headers["content-type"] ?? "").split(";", 1)[0].trim() !== type) {
    throw new GatewayError("unsupported_media_type", `Content-Type must be ${type}.`, 415);
  }
  if (Number(request.headers["content-length"] ?? 0) > MAX_BODY_BYTES) throw new GatewayError("body_too_large", "Request body exceeds the supported size.", 413);
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw new GatewayError("body_too_large", "Request body exceeds the supported size.", 413);
    chunks.push(chunk);
  }
  const text = Buffer.concat(chunks).toString("utf8");
  try {
    if (type === "application/json") {
      const parsed = JSON.parse(text);
      if (!parsed || Array.isArray(parsed) || typeof parsed !== "object") throw new Error("object required");
      return parsed;
    }
    const values = new URLSearchParams(text);
    if ([...values.keys()].some(key => values.getAll(key).length > 1)) throw new Error("duplicate fields");
    return Object.fromEntries(values);
  } catch {
    throw new GatewayError("invalid_input", "Request body must be a valid object with unique fields.");
  }
}

class RateLimit {
  constructor(now, maximum, capacity = 1024) { this.now = now; this.maximum = maximum; this.capacity = capacity; this.entries = new Map(); }
  admit(id) {
    const now = this.now();
    for (const [key, entry] of this.entries) if (entry.until <= now) this.entries.delete(key);
    let entry = this.entries.get(id);
    if (!entry) {
      if (this.entries.size >= this.capacity) throw new GatewayError("rate_limited", "Request capacity reached; retry after the rate-limit window.", 429);
      entry = { count: 0, until: now + 60000 };
      this.entries.set(id, entry);
    }
    if (++entry.count > this.maximum) throw new GatewayError("rate_limited", "Too many requests; retry after the rate-limit window.", 429);
  }
}

function send(response, status, value, headers = {}) {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8", ...headers });
  response.end(JSON.stringify(value));
}

function html(response, status, value, headers = {}) {
  response.writeHead(status, { "content-type": "text/html; charset=utf-8", "content-security-policy": GALLERY_CSP, ...headers });
  response.end(value);
}

function stream(response, file, head = false, headers = {}) {
  response.writeHead(200, { "content-type": file.contentType, "content-length": file.size,
    ...(file.downloadName === "deck.pptx" ? { "content-disposition": 'attachment; filename="deck.pptx"' } : {}), ...headers });
  const source = createReadStream(null, { fd: file.fd, autoClose: true });
  source.on("error", () => response.destroy());
  if (head) { source.destroy(); response.end(); }
  else source.pipe(response);
}

function routePath(rawTarget) {
  if (!rawTarget.startsWith("/") || rawTarget.startsWith("//")) throw new GatewayError("forbidden", "Invalid request target.", 403);
  let decoded;
  try { decoded = decodeURIComponent(rawTarget.split("?", 1)[0]); }
  catch { throw new GatewayError("forbidden", "Invalid path encoding.", 403); }
  if (decoded.includes("\\") || /[\x00-\x1f\x7f]/.test(decoded) || decoded.split("/").some(part => part === "." || part === "..")) {
    throw new GatewayError("forbidden", "Invalid request path.", 403);
  }
  return decoded;
}

function keysOf(input, allowed) {
  if (Object.keys(input).some(key => !allowed.includes(key))) throw new GatewayError("invalid_input", `Accepted fields: ${allowed.join(", ") || "none"}.`);
  return input;
}

/** One instance owns one SQLite store. Artifacts never imply access policy. */
export function createGateway({ libraryRoot, policyPath, managementToken, origin, production = false, site = {}, now = () => Date.now(), loginLimit = 30, admissionPython = "python3", admissionTimeoutMs = 30000 } = {}) {
  if (typeof managementToken !== "string" || managementToken.length < 32 || /[\s\x00-\x1f]/.test(managementToken) || managementToken.startsWith("dv_")) {
    throw new GatewayError("configuration", "A separate DECKS_MANAGEMENT_TOKEN of at least 32 non-whitespace characters is required.", 503);
  }
  if (origin) {
    const parsed = new URL(origin);
    if (origin !== parsed.origin || !["http:", "https:"].includes(parsed.protocol) || parsed.username || parsed.password || (production && parsed.protocol !== "https:")) {
      throw new GatewayError("configuration", "DECKS_ORIGIN must be an exact origin, HTTPS in production.", 503);
    }
  } else if (production) throw new GatewayError("configuration", "DECKS_ORIGIN is required in production.", 503);

  const library = new ArtifactLibrary(libraryRoot, { admissionPython, admissionTimeoutMs });
  const policy = new PolicyStore(policyPath, library.root, { now });
  const loginRate = new RateLimit(now, loginLimit);
  const globalLoginRate = new RateLimit(now, loginLimit * 10, 1);
  const managementRate = new RateLimit(now, 300);
  const siteInfo = { title: site.title || "Decks", brand: site.brand || "decks" };
  const server = createServer((request, response) => {
    response.setHeader("cache-control", "no-store");
    response.setHeader("x-content-type-options", "nosniff");
    response.setHeader("referrer-policy", "no-referrer");
    response.setHeader("x-frame-options", "SAMEORIGIN");
    if (production) response.setHeader("strict-transport-security", "max-age=31536000");
    handle(request, response).catch(error => {
      if (response.headersSent) { response.destroy(); return; }
      const known = error instanceof GatewayError;
      const status = known ? error.status : 503;
      if (status === 429) response.setHeader("retry-after", "60");
      // No request targets, credential bodies, SQL errors or raw secrets enter logs/results.
      send(response, status, { ok: false, error: { code: known ? error.code : "unavailable", message: known ? error.message : "Gateway dependency unavailable; no access granted." } });
    });
  });
  server.requestTimeout = 15000;
  server.headersTimeout = 10000;
  server.maxHeadersCount = 60;
  server.on("close", () => { library.close(); policy.close(); });

  function actualOrigin() { return origin ?? `http://127.0.0.1:${server.address().port}`; }
  function management(request) {
    const authorization = request.headers.authorization;
    return typeof authorization === "string" && authorization.startsWith("Bearer ") && equal(authorization.slice(7), managementToken);
  }
  function viewer(request) {
    const value = cookies(request).get(COOKIE_NAME);
    return { value, session: policy.session(value) };
  }
  function admitLogin(request) {
    // The connection address is authoritative; arbitrary forwarded headers are not.
    loginRate.admit(request.socket.remoteAddress ?? "unknown");
    globalLoginRate.admit("all");
  }
  function loginState(request, response) {
    const state = viewer(request);
    if (!state.session) {
      admitLogin(request);
      state.value = policy.createSession();
      state.session = policy.session(state.value);
      response.setHeader("set-cookie", cookie(state.value, production));
    }
    return state;
  }
  function sameOrigin(request) {
    if (request.headers.origin !== actualOrigin() || (request.headers["sec-fetch-site"] && request.headers["sec-fetch-site"] !== "same-origin")) {
      throw new GatewayError("forbidden", "A same-origin browser submission is required.", 403);
    }
  }
  function checkCsrf(request, input) {
    sameOrigin(request);
    const state = viewer(request);
    if (!state.session || !equal(input.csrf, csrfToken(state.value))) throw new GatewayError("forbidden", "Session form expired; open the form again.", 403);
    return state;
  }
  function loginForm(request, response, status, error, target) {
    const state = loginState(request, response);
    html(response, status, renderLogin({ site: siteInfo, authenticated: Boolean(state.session.key_id), error,
      returnTo: returnPath(target, ""), csrf: csrfToken(state.value) }));
  }

  async function api(request, response, pathname) {
    // Management is a non-browser bearer surface. Viewing cookies never grant it.
    if (!management(request) || request.headers.origin) throw new GatewayError("unauthorized", "A management bearer credential is required outside the browser viewer.", 401);
    managementRate.admit(request.socket.remoteAddress ?? "unknown");
    if (request.method === "GET") {
      const routes = new Map([
        ["/api/v1/keys", () => ({ keys: policy.listKeys(), complete: true })],
        ["/api/v1/decks", () => ({ decks: policy.decks(), complete: true })],
        ["/api/v1/releases", () => library.listReleases()],
      ]);
      if (routes.has(pathname)) { send(response, 200, { ok: true, data: routes.get(pathname)() }); return; }
      const match = /^\/api\/v1\/decks\/([^/]+)\/access$/.exec(pathname);
      if (match) { send(response, 200, { ok: true, data: policy.effective(match[1]) }); return; }
    }
    if (request.method !== "POST") throw new GatewayError("not_found", "Management operation not found.", 404);
    const input = await body(request, "application/json");
    let result;
    if (pathname === "/api/v1/keys") {
      keysOf(input, ["label", "scope"]);
      result = policy.transaction(() => policy.issueKey(input.label, input.scope));
    } else {
      const key = /^\/api\/v1\/keys\/([^/]+)\/(rotate|revoke)$/.exec(pathname);
      const deck = /^\/api\/v1\/decks\/([^/]+)\/(publish|public|grant|revoke)$/.exec(pathname);
      if (key) {
        keysOf(input, []);
        result = policy.transaction(() => key[2] === "rotate" ? policy.rotateKey(key[1]) : policy.revokeKey(key[1]));
      } else if (deck) {
        const [ , deckId, action ] = deck;
        keysOf(input, action === "publish" ? ["release_id"] : action === "public" ? ["public"] : ["key_id"]);
        const admitted = action === "publish" ? await library.verifyForPublication(deckId, input.release_id) : null;
        if (admitted) library.recheckPublication(admitted);
        result = policy.transaction(() => {
          if (action === "publish") return policy.publish(deckId, input.release_id);
          if (action === "public") return policy.setPublic(deckId, input.public);
          return policy.assign(deckId, input.key_id, action === "grant");
        });
      } else throw new GatewayError("not_found", "Management operation not found.", 404);
    }
    send(response, 200, { ok: true, data: result });
  }

  async function handle(request, response) {
    const pathname = routePath(request.url ?? "/");
    policy.assertAvailable();
    if (pathname === "/healthz" && ["GET", "HEAD"].includes(request.method)) {
      send(response, 200, { ok: true }); return;
    }
    if (request.headers.host !== new URL(actualOrigin()).host) throw new GatewayError("forbidden", "Unexpected request host.", 403);
    if (pathname.startsWith("/api/")) { await api(request, response, pathname); return; }
    if (pathname === "/login") {
      if (request.method === "GET") {
        const query = new URL(request.url, actualOrigin()).searchParams;
        loginForm(request, response, 200, "", query.get("return_to")); return;
      }
      if (request.method === "POST") {
        admitLogin(request);
        const input = keysOf(await body(request, "application/x-www-form-urlencoded"), ["key", "csrf", "return_to"]);
        const state = checkCsrf(request, input);
        const key = policy.authenticate(input.key);
        if (!key) { loginForm(request, response, 401, "This key is not valid.", input.return_to); return; }
        let target = returnPath(input.return_to, "");
        if (!target) {
          const decks = policy.collection(key);
          target = decks.length === 1 ? library.audience(decks[0]).html : "/collection";
        }
        const value = policy.transaction(() => { policy.deleteSession(state.value); return policy.createSession(key.key_id); });
        response.writeHead(303, { location: target, "set-cookie": cookie(value, production) }); response.end(); return;
      }
      throw new GatewayError("method_not_allowed", "Use GET or POST for login.", 405);
    }
    if (pathname === "/logout") {
      if (request.method !== "POST") throw new GatewayError("method_not_allowed", "Logout requires POST.", 405);
      const input = keysOf(await body(request, "application/x-www-form-urlencoded"), ["csrf", "return_to"]);
      const state = checkCsrf(request, input);
      policy.deleteSession(state.value);
      response.writeHead(303, { location: "/", "set-cookie": cookie("", production, true) }); response.end(); return;
    }
    if (!["GET", "HEAD"].includes(request.method)) throw new GatewayError("method_not_allowed", "This route is read-only.", 405);
    if (pathname === "/favicon.ico") { response.writeHead(204); response.end(); return; }
    if (pathname.startsWith("/ui/")) {
      const mapping = new Map([["/ui/gallery.css", ["src/gallery.css", "text/css; charset=utf-8"]], ["/ui/gallery-client.mjs", ["src/gallery-client.mjs", "text/javascript; charset=utf-8"]]]);
      let file = mapping.get(pathname);
      if (!file && /^\/ui\/fonts\/[A-Za-z0-9_-]+\.woff2$/.test(pathname)) file = [pathname.slice(1), "font/woff2"];
      if (!file) throw new GatewayError("not_found", "UI resource not found.", 404);
      const absolute = realpathSync(resolve(ROOT, file[0]));
      if (absolute !== resolve(ROOT, file[0])) throw new GatewayError("not_found", "UI resource not found.", 404);
      response.writeHead(200, { "content-type": file[1], "content-length": statSync(absolute).size });
      if (request.method === "HEAD") response.end();
      else response.end(readFileSync(absolute));
      return;
    }
    if (pathname === "/catalog.json") {
      if (!management(request) || request.headers.origin) throw new GatewayError("not_found", "Resource not found.", 404);
      stream(response, { ...library.containedFile("catalog.json"), contentType: "application/json; charset=utf-8" }, request.method === "HEAD"); return;
    }
    const state = viewer(request);
    if (pathname === "/" || pathname === "/collection") {
      if (pathname === "/collection" && !state.session?.key_id) { loginForm(request, response, 401, "", "/collection"); return; }
      const decks = pathname === "/" ? policy.decks().filter(deck => deck.is_public) : policy.collection(state.session);
      html(response, 200, renderGallery({ decks: decks.map(deck => library.audience(deck)),
        collection: pathname === "/collection" ? { label: state.session.label, scope: state.session.scope } : null,
        authenticated: Boolean(state.session?.key_id), site: siteInfo, csrf: state.session ? csrfToken(state.value) : "", returnTo: pathname }));
      return;
    }
    if (pathname.startsWith("/decks/")) {
      const match = /^\/decks\/([^/]+)\/([^/]+)\/(.*)$/.exec(pathname);
      if (!match) throw new GatewayError("not_found", "Deck resource not found.", 404);
      const [ , deckId, releaseId, leaf ] = match;
      const path = leaf || "deck.html";
      if (management(request) && !request.headers.origin) {
        stream(response, library.openArtifact(deckId, releaseId, path, true), request.method === "HEAD"); return;
      }
      const deck = policy.deck(deckId);
      // Hidden releases and backstage paths reveal no metadata, even to an owner viewer.
      if (!deck || deck.release_id !== releaseId || !artifactPath(path) || path === "deck-manifest.json" || path.split("/")[0] === "proof") {
        throw new GatewayError("not_found", "Deck resource not found.", 404);
      }
      if (!policy.canRead(deck, state.session)) {
        if (!state.session?.key_id) { loginForm(request, response, 401, "", pathname); return; }
        throw new GatewayError("forbidden", "This key does not grant access to that deck.", 403);
      }
      stream(response, library.openArtifact(deckId, releaseId, path), request.method === "HEAD", { "content-security-policy": DECK_CSP }); return;
    }
    throw new GatewayError("not_found", "Resource not found.", 404);
  }
  return server;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const port = Number(process.env.PORT ?? "3000");
    if (!Number.isInteger(port) || port < 1 || port > 65535) throw new GatewayError("configuration", "PORT must be a valid TCP port.", 503);
    const production = process.env.NODE_ENV === "production";
    const server = createGateway({ libraryRoot: process.env.DECKS_LIBRARY_ROOT, policyPath: process.env.DECKS_POLICY_PATH,
      managementToken: process.env.DECKS_MANAGEMENT_TOKEN, origin: process.env.DECKS_ORIGIN, production, admissionPython: process.env.DECKS_ADMISSION_PYTHON,
      site: { title: process.env.DECKS_SITE_TITLE, brand: process.env.DECKS_SITE_BRAND } });
    server.listen(port, process.env.HOST ?? (production ? "0.0.0.0" : "127.0.0.1"), () => console.log("Decks gateway listening."));
    for (const signal of ["SIGINT", "SIGTERM"]) process.once(signal, () => server.close(() => process.exit(0)));
  } catch (error) {
    console.error(JSON.stringify({ ok: false, error: { code: error.code ?? "startup_failed", message: error instanceof GatewayError ? error.message : "Gateway startup failed; configuration and policy must be checked." } }));
    process.exitCode = 1;
  }
}
