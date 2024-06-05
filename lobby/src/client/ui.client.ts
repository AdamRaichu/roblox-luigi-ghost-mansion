import Roact from "@rbxts/roact";
import { roleSelect } from "./elements/role_select";

const Players = game.GetService("Players");

Roact.mount(roleSelect, Players.LocalPlayer.FindFirstChildOfClass("PlayerGui"));
