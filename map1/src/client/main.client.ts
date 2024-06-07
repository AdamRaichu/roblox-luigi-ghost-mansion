import Roact from "@rbxts/roact";
import { makeHello } from "shared/module";
import { game_ui } from "./elements/game_ui";

print(makeHello("main.client.ts"));

const ReplicatedStorage = game.GetService("ReplicatedStorage");

ReplicatedStorage.GameStartEvent.OnClientEvent.Connect(() => {
  print("Received GameStartEvent on client.");

  // Update camera to birds eye view.

  const Players = game.GetService("Players");

  const guiTree = Roact.mount(game_ui, Players.LocalPlayer.FindFirstChildOfClass("PlayerGui"));

  updateCamera();
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
