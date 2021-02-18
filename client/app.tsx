import * as React from "react";
import * as lib from "./lib";

export type State = {
  readonly mouseX: number;
};

export type Props = {
  /** 宇宙のサイズ (SVGの初期サイズ) 比率を維持して自動的に画面いっぱいに大きくなる */
  readonly spaceSize: lib.Size;
};

export class App extends React.Component<Props> {
  state: State = { mouseX: 0 };

  constructor(props: Props) {
    super(props);
    document.title = "重力星";
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";
    document.body.style.margin = "0";
  }

  componentDidMount(): void {
    window.addEventListener("mousemove", (e) => {
      this.setState({
        mouseX: lib.getMouseX(
          {
            width: window.document.body.clientWidth,
            height: window.document.body.clientHeight,
          },
          this.props.spaceSize,
          e.x
        ),
      });
    });
  }

  render(): React.ReactElement {
    return (
      <div>
        <svg
          style={{
            width: this.props.spaceSize.width,
            height: this.props.spaceSize.height,
            display: "block",
            transformOrigin: "top left",
            transform: lib.getFullScreenTransform(
              {
                width: document.body.clientWidth,
                height: document.body.clientHeight,
              },
              this.props.spaceSize
            ),
          }}
          viewBox={`0 0 ${this.props.spaceSize.width} ${this.props.spaceSize.height}`}
        >
          <rect
            x={0}
            y={0}
            width={this.props.spaceSize.width}
            height={this.props.spaceSize.height}
            stroke="red"
            fill="#000"
            strokeWidth={this.props.spaceSize.width / 100}
          ></rect>
          <circle
            cx={this.state.mouseX}
            cy={this.props.spaceSize.height / 2}
            r={this.props.spaceSize.width / 5}
            fill="red"
          ></circle>
        </svg>
      </div>
    );
  }
}
