import { canvas } from "./index.js";

function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.getElementById("download").addEventListener("click", () => {
  downloadURI(canvas.toDataURL(), "doanload");
});
