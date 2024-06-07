import Roact from "@rbxts/roact";
import { GameTimerComponent } from "./timer";

export const game_ui = (
  <screengui Key={"GameUI"} ResetOnSpawn={false}>
    <frame Key={"GhostHealthBar"}></frame>
    <frame
      Key={"GameTimer"}
      Position={new UDim2(0.5, 0, 0.05, 0)}
      AnchorPoint={new Vector2(0.5, 1)}
      Size={new UDim2(0.1, 0, 0.075, 0)}
      BackgroundColor3={Color3.fromRGB(117, 107, 117)}
      BackgroundTransparency={0.8}
    >
      <uicorner Key={"UICorner"} CornerRadius={new UDim(0.5, 0)}></uicorner>
      <GameTimerComponent
        Key={"Timer"}
        duration={300}
        stopAtZero={true}
        prefixText="🕒"
        suffixText=" "
      ></GameTimerComponent>
    </frame>
    <frame Key={"LuigiLightLevels"}></frame>
  </screengui>
);
