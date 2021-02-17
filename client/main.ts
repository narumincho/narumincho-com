import * as lib from "./lib";

/** 宇宙のサイズ */
const spaceSize: lib.Size = {
  width: 16,
  height: 9,
};

document.title = "重力星";
document.documentElement.style.height = "100%";
document.body.innerText = "";
document.body.style.height = "100%";
document.body.style.margin = "0";

const svgElement = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "svg"
);
svgElement.style.width = `${spaceSize.width}px`;
svgElement.style.height = `${spaceSize.height}px`;
svgElement.style.display = "block";
svgElement.style.transformOrigin = "top left";
svgElement.viewBox.baseVal.x = 0;
svgElement.viewBox.baseVal.y = 0;
svgElement.viewBox.baseVal.width = spaceSize.width;
svgElement.viewBox.baseVal.height = spaceSize.height;

const circleElement = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "circle"
);
circleElement.cx.baseVal.value = spaceSize.width / 2;
circleElement.cy.baseVal.value = spaceSize.height / 2;
circleElement.r.baseVal.value = spaceSize.width / 5;
circleElement.setAttribute("fill", "red");

const rectElement = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "rect"
);
rectElement.x.baseVal.value = 0;
rectElement.y.baseVal.value = 0;
rectElement.width.baseVal.value = spaceSize.width;
rectElement.height.baseVal.value = spaceSize.height;
rectElement.setAttribute("stroke", "red");
rectElement.setAttribute("fill", "#000");
rectElement.setAttribute("stroke-width", `${spaceSize.width / 100}`);

const state = {
  mouseX: 0,
  beforeScreenSize: {
    width: window.document.body.clientWidth,
    height: window.document.body.clientHeight,
  },
};
window.addEventListener("mousemove", (e) => {
  state.mouseX = lib.getMouseX(
    {
      width: window.document.body.clientWidth,
      height: window.document.body.clientHeight,
    },
    spaceSize,
    e.x
  );
});

const loop = (): void => {
  circleElement.cx.baseVal.value = state.mouseX;
  const screenSize = {
    width: window.document.body.clientWidth,
    height: window.document.body.clientHeight,
  };

  svgElement.style.transform = lib.getFullScreenTransform(
    screenSize,
    spaceSize
  );

  window.requestAnimationFrame(loop);
};
loop();

svgElement.appendChild(rectElement);
svgElement.appendChild(circleElement);

document.body.appendChild(svgElement);
