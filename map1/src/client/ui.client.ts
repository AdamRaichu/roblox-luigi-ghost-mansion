import Roact from "@rbxts/roact";
import { game_ui } from "./elements/game_ui";

const Players = game.GetService("Players");

const guiTree = Roact.mount(game_ui, Players.LocalPlayer.FindFirstChildOfClass("PlayerGui"));
