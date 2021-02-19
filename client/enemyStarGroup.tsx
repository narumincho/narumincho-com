import * as React from "react";
import * as lib from "./lib";
import * as v2 from "./vector2";

export type Props = {
  enemyStarGroupStatus: ReadonlyArray<boolean>;
  spaceSize: lib.Size;
};

export type EnemyGroupState = ReadonlyArray<boolean>;

const positionList: ReadonlyArray<v2.Vector2> = [
  { x: 0.1, y: 0.1 },
  { x: 0.5, y: 0.1 },
  { x: 0.9, y: 0.1 },
  { x: 0.3, y: 0.3 },
  { x: 0.7, y: 0.3 },
  { x: 0.2, y: 0.5 },
  { x: 0.8, y: 0.5 },
  { x: 0.3, y: 0.7 },
  { x: 0.7, y: 0.7 },
  { x: 0.1, y: 0.9 },
  { x: 0.5, y: 0.9 },
  { x: 0.9, y: 0.9 },
];

export const initStatusList = Array(positionList.length).fill(true);

export const updateStatus = (
  statusList: ReadonlyArray<boolean>,
  moveStar: lib.PositionAndVelocity,
  spaceSize: lib.Size
): { newStatus: ReadonlyArray<boolean>; isReflect: boolean } => {
  let isReflect = false;
  const newStatus = positionList.map((position, i) => {
    const isLive = statusList[i] as boolean;
    if (!isLive) {
      return false;
    }
    const collisionResult = isCollision(
      { x: position.x * spaceSize.width, y: position.y * spaceSize.height },
      moveStar
    );
    if (collisionResult.isReflect) {
      isReflect = true;
    }
    return collisionResult.isLive;
  });
  return {
    newStatus,
    isReflect,
  };
};

export const EnemyStarGroup: React.FunctionComponent<Props> = (props) => {
  return (
    <g>
      {positionList.map((position, index) => {
        if (props.enemyStarGroupStatus[index]) {
          return (
            <circle
              key={index}
              r={4}
              cx={position.x * props.spaceSize.width}
              cy={position.y * props.spaceSize.height}
              fill="yellow"
            ></circle>
          );
        }
      })}
    </g>
  );
};

export const isCollision = (
  enemyStarPosition: v2.Vector2,
  moveStar: lib.PositionAndVelocity
): { isLive: boolean; isReflect: boolean } => {
  /** 動く星と, 敵が衝突した */
  const isHit = v2.getDistance(enemyStarPosition, moveStar.position) < 8;
  if (!isHit) {
    return {
      isLive: true,
      isReflect: false,
    };
  }
  if (v2.getLength(moveStar.velocity) < 7) {
    return {
      isLive: false,
      isReflect: true,
    };
  }
  return {
    isLive: false,
    isReflect: true,
  };
};
