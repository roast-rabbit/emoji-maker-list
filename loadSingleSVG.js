import { setLayerData, showCurrentLayerInfo, layerData } from "./index.js";
import { getCurrentOrder } from "./index.js";

export default function (fileName, canvas, positionData) {
  const path = "./assets";
  const topOffset = 50;
  const leftOffset = 50;

  let [type, index] = fileName.split("-");

  // convert index string to number
  index = +index;

  const { top, left } = positionData[type][index];

  fabric.loadSVGFromURL(`${path}/${type}/${type}-${index}.svg`, function (item, options) {
    item = fabric.util.groupSVGElements(item, options);
    item.set({
      borderColor: "#0c8ce9",
      cornerColor: "#0c8ce9",
      cornerSize: 10,
      transparentCorners: false,
    });
    item.top = topOffset + top;
    item.left = leftOffset + left;
    canvas.add(item);
    // re-render current layer info eveytime it adds an object to the canvas
    console.log("canvas.getObjects:");
    console.log(canvas.getObjects());
    setLayerData(canvas.getObjects());
    console.log(layerData);
    showCurrentLayerInfo(layerData);
  });
}
