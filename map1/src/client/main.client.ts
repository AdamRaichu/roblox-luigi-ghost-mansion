import Roact from "@rbxts/roact";
import { makeHello } from "shared/module";
import { game_ui } from "./elements/game_ui";
import { Timer } from "shared/timer";
import { makePlayerVisible } from "shared/visibility";
import { GhostVisibilityHelperCommand } from "shared/enums";
import { Icon } from "@rbxts/topbar-plus";

print(makeHello("main.client.ts"));

const ReplicatedStorage = game.GetService("ReplicatedStorage");
const Players = game.GetService("Players");
const Teams = game.GetService("Teams");
const Lighting = game.GetService("Lighting");

ReplicatedStorage.GamePreStartEvent.OnClientEvent.Connect(() => {
  updateCamera();
});

ReplicatedStorage.GameStartEvent.OnClientEvent.Connect(() => {
  const me = Players.LocalPlayer;

  const gameTimer = new Icon().setImage("8184068342").align("Center");

  spawn(() => {
    for (let i = 300; i > 0; i--) {
      task.wait(1);
      gameTimer.setLabel(tostring(i));
    }
  });

  ReplicatedStorage.GhostVisibilityHelper.OnClientEvent.Connect((command: GhostVisibilityHelperCommand & string) => {
    switch (command) {
      case GhostVisibilityHelperCommand.GhostIsHidden:
        makePlayerVisible(me);
        Lighting.GhostHiddenEffect.Enabled = true;
        break;

      case GhostVisibilityHelperCommand.GhostBecomesVisible:
        Lighting.GhostHiddenEffect.Enabled = false;
        break;

      default:
        error(`Unexpected GhostVisibilityHelper command: ${command}!`);
        break;
    }
  });
});

function updateCamera() {
  const camera = game.Workspace.CurrentCamera as Camera;
  const target = game.Workspace.WaitForChild("CameraView") as Part;
  camera.CameraType = Enum.CameraType.Custom;
  task.wait(0.1);
  camera.CameraType = Enum.CameraType.Scriptable;
  camera.CFrame = target.CFrame;
}

// updateCamera();
