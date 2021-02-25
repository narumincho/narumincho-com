import * as React from "react";

export type Props = {
  frame: number;
  clearTime: number | undefined;
};

export const Time: React.FunctionComponent<Props> = (props) => {
  return (
    <g>
      {timeText(props).map((line, index) => (
        <text
          x={0}
          y={16 * (1 + index)}
          fill="#fff"
          style={{ userSelect: "none" }}
        >
          {line}
        </text>
      ))}
    </g>
  );
};

const worldRecord = 1320;

const timeText = (props: Props): ReadonlyArray<string> => {
  if (typeof props.clearTime === "number") {
    if (props.clearTime < worldRecord) {
      return [
        "すごい! 世界新記録だ!!!",
        `${props.clearTime}`,
        "ナルミンチョにスクリーンショット",
        "を送れば記録を更新するよ",
      ];
    }
    return [
      `クリアタイム: ${props.clearTime}`,
      `(世界1位は なおき の ${worldRecord})`,
    ];
  }
  return [`タイム: ${props.frame}`];
};
