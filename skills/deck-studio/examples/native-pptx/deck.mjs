// Direct PptxGenJS authoring. SOURCE.md owns the example's meaning.
const C = { navy: "102A43", slate: "486581", cyan: "00ADEE", pale: "EAF6FC", white: "FFFFFF", line: "D9E2EC" };
const FONT = "Arial";

export default function build(pptx) {
  pptx.layout = "LAYOUT_WIDE";
  pptx.title = "A connected review";
  pptx.subject = "Illustrative review, with editable evidence";
  pptx.theme = { headFontFace: FONT, bodyFontFace: FONT, lang: "en-US" };
  function text(slide, value, x, y, w, h, options = {}) {
    slide.addText(value, { x, y, w, h, fontFace: FONT, fontSize: 20, color: C.navy,
      margin: 0, breakLine: false, valign: "mid", ...options });
  }
  function page(title, index) {
    const slide = pptx.addSlide();
    slide.background = { color: C.white };
    text(slide, title, 0.7, 0.62, 11.8, 0.75, { fontSize: 30, bold: true });
    slide.addShape(pptx.ShapeType.line, { x: 0.7, y: 1.5, w: 11.9, h: 0, line: { color: C.cyan, width: 1.4 } });
    text(slide, "ILLUSTRATIVE REVIEW", 0.7, 6.98, 7, 0.2, { fontSize: 9, color: C.slate, charSpacing: 1.4 });
    text(slide, String(index), 12.1, 6.94, 0.5, 0.3, { fontSize: 11, color: C.slate, align: "right" });
    return slide;
  }

  let slide = page("A connected review", 1);
  text(slide, "Follow the requirement through\ncontrols and evidence", 0.7, 2.15, 11.7, 1.7, { fontSize: 38, bold: true });
  text(slide, "A documented control and an effective control are different judgments.", 0.73, 4.5, 10.8, 0.9, { fontSize: 24, color: C.slate });
  slide.addNotes("A generic, illustrative review. This example makes no claim about a real organization or regulatory determination.");

  slide = page("The review chain", 2);
  const chain = [
    { title: "Requirement", body: "What must hold?" },
    { title: "Control", body: "What should happen?" },
    { title: "Evidence", body: "What actually happened?" },
  ];
  chain.forEach((item, index) => {
    const x = 0.7 + index * 4.1;
    slide.addShape(pptx.ShapeType.rect, { x, y: 2.15, w: 3.55, h: 2.45,
      fill: { color: index === 1 ? C.pale : C.white }, line: { color: C.cyan, width: 1.3 } });
    text(slide, item.title, x + 0.22, 2.47, 3.08, 0.55, { fontSize: 25, bold: true });
    text(slide, item.body, x + 0.22, 3.3, 3.08, 0.85, { fontSize: 21, color: C.slate });
    if (index < 2) slide.addShape(pptx.ShapeType.line, { x: x + 3.62, y: 3.35, w: 0.38, h: 0,
      line: { color: C.cyan, width: 2, beginArrowType: "none", endArrowType: "triangle" } });
  });
  text(slide, "The reviewer retains the reasoning, the sources and the unresolved links.", 0.7, 5.25, 11.8, 0.8, { fontSize: 23 });
  slide.addNotes("The boxes, labels and source-to-target connectors are editable native slide objects. The diagram describes a generic review method.");

  slide = page("Four judgments need different evidence", 3);
  const headers = ["Judgment", "Question", "Evidence to inspect"];
  const rows = [
    headers.map(value => ({ text: value, options: { bold: true, color: C.white, fill: C.navy } })),
    ["Documented", "Is the control described?", "The current policy or procedure"],
    ["Adequate as designed", "Would the described control address the requirement?", "The requirement and connected control design"],
    ["Implemented", "Was the control carried out?", "Relevant records of execution"],
    ["Effective", "Did it achieve its intended result?", "Evidence of the result and its context"],
  ];
  slide.addTable(rows, { x: 0.7, y: 1.92, w: 11.9, h: 3.82, colW: [2.65, 4.15, 5.1],
    rowH: [0.62, 0.75, 0.95, 0.75, 0.75], fontFace: FONT, fontSize: 17,
    color: C.navy, fill: C.white, margin: [0.13, 0.16, 0.13, 0.16],
    border: { type: "solid", color: C.line, pt: 0.7 }, valign: "mid", autoPage: false });
  text(slide, "Documentary agreement alone does not establish implementation or effectiveness.", 0.7, 6.03, 11.8, 0.5, { fontSize: 20, color: C.slate });
  slide.addNotes("The table is a native PowerPoint table. The distinctions are illustrative methodological content, not a real assessment.");

  slide = page("Illustrative review work by evidence type", 4);
  slide.addChart(pptx.ChartType.bar, [{ name: "Items reviewed", labels: ["Policies", "Procedures", "Records", "Results"], values: [6, 9, 12, 4] }],
    { x: 0.7, y: 1.95, w: 11.9, h: 4.45, catAxisLabelFontFace: FONT, catAxisLabelFontSize: 16,
      valAxisLabelFontFace: FONT, valAxisLabelFontSize: 13, valAxisMinVal: 0, valAxisMaxVal: 12, valAxisMajorUnit: 3,
      chartColors: [C.cyan], showLegend: false, showTitle: false, showValue: true,
      dataLabelPosition: "outEnd", dataLabelFormatCode: "0", dataLabelColor: C.navy, dataLabelFormatCodeSourceLinked: false,
      catAxisLineColor: C.line, valAxisLineColor: C.line, showCatName: false, showBorder: false });
  slide.addNotes("All chart values are invented solely to demonstrate an editable chart with an embedded workbook. They are not measurements, customer results or expected outcomes.");
}
