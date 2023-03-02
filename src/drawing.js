import { canvas } from "./index.js";
import { updateHistory } from "./undo.js";
export let currentMode = "";

const drawingLineWidthSelector = document.querySelector("#drawing-line-width");
const drawingColorSelector = document.querySelector("#drawing-color");
const doodleBtn = document.querySelector("#doodle");



// drawingLineWidthSelector.style.display = "none";
// drawingColorSelector.style.display = "none";

let drawingColor = drawingColorSelector.value;
document.querySelector('label[for="drawing-color"]').style = `border:1px solid ${drawingColor}`;

let drawingLineWidth = drawingLineWidthSelector.value;

drawingLineWidthSelector.addEventListener("change", function (e) {
  drawingLineWidth = e.target.value;
  canvas.freeDrawingBrush.width = parseInt(drawingLineWidth, 10) || 1;
  this.setAttribute("value", `${drawingLineWidth}`);
});

drawingColorSelector.addEventListener("change", (e) => {
  drawingColor = e.target.value;
  document.querySelector('label[for="drawing-color"]').style = `border:1px solid ${drawingColor}`;
  canvas.freeDrawingBrush.color = drawingColor;
});

export const modes = {
  drawing: "drawing",
};

doodleBtn.addEventListener("click", function () {
  document.querySelector("#doodle-active-icon").classList.remove("hide");
  canvas.freeDrawingBrush.width = parseInt(drawingLineWidth, 10) || 1;
  canvas.freeDrawingBrush.color = drawingColor;
  // drawingLineWidthSelector.style.display = "inline-block";
  // drawingColorSelector.style.display = "inline-block";
  currentMode = modes.drawing;
  canvas.isDrawingMode = true;

  canvas.renderAll();
});
