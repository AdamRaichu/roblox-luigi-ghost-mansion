// import Roact from "@rbxts/roact";
import Icon from "shared/Icon";

const Players = game.GetService("Players");
const ReplicatedStorage = game.GetService("ReplicatedStorage");

// Roact.mount(roleSelect, Players.LocalPlayer.FindFirstChildOfClass("PlayerGui"));

const ghostButton = new Icon().setLabel("Ghost");
const luigiButton = new Icon().setLabel("Luigi");
const cancelButton = new Icon().setLabel("No Preference");

ghostButton.selected.Connect(function () {
  sayPrefersTeam("Prefers Ghost");
  luigiButton.deselect();
  cancelButton.deselect();
});
luigiButton.selected.Connect(function () {
  sayPrefersTeam("Prefers Luigi");
  ghostButton.deselect();
  cancelButton.deselect();
});
cancelButton.selected.Connect(function () {
  sayPrefersTeam("No Preference");
  ghostButton.deselect();
  luigiButton.deselect();
});

new Icon()
  .setLabel("Select Role")
  .modifyTheme(["Dropdown", "MaxIcons", 3])
  .setDropdown([ghostButton, luigiButton, cancelButton]);

cancelButton.select();

function sayPrefersTeam(team: string) {
  ReplicatedStorage.PrefersTeamEvent.FireServer(team);
}
