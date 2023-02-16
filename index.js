import addDeleteControl from "./addDeleteControl.js";
import alterRotationControl from "./alterRotationControl.js";
import canvasOperations from "./canvasOperations.js";
import loadSVGs from "./loadSVGs.js";
import loadSingleSVG from "./loadSingleSVG.js";
import alterScaleControl from "./alterScaleControl.js";
import { makeListItemsDraggable } from "./dragDrop.js";
import { updateHistory, undo, redo } from "./undo.js";
// import { fabric } from "fabric";
import "./text.js";
/**
 *
 * @param {string} id
 * @returns new canvas object
 */
const initCanvas = (id) => {
  return new fabric.Canvas(id, {
    width: 300,
    height: 300,
    selection: false,
    selectionBorderColor: "#ddd",
    preserveObjectStacking: true,
    backgroundColor: "#666a82",
  });
};

export let canvas = initCanvas("c");

addDeleteControl();
alterRotationControl(canvas);
alterScaleControl(canvas);

loadSVGs(canvas);

// layerData is a global object keeping track when all the layer info changes
export let layerData;

export function setLayerData(newLayerData, newOrder = [0]) {
  // order changes, only update order
  if (!newLayerData) {
    const currentObjects = canvas.getObjects();
    const objectsToSet = newOrder.map((index) => {
      return currentObjects[index];
    });
    layerData = objectsToSet;
  } else {
    // layer data changes
    layerData = canvas.getObjects();
  }
}

export function updateCanvas(newLayerData) {
  canvas.remove(...canvas.getObjects());
  console.log(canvas.getObjects());
  newLayerData.forEach((layer) => {
    canvas.add(layer);
  });
  updateHistory();
}

// positionData object holds value read from positionData.json file
let positionData;
/**
 *
 * @param {*} positionData
 * this function set a global variable positionData object
 */
const loadPositionData = async function (positionData) {
  const res = await fetch("./positionData.json");
  positionData = await res.json();
  // attach event listeners to each button
  const buttons = document.querySelectorAll("button.shape");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      loadSingleSVG(this.dataset.name, canvas, positionData);
    });
  });
};

loadPositionData(positionData);

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
  canvas.loadFromJSON(fabricSaved, () => {
    canvas.renderAll.bind(canvas),
      // set each objects selection border color property etc.
      canvas._objects.forEach((obj) => {
        obj.set({
          borderColor: "#0c8ce9",
          cornerColor: "#0c8ce9",
          cornerSize: 10,
          transparentCorners: false,
        });
      });
  });
});

// Add an event listener to the document object to listen to the delete key pressed (in Windows it's named "Backspace" key, in mac it's named "delete"), and it will delete current selected obejct on canvas
document.addEventListener("keydown", function (event) {
  const { key } = event;
  if (key === "Backspace") {
    if (!canvas.getActiveObject()?.text) {
      removeActiveObject();
    }
  }
});

export function showCurrentLayerInfo(layerData, newOrder) {
  const layerList = document.querySelector("#layer-list");
  layerList.innerHTML = "";
  const obejcts = layerData ? layerData : canvas.getObjects();
  obejcts.forEach((obejct, index) => {
    layerList.insertAdjacentHTML(
      "afterbegin",
      `<li style="display: flex; align-items: center; height:60px; gap:10px;" data-index=${
        newOrder?.[index] || index
      } class="draggable" draggable="true">
          <div><img style="object-fit: contain; height:80%" src="${obejct.toDataURL()}"/></div>
          <div>Layer ${obejcts.length - index}</div>
      </li>`
    );
  });
  makeListItemsDraggable();
}

export function removeActiveObject() {
  canvas.remove(canvas.getActiveObject());
  showCurrentLayerInfo();
}

document.querySelector("#clear-all").addEventListener("click", () => {
  canvas.remove(...canvas.getObjects());
  setLayerData();
  showCurrentLayerInfo(layerData);
});

document.querySelector("#set-transparent-background").addEventListener("click", () => {
  canvas.setBackgroundColor(null, canvas.renderAll.bind(canvas));
});

document.getElementById("undo").addEventListener("click", () => {
  undo();
});

document.querySelector("#redo").addEventListener("click", () => {
  redo();
});

export function getCurrentOrder() {
  const layers = document.querySelectorAll("li");
  if (layers.length !== 0) {
    return [...layers].map((layer) => {
      return layer.dataset.index;
    });
  } else {
    return [0];
  }
}

function onObjectSelected(e) {
  showSelectionOnLayerInfoList();
}

export function showSelectionOnLayerInfoList() {
  const selectedObject = canvas.getActiveObject();
  const selectedObjectIndex = canvas.getObjects().indexOf(selectedObject);

  const layerInfoList = document.querySelectorAll("li");
  layerInfoList.forEach((item) => {
    item.classList.remove("active");
  });
  console.log(selectedObjectIndex);
  if (selectedObjectIndex < 0) return;
  [...layerInfoList].reverse()[selectedObjectIndex].classList.add("active");
}
canvas.on("selection:created", onObjectSelected);
canvas.on("selection:updated", onObjectSelected);

canvas.on("object:modified", () => {
  updateHistory();
});

export function setActiveObjectOnCanvas(indexToSet) {
  canvas.setActiveObject(canvas.item(indexToSet));
  canvas.renderAll();
}

document.querySelector("ul").addEventListener("click", (e) => {
  const selectedLayer = e.target.closest("li");
  const selectedLayerIndex = selectedLayer.dataset.index;
  setActiveObjectOnCanvas(selectedLayerIndex);
});
