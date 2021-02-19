import * as React from "react";

export type Props = {
  x: number;
  y: number;
  radius: number;
};

export const MoveStar: React.FunctionComponent<Props> = (props) => {
  return (
    <circle cx={props.x} cy={props.y} r={props.radius} fill="#ddd"></circle>
  );
};
