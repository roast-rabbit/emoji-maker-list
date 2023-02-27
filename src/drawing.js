import { canvas } from "./index.js";
export let currentMode = "";

const drawingLineWidthSelector = document.querySelector("#drawing-line-width");
const drawingColorSelector = document.querySelector("#drawing-color");
const doodleBtn = document.querySelector("#doodle");

// drawingLineWidthSelector.style.display = "none";
// drawingColorSelector.style.display = "none";

let drawingColor = drawingColorSelector.value;
let drawingLineWidth = drawingLineWidthSelector.value;

drawingLineWidthSelector.addEventListener("change", function (e) {
  drawingLineWidth = e.target.value;
  canvas.freeDrawingBrush.width = parseInt(drawingLineWidth, 10) || 1;
  this.setAttribute("value", `${drawingLineWidth}`);
});

drawingColorSelector.addEventListener("change", (e) => {
  drawingColor = e.target.value;
  canvas.freeDrawingBrush.color = drawingColor;
});

export const modes = {
  drawing: "drawing",
};

// const toggleMode = function (modeToToggle) {
//   canvas.isDrawingMode = false;

//   if (modeToToggle === modes.drawing) {
//     if (currentMode === modes.drawing) {
//       currentMode = "";
//       this.classList.remove("active");

//       drawingLineWidthSelector.style.display = "none";
//       drawingColorSelector.style.display = "none";
//       // this.style.backgroundColor = "#fff";
//     } else {
//       this.classList.add("active");
//       canvas.freeDrawingBrush.width = parseInt(drawingLineWidth, 10) || 1;
//       canvas.freeDrawingBrush.color = drawingColor;
//       drawingLineWidthSelector.style.display = "inline-block";
//       drawingColorSelector.style.display = "inline-block";
//       currentMode = modes.drawing;
//       canvas.isDrawingMode = true;
//       canvas.renderAll();
//       // this.style.backgroundColor = "#ccc";
//     }
//   }
// };

doodleBtn.addEventListener("click", function () {
  canvas.freeDrawingBrush.width = parseInt(drawingLineWidth, 10) || 1;
  canvas.freeDrawingBrush.color = drawingColor;
  // drawingLineWidthSelector.style.display = "inline-block";
  // drawingColorSelector.style.display = "inline-block";
  currentMode = modes.drawing;
  canvas.isDrawingMode = true;
  canvas.renderAll();
});
