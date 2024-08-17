import { startGame } from "./gameplay/default/setup";
import { triggerSystemMessage } from "./system_message";

const Players = game.GetService("Players");
const TeleportService = game.GetService("TeleportService");
const RunService = game.GetService("RunService");
const ServerStorage = game.GetService("ServerStorage");

if (!RunService.IsStudio() || (RunService.IsStudio() && ServerStorage.CONFIG.StudioOnly.UseLongStartDelay.Value)) {
  triggerSystemMessage("Game starting in 60 seconds.");
  task.wait(15);
  triggerSystemMessage("Game starting in 45 seconds.");
  task.wait(15);
} else {
  task.wait(5);
  print("Skipping the first 30 seconds of delay since we are in studio.");
}
triggerSystemMessage("Game starting in 30 seconds.");
task.wait(5);
triggerSystemMessage("Game starting in 15 seconds.");
task.wait(5);
triggerSystemMessage("Game starting in 10 seconds.");
task.wait(5);
triggerSystemMessage("Game starting in 5...");
task.wait(1);
triggerSystemMessage("4...");
task.wait(1);
triggerSystemMessage("3...");
task.wait(1);
triggerSystemMessage("2...");
task.wait(1);
triggerSystemMessage("1...");
task.wait(1);

const players = Players.GetPlayers();
const playerCount = players.size();

if (playerCount === 1) {
  triggerSystemMessage("You are the only player! Sending you back to the lobby.");
  TeleportService.TeleportAsync(13862972119, players);
} else if (playerCount === 2) {
  triggerSystemMessage("Two player games are not yet supported. Sending you back to the lobby.");
  TeleportService.TeleportAsync(13862972119, players);
} else if (playerCount > 2 && playerCount < 5) {
  startGame(players);
} else {
  print("No players. OR 5+ players. Which would be weird.");
}
