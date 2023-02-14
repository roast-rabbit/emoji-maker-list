import { setLayerData, layerData, showCurrentLayerInfo } from "./index.js";
import { updateHistory } from "./undo.js";

export default function (canvas) {
  const path = "./assets";
  const topOffset = 50;
  const leftOffset = 50;
  const faceIndex = 0;
  const mouthIndex = 1;
  const eyesIndex = 0;
  const sweatIndex = 0;
  // Load face
  fabric.loadSVGFromURL(`${path}/face/face-${faceIndex}.svg`, function (face, options) {
    face = fabric.util.groupSVGElements(face, options);

    face.set({
      borderColor: "#0c8ce9",
      cornerColor: "#0c8ce9",
      cornerSize: 10,
      transparentCorners: false,
    });

    face.top = topOffset;
    face.left = leftOffset;

    canvas.add(face);
    canvas.renderAll();
    setLayerData(canvas.getObjects());
    console.log(layerData);
    showCurrentLayerInfo(layerData);
    updateHistory();
  });

  // fetch("./positionData.json")
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((data) => {
  //     const { top: eyesTop, left: eyesLeft } = data["eyes"][eyesIndex];
  //     const { top: mouthTop, left: mouthLeft } = data["mouth"][mouthIndex];
  //     // load eyes by index
  //     fabric.loadSVGFromURL(`${path}/eyes/eyes-${eyesIndex}.svg`, function (eyes, options) {
  //       eyes = fabric.util.groupSVGElements(eyes, options);
  //       eyes.set({
  //         borderColor: "#0c8ce9",
  //         cornerColor: "#0c8ce9",
  //         cornerSize: 10,
  //         transparentCorners: false,
  //       });
  //       eyes.top = topOffset + eyesTop;
  //       eyes.left = leftOffset + eyesLeft;
  //       canvas.add(eyes);
  //     });
  //     // Load mouth by index
  //     fabric.loadSVGFromURL(`${path}/mouth/mouth-${mouthIndex}.svg`, function (mouth, options) {
  //       mouth = fabric.util.groupSVGElements(mouth, options);
  //       mouth.set({
  //         borderColor: "#0c8ce9",
  //         cornerColor: "#0c8ce9",
  //         cornerSize: 10,
  //         transparentCorners: false,
  //       });
  //       mouth.top = topOffset + mouthTop;
  //       mouth.left = leftOffset + mouthLeft;
  //       canvas.add(mouth);
  //     });
  //   });

  // fabric.loadSVGFromURL("./assets/1f9701.svg", function (savouring, options) {
  //   savouring = fabric.util.groupSVGElements(savouring, options);
  //   canvas.add(savouring);
  // });
}
