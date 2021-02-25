import * as React from "react";
import * as enemyStarGroup from "./enemyStarGroup";
import * as lib from "./lib";
import * as v2 from "./vector2";
import { MoveStar } from "./moveStar";
import { MyStar } from "./myStar";
import { PredictionOrbit } from "./predictionOrbit";
import { Time } from "./time";

const maxSpeed = 10;

export type State = {
  readonly mouseX: number;
  readonly frame: number;
  readonly isVacuum: boolean;
  readonly moveStar: lib.PositionAndVelocity;
  readonly enemyGroupState: enemyStarGroup.EnemyGroupState;
  readonly clearTime: number | undefined;
};

export type Props = {
  /** 宇宙のサイズ (SVGの初期サイズ) 比率を維持して自動的に画面いっぱいに大きくなる */
  readonly spaceSize: lib.Size;
};

export class App extends React.Component<Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);
    document.title = "重力星";
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";
    document.body.style.margin = "0";
    this.state = {
      mouseX: 0,
      frame: 0,
      isVacuum: true,
      moveStar: {
        position: { x: props.spaceSize.width / 2, y: 0 },
        velocity: { x: 0, y: 0 },
      },
      enemyGroupState: enemyStarGroup.initStatusList,
      clearTime: undefined,
    };
  }

  componentDidMount(): void {
    window.addEventListener("pointerdown", () => {
      this.setState((oldState) => ({
        isVacuum: !oldState.isVacuum,
      }));
    });
    window.addEventListener("pointermove", (e) => {
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
    const loop = () => {
      this.setState((oldState) => update(oldState, this.props.spaceSize));
      requestAnimationFrame(loop);
    };
    window.requestAnimationFrame(loop);
  }

  render(): React.ReactElement {
    return (
      <div style={{ touchAction: "none" }}>
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
            stroke="#333"
            fill="#000"
            strokeWidth={this.props.spaceSize.width / 100}
          ></rect>
          <PredictionOrbit
            orbitList={generatePredictionOrbit(
              this.state.moveStar,
              mouseXToMyStarPosition(this.state.mouseX, this.props.spaceSize),
              this.state.isVacuum,
              this.props.spaceSize,
              this.state.frame
            )}
          />
          <MyStar
            position={mouseXToMyStarPosition(
              this.state.mouseX,
              this.props.spaceSize
            )}
            radius={this.props.spaceSize.width / 20}
            frame={this.state.frame}
            isVacuum={this.state.isVacuum}
          />
          <enemyStarGroup.EnemyStarGroup
            spaceSize={this.props.spaceSize}
            enemyStarGroupStatus={this.state.enemyGroupState}
          />
          <MoveStar
            position={this.state.moveStar.position}
            radius={this.props.spaceSize.width / 40}
          />
          <Time frame={this.state.frame} clearTime={this.state.clearTime} />
        </svg>
      </div>
    );
  }
}

/** 位置が外側の壁にあったときに, 速度を内側に向ける */
const wallCollisionVelocity = (
  velocity: v2.Vector2,
  position: v2.Vector2,
  space: lib.Size
): v2.Vector2 => {
  return {
    x: velocityToCenter(velocity.x, position.x, space.width),
    y: velocityToCenter(velocity.y, position.y, space.width),
  };
};

/** 位置が外側の壁にあったときに, 速度を内側に向ける */
const velocityToCenter = (
  velocity: number,
  position: number,
  space: number
) => {
  if (position < 0) {
    return Math.abs(velocity);
  }
  if (space < position) {
    return -Math.abs(velocity);
  }
  return velocity;
};

const update = (oldState: State, spaceSize: lib.Size): State => {
  const newMoveStarPositionAndVelocity = updateMoveStar(
    oldState.moveStar,
    mouseXToMyStarPosition(oldState.mouseX, spaceSize),
    oldState.isVacuum,
    spaceSize
  );
  const clearTime =
    oldState.clearTime === undefined &&
    enemyStarGroup.isClear(oldState.enemyGroupState)
      ? oldState.frame
      : oldState.clearTime;

  return {
    frame: oldState.frame + 1,
    moveStar: {
      position: newMoveStarPositionAndVelocity.position,
      velocity: newMoveStarPositionAndVelocity.velocity,
    },
    isVacuum: oldState.isVacuum,
    mouseX: oldState.mouseX,
    enemyGroupState: enemyStarGroup.updateStatus(
      oldState.enemyGroupState,
      oldState.moveStar.position,
      spaceSize
    ),
    clearTime,
  };
};

const generatePredictionOrbit = (
  moveStarPositionAndVelocity: lib.PositionAndVelocity,
  myStarPosition: v2.Vector2,
  isVacuum: boolean,
  spaceSize: lib.Size,
  frame: number
): ReadonlyArray<v2.Vector2> => {
  const result: Array<v2.Vector2> = [];
  let templateMyStartPositionAndVelocity = moveStarPositionAndVelocity;
  for (let index = 0; index < 120; index += 1) {
    templateMyStartPositionAndVelocity = updateMoveStar(
      templateMyStartPositionAndVelocity,
      myStarPosition,
      isVacuum,
      spaceSize
    );
    if ((index + frame) % 3 === 0) {
      result.push(templateMyStartPositionAndVelocity.position);
    }
  }
  return result;
};

/** 動く星の次のフレームの動きを算出する */
const updateMoveStar = (
  moveStarPositionAndVelocity: lib.PositionAndVelocity,
  myStarPosition: v2.Vector2,
  isVacuum: boolean,
  spaceSize: lib.Size
): lib.PositionAndVelocity => {
  const myStarToMoveStarDistance = v2.getDistance(
    myStarPosition,
    moveStarPositionAndVelocity.position
  );
  /** 動く星から重力星へ向かうベクトル */
  const moveStarToMyStar: v2.Vector2 = v2.getAToB(
    moveStarPositionAndVelocity.position,
    myStarPosition
  );
  /** 動く星の加速度 */
  const moveStarAcceleration: v2.Vector2 = v2.multipleNumber(
    v2.setLength(moveStarToMyStar, 30 / myStarToMoveStarDistance),
    isVacuum ? 1 : -1
  );
  /** 動く星の速度 */
  const newMoveStarVelocity: v2.Vector2 = v2.setMaxLength(
    v2.add(moveStarPositionAndVelocity.velocity, moveStarAcceleration),
    maxSpeed
  );
  /** 動く星の場所 領域外にも出る */
  const newMoveStarPosition = v2.add(
    moveStarPositionAndVelocity.position,
    newMoveStarVelocity
  );

  return {
    velocity: wallCollisionVelocity(
      newMoveStarVelocity,
      newMoveStarPosition,
      spaceSize
    ),
    position: v2.clamp(
      newMoveStarPosition,
      { x: 0, y: 0 },
      { x: spaceSize.width, y: spaceSize.height }
    ),
  };
};

/** マウスのX座標から, 重力星の座標に変換する */
const mouseXToMyStarPosition = (
  mouseX: number,
  spaceSize: lib.Size
): v2.Vector2 => {
  return {
    x: mouseX,
    y: spaceSize.height / 2,
  };
};
