import { startGame } from "./gameplay/default/setup";
import { triggerSystemMessage } from "./system_message";

const Players = game.GetService("Players");
const TeleportService = game.GetService("TeleportService");
const RunService = game.GetService("RunService");

if (!RunService.IsStudio()) {
  triggerSystemMessage("Game starting in 60 seconds.");
  wait(15);
  triggerSystemMessage("Game starting in 45 seconds.");
  wait(15);
} else {
  wait(5);
  print("Skipping the first 30 seconds of delay since we are in studio.");
}
triggerSystemMessage("Game starting in 30 seconds.");
wait(5);
triggerSystemMessage("Game starting in 15 seconds.");
wait(5);
triggerSystemMessage("Game starting in 10 seconds.");
wait(5);
triggerSystemMessage("Game starting in 5...");
wait(1);
triggerSystemMessage("4...");
wait(1);
triggerSystemMessage("3...");
wait(1);
triggerSystemMessage("2...");
wait(1);
triggerSystemMessage("1...");
wait(1);

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
