import { layerData, setActiveObjectOnCanvas, setLayerData, updateCanvas } from "./index.js";
// import { polyfill } from "mobile-drag-drop";

const container = document.querySelector("#layer-list");

// console.log(polyfill);
const swap = function (nodeA, nodeB) {
  const parentA = nodeA.parentNode;
  const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

  // Move `nodeA` to before the `nodeB`
  nodeB.parentNode.insertBefore(nodeA, nodeB);

  // Move `nodeB` to before the sibling of `nodeA`
  parentA.insertBefore(nodeB, siblingA);
};

const handleDrop = () => {
  const draggables = document.querySelectorAll("li:not(.shadow)");
  const newOrder = [...draggables].reverse().map((draggable) => {
    return +draggable.dataset.index;
  });
  // set new state of layer data according to update order
  setLayerData(undefined, newOrder);
  updateCanvas(layerData);

  // reset order
  const listElements = document.querySelectorAll("li:not(.shadow)");
  console.log(listElements);
  [...listElements].reverse().forEach((element, index) => {
    element.dataset.index = index;
    element.getElementsByTagName("div")[1].textContent = `Layer ${
      [...listElements].length - index
    }`;
  });

  const selectedLayerIndex = document.querySelector("li.active")?.dataset.index;

  selectedLayerIndex && setActiveObjectOnCanvas(selectedLayerIndex);
};

const handleDragover = (e) => {
  console.log(e);
  e.preventDefault();

  let targetY;
  if (e.type === "touchmove") {
    targetY = e.changedTouches[0].clientY;
  } else {
    targetY = e.clientY;
  }
  const afterElement = getDragAfterElement(container, targetY);

  const draggable = document.querySelector(".dragging");

  if (afterElement === null) {
    container.appendChild(draggable);
  } else {
    // container.insertBefore(draggable, afterElement);
    swap(draggable, afterElement);
  }
};

container.addEventListener("drop", handleDrop);
container.addEventListener("touchend", handleDrop);

container.addEventListener("dragover", handleDragover);
container.addEventListener("touchmove", handleDragover);

export function makeListItemsDraggable() {
  const draggables = document.querySelectorAll("li");

  draggables.forEach((draggable) => {
    ["dragstart", "touchstart"].forEach((eventType) => {
      draggable.addEventListener(eventType, () => {
        draggable.classList.add("dragging");
      });
    });

    ["dragend", "touchend"].forEach((eventType) => {
      draggable.addEventListener(eventType, () => {
        draggable.classList.remove("dragging");
      });
    });
  });
}

function getDragAfterElement(container, y) {
  // get reference to those elements not dragging
  const draggableElements = [...container.querySelectorAll(".draggable")];

  const ulHeight = document.querySelector("ul").getBoundingClientRect().y;
  const index = Math.floor((y - ulHeight) / 60);
  return draggableElements[index];
}

let draggingElement;
let draggingElementShadow;
let isTouching = false;
let touchingStartYPosition;
let touchingPosition;

container.addEventListener("touchstart", (e) => {
  e.preventDefault();
  isTouching = true;
  console.log("touch started");
  // console.log("e.changedTouches[0].pageY", e.changedTouches[0].pageY);
  // console.dir(container.offsetTop);
  touchingStartYPosition = e.changedTouches[0].pageY;

  console.log(e.target.closest("li"));

  draggingElement = e.target.closest("li");

  draggingElementShadow = draggingElement.cloneNode(true);

  console.log(draggingElement.offsetTop);
  const draggingElementShadowInitialY = draggingElement.offsetTop;

  touchingPosition = draggingElementShadowInitialY;

  draggingElementShadow.id = "dragging-element-shadow";

  draggingElementShadow.style = `background: aliceblue; width:100%; opacity: 0.9; display: flex; align-items: center; height:60px; gap:10px; position: absolute;top:${draggingElementShadowInitialY}px; left:0; z-index:1; }`;
  draggingElementShadow.classList.add("shadow");
  draggingElementShadow.classList.remove("draggable");
  // draggingElementShadow.setAttribute("isDragging", false);
  console.log(draggingElementShadow);

  container.append(draggingElementShadow);
});

container.addEventListener("touchmove", (e) => {
  console.log(e.changedTouches[0].pageY - touchingStartYPosition);
  draggingElementShadow.style.top = `${
    touchingPosition + e.changedTouches[0].pageY - touchingStartYPosition
  }px`;
});

container.addEventListener("touchend", (e) => {
  e.preventDefault();
  isTouching = false;
  console.log("touch ended");
  container.querySelector("#dragging-element-shadow").remove();
  touchingStartYPosition = null;
  touchingPosition = null;
});
