import { layerData, setLayerData, updateCanvas } from "./index.js";
const container = document.querySelector("#layer-list");

const swap = function (nodeA, nodeB) {
  const parentA = nodeA.parentNode;
  const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

  // Move `nodeA` to before the `nodeB`
  nodeB.parentNode.insertBefore(nodeA, nodeB);

  // Move `nodeB` to before the sibling of `nodeA`
  parentA.insertBefore(nodeB, siblingA);
};

container.addEventListener("drop", () => {
  const draggables = document.querySelectorAll("li");
  const newOrder = [...draggables].map((draggable) => {
    return +draggable.dataset.index;
  });
  // set new state of layer data according to update order
  setLayerData(undefined, newOrder);
  updateCanvas(layerData);

  // reset order
  const listElements = document.querySelectorAll("li");
  listElements.forEach((element, index) => {
    element.dataset.index = index;
  });
});

container.addEventListener("dragover", (e) => {
  e.preventDefault();

  const afterElement = getDragAfterElement(container, e.clientY);

  const draggable = document.querySelector(".dragging");

  if (afterElement === null) {
    container.appendChild(draggable);
  } else {
    // container.insertBefore(draggable, afterElement);
    swap(draggable, afterElement);
  }
});

export function makeListItemsDraggable() {
  const draggables = document.querySelectorAll("li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });
    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    });
  });
}

function getDragAfterElement(container, y) {
  // get reference to those elements not dragging
  const draggableElements = [...container.querySelectorAll(".draggable")];

  const ulHeight = document.querySelector("ul").getBoundingClientRect().y;
  const index = Math.floor((y - ulHeight) / 60);
  console.log(index);
  return draggableElements[index];

  // return draggableElements.reduce(
  //   (closest, child) => {
  //     const box = child.getBoundingClientRect();

  //     const offset = y - box.top - box.height / 2;

  //     if (offset < 0 && offset > closest.offset) {
  //       return { offset: offset, element: child };
  //     } else {
  //       return closest;
  //     }
  //   },
  //   { offset: Number.NEGATIVE_INFINITY }
  // ).element;
}
