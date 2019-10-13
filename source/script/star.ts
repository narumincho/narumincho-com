const message: string = "追加のスクリプト読み込みに成功!";
console.log(message);

let vertex = 5;
let pos = 0;
let layer = 0;
let waitTime = -1;
const starContainer = document.getElementById("star");
if (starContainer === null) {
    throw new Error("星を格納する要素がない!");
}
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
starContainer.appendChild(svg);
svg.viewBox.baseVal.x = 0;
svg.viewBox.baseVal.y = 0;
svg.viewBox.baseVal.width = 1000;
svg.viewBox.baseVal.height = 800;
function main() {
    overVertex();
    if (waitTime !== -1) {
        starWait();
        return;
    }
    if (layer > (vertex - 1) / 2) {
        overLayer();
        return;
    }
    overPos();
    pos += 1;
    drawStar();
}
function starWait() {
    waitTime += 1;
    if (45 < waitTime) {
        svg.innerHTML = "";
        waitTime = -1;
    }
}

function overVertex() {
    if (vertex === 39) {
        vertex = 5;
    }
}

function overPos() {
    if (pos > vertex - 1) {
        pos = -1;
        layer += 1;
    }
}
function overLayer() {
    layer = 0;
    pos = -1;
    vertex += 2;
    waitTime = 0;
}
function drawStar() {
    const sPos = (pos * layer) % vertex;
    const ePos = ((pos + 1) * layer) % vertex;

    const lineElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
    );
    lineElement.style.strokeWidth = "1";
    lineElement.x1.baseVal.value =
        400 * Math.cos((((sPos * 360) / vertex - 90) / 180) * Math.PI) + 500;
    lineElement.y1.baseVal.value =
        400 * Math.sin((((sPos * 360) / vertex - 90) / 180) * Math.PI) + 400;

    lineElement.x2.baseVal.value =
        400 * Math.cos((((ePos * 360) / vertex - 90) / 180) * Math.PI) + 500;
    lineElement.y2.baseVal.value =
        400 * Math.sin((((ePos * 360) / vertex - 90) / 180) * Math.PI) + 400;
    svg.appendChild(lineElement);
}
