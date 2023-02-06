export default function (canvas) {
  fabric.loadSVGFromURL("./assets/face.svg", function (face, options) {
    face = fabric.util.groupSVGElements(face, options);

    face.set({
      borderColor: "#0c8ce9",
      cornerColor: "#0c8ce9",
      cornerSize: 10,
      transparentCorners: false,
    });
    canvas.add(face);
    canvas.renderAll();
  });

  fabric.loadSVGFromURL("./assets/eyes.svg", function (eyes, options) {
    eyes = fabric.util.groupSVGElements(eyes, options);
    eyes.top = 108;
    eyes.left = 67;
    eyes.set({
      borderColor: "#0c8ce9",
      cornerColor: "#0c8ce9",
      cornerSize: 10,
      transparentCorners: false,
    });
    canvas.add(eyes);
  });

  fabric.loadSVGFromURL("./assets/mouth.svg", function (mouth, options) {
    mouth = fabric.util.groupSVGElements(mouth, options);
    mouth.top = 231;
    mouth.left = 67;
    mouth.set({
      borderColor: "#0c8ce9",
      cornerColor: "#0c8ce9",
      cornerSize: 10,
      transparentCorners: false,
    });
    canvas.add(mouth);
  });

  // fabric.loadSVGFromURL("./assets/1f9701.svg", function (savouring, options) {
  //   savouring = fabric.util.groupSVGElements(savouring, options);
  //   canvas.add(savouring);
  // });
}
