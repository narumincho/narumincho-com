import * as React from "react";
import * as ReactDom from "react-dom";
import { App } from "./app";

const entryElement = document.createElement("div");
document.body.innerText = "";
document.body.appendChild(entryElement);

ReactDom.render(
  <React.StrictMode>
    <App spaceSize={{ width: 256, height: 256 }} />
  </React.StrictMode>,
  entryElement
);
