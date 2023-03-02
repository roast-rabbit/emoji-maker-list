import { canvas } from "./index.js";

function savePng(uri, name) {
  const link = document.createElement("a");

  link.download = name;

  link.href = uri;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}

function saveSvg(filedata, name = "my_svg") {
  const svgFile = new Blob([filedata], { type: "image/svg+xml;charset=utf-8" });

  const svgFileSrc = URL.createObjectURL(svgFile); //mylocfile);

  const dwn = document.createElement("a");

  dwn.href = svgFileSrc;

  dwn.download = name;

  document.body.appendChild(dwn);

  dwn.click();

  document.body.removeChild(dwn);
}

document.getElementById("to-png").addEventListener("click", () => {
  savePng(canvas.toDataURL(), "download");
});

document.getElementById("to-svg").addEventListener("click", () => {
  saveSvg(canvas.toSVG());
});
