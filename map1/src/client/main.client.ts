import Roact from "@rbxts/roact";
import { makeHello } from "shared/module";
import { game_ui } from "./elements/game_ui";
import { Timer } from "shared/timer";
import { makePlayerVisible } from "shared/visibility";
import { GhostVisibilityHelperCommand } from "shared/enums";

print(makeHello("main.client.ts"));

const ReplicatedStorage = game.GetService("ReplicatedStorage");
const Players = game.GetService("Players");
const Teams = game.GetService("Teams");
const Lighting = game.GetService("Lighting");

ReplicatedStorage.GameStartEvent.OnClientEvent.Connect(() => {
  print("Received GameStartEvent on client.");

  const me = Players.LocalPlayer;

  const guiTree = Roact.mount(game_ui, me.FindFirstChildOfClass("PlayerGui"));

  new Timer(
    300,
    () => {
      Roact.unmount(guiTree);
    },
    0,
    true,
  );

  updateCamera();

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
  wait(0.1);
  camera.CameraType = Enum.CameraType.Scriptable;
  camera.CFrame = target.CFrame;
}

// updateCamera();
