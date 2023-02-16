import { canvas } from "./index.js";
import { updateHistory } from "./undo.js";
import {
  layerData,
  setLayerData,
  showCurrentLayerInfo,
  showSelectionOnLayerInfoList,
} from "./index.js";

let text = "";
const input = document.querySelector("input");
const addTextToCanvas = document.querySelector("#add-text-to-canvas");

let color = "#000";
const textColor = document.querySelector("#text-color");
let textToAdd;

textColor.addEventListener("input", (e) => {
  color = e.target.value;
  console.log(color);
  if (textToAdd) {
    textToAdd.set({ fill: color });
    canvas.renderAll();
    setLayerData(canvas.getObjects());

    showCurrentLayerInfo(layerData);
    showSelectionOnLayerInfoList();
    updateHistory();
  }
});

input.addEventListener("input", (e) => {
  text = input.value;
});

addTextToCanvas.addEventListener("click", () => {
  if (!textToAdd) {
    textToAdd = new fabric.IText(text, {
      fontSize: 20,
      fontFamily: "Helvetica",
      fill: color,
      strokeWidth: 3,
      top: 200,
      left: 150,
      onCanvasEditing: true,
      borderColor: "#0c8ce9",
      cornerColor: "#0c8ce9",
      cornerSize: 10,
      transparentCorners: false,
    });

    canvas.add(textToAdd);
    setLayerData(canvas.getObjects());

    showCurrentLayerInfo(layerData);
    showSelectionOnLayerInfoList();
    updateHistory();
  }
});
