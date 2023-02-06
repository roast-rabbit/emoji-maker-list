import addDeleteControl from "./addDeleteControl.js";
import canvasOperations from "./canvasOperations.js";
import loadSVGs from "./loadSVGs.js";

/**
 *
 * @param {string} id
 * @returns
 */
const initCanvas = (id) => {
  return new fabric.Canvas(id, {
    width: 1000,
    height: 1000,
    selection: false,
    selectionBorderColor: "#ddd",
    preserveObjectStacking: true,
  });
};

let canvas = initCanvas("c");

addDeleteControl();
loadSVGs(canvas);

let currentMode = "";
const modes = {
  pan: "pan",
  drawing: "drawing",
};

const toggleMode = function (modeToToggle) {
  canvas.isDrawingMode = false;

  if (modeToToggle === modes.pan) {
    if (currentMode === modes.pan) {
      currentMode = "";
      this.style.backgroundColor = "#fff";
    } else {
      currentMode = modes.pan;
      this.style.backgroundColor = "#ccc";
    }
  } else if (modeToToggle === modes.drawing) {
    if (currentMode === modes.drawing) {
      currentMode = "";
      this.style.backgroundColor = "#fff";
    } else {
      currentMode = modes.drawing;
      canvas.isDrawingMode = true;
      canvas.renderAll();
      this.style.backgroundColor = "#ccc";
    }
  }
};

const togglePanBtn = document.querySelector("#toggle-pan");
togglePanBtn.addEventListener("click", function () {
  toggleMode.call(this, modes.pan);
});

const toggleDrawingBtn = document.querySelector("#toggle-drawing");
toggleDrawingBtn.addEventListener("click", function () {
  toggleMode.call(this, modes.drawing);
});

canvasOperations.setBackgroundImages("./my-image.jpg", canvas);

let mousePressed = false;
const setPanEvent = (canvas) => {
  canvas.on("mouse:move", (event) => {
    if (mousePressed && currentMode === modes.pan) {
      canvas.setCursor("grab");
      canvas.requestRenderAll();
      const delta = new fabric.Point(event.e.movementX, event.e.movementY);
      canvas.relativePan(delta);
    }
  });

  canvas.on("mouse:down", (event) => {
    mousePressed = true;

    currentMode === modes.pan ?? canvas.setCursor("grab");
    canvas.requestRenderAll();
  });
  canvas.on("mouse:up", (event) => {
    mousePressed = false;
    canvas.setCursor("default");
    canvas.requestRenderAll();
  });
};
setPanEvent(canvas);

const toJSONBtn = document.querySelector("#to-json");
toJSONBtn.addEventListener("click", () => {
  const toBeSaved = JSON.stringify(canvas.toJSON());
  console.log(toBeSaved);
  localStorage.setItem("fabricSaved", toBeSaved);
});

const loadJSONBtn = document.querySelector("#load-json");
loadJSONBtn.addEventListener("click", () => {
  const fabricSaved = localStorage.getItem("fabricSaved");
  canvas.clear();
  canvas.loadFromJSON(fabricSaved, canvas.renderAll.bind(canvas));
});
