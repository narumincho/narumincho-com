import * as React from "react";

export type Props = {
  x: number;
  y: number;
  radius: number;
  frame: number;
  isVacuum: boolean;
};

/** フレアの個数 */
const flareNum = 4;
/** 1つのフレアの厚さ */
const flareSize = 2;
/** フレアのループ上限 */
const flareLimit = 100;

export const MyStar: React.FunctionComponent<Props> = (props) => {
  return (
    <g>
      {Array.from({ length: flareNum }, (_, i) => {
        return (
          <circle
            key={i}
            cx={props.x}
            cy={props.y}
            r={
              props.radius * (1 + 0.5 * i + 0.005 * (props.frame % flareLimit))
            }
            stroke={getColor(props.isVacuum, 0, i)}
            fill="none"
          ></circle>
        );
      })}
      <circle
        cx={props.x}
        cy={props.y}
        r={props.radius}
        fill={getColor(props.isVacuum, 0, 0)}
      ></circle>
    </g>
  );
};

const getColor = (isVacuum: boolean, per: number, j: number): string => {
  return `rgba(${isVacuum ? "51, 170, 255" : "255, 51, 51"}, ${
    (flareNum - j) / flareNum
  })`;
  return `rgba(${isVacuum ? "51, 170, 255" : "255, 51, 51"}, ${
    (255 * (1 - per) * (isVacuum ? flareSize - j : j)) / flareSize
  })`;
};
