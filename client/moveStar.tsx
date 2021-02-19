import * as React from "react";
import * as v2 from "./vector2";

export type Props = {
  position: v2.Vector2;
  radius: number;
};

export const MoveStar: React.FunctionComponent<Props> = (props) => {
  return (
    <circle
      cx={props.position.x}
      cy={props.position.y}
      r={props.radius}
      fill="#ddd"
    ></circle>
  );
};
