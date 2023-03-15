import { fabric } from "fabric";
import CardTemplate from "./CardTemplate";
fetch("https://emoji-maker-list.onrender.com/canvas")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    const renderedCardList = data.reduce((acc, cur, currentIndex) => {
      return (acc += CardTemplate(currentIndex));
    }, "");
    document.querySelector("#container").innerHTML = renderedCardList;

    const cards = document.querySelectorAll("#container canvas");
    cards.forEach((card, index) => {
      const canvas = new fabric.Canvas(`canvas${index}`, {
        width: 200,
        height: 200,
      });
      const scale = 0.3;
      data[index].objects.forEach((item) => {
        item.scaleX = scale;
        item.scaleY = scale;
        item.top = item.top * scale;
        item.left = item.left * scale;
      });
      console.log(data[index]);
      canvas.loadFromJSON(data[index], function () {
        canvas.renderAll();
      });
    });
  });
