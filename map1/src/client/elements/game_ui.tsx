import Roact from "@rbxts/roact";

export const game_ui = (
  <screengui Key={"GameUI"} ResetOnSpawn={false}>
    <frame Key={"GhostHealthBar"} Position={new UDim2(0, 10, 0, 10)}></frame>
    <frame Key={"GameTimer"}></frame>
    <frame Key={"LuigiLightLevels"}></frame>
  </screengui>
);
