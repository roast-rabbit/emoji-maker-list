import { canvas } from "./index.js";
import { updateHistory } from "./undo.js";
import {
  layerData,
  setLayerData,
  showCurrentLayerInfo,
  showSelectionOnLayerInfoList,
} from "./index.js";

let text = "";

const addTextToCanvas = document.querySelector("#add-text-to-canvas");

let color = "#000";
const textColor = document.querySelector("#text-color");
let textToAdd;

textColor.addEventListener("input", (e) => {
  [textToAdd] = canvas.getObjects().filter((object) => object.type === "i-text");
  console.log(textToAdd);
  color = e.target.value;

  if (textToAdd) {
    textToAdd.set({ fill: color });
    canvas.renderAll();
    setLayerData(canvas.getObjects());

    showCurrentLayerInfo(layerData);
    showSelectionOnLayerInfoList();
    updateHistory();
  }
});

// input.addEventListener("input", (e) => {
//   text = input.value;
// });

addTextToCanvas.addEventListener("click", () => {
  if (!textToAdd) {
    textToAdd = new fabric.IText(" ", {
      fontSize: 24,
      padding: 6,
      fontFamily: "Helvetica",
      fill: color,
      strokeWidth: 3,
      top: 200,
      left: 100,
      onCanvasEditing: true,
      borderColor: "#0c8ce9",
      cornerColor: "#0c8ce9",
      cornerSize: 10,
      transparentCorners: false,
    });

    canvas.add(textToAdd);
    textToAdd.enterEditing();

    canvas.on("text:changed", function (e) {
      console.log(canvas.getObjects());
      setLayerData(canvas.getObjects());

      showCurrentLayerInfo(layerData);
      showSelectionOnLayerInfoList();
      updateHistory();
      canvas.setActiveObject(textToAdd);
    });
    // canvas.setActiveObject(textToAdd);
    // canvas.renderAll();
  }
});
