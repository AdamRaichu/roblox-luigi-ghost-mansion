import { startGame } from "./gameplay/default/setup";
import { triggerSystemMessage } from "./system_message";

const Players = game.GetService("Players");
const TeleportService = game.GetService("TeleportService");

wait(5);
triggerSystemMessage("Game starting in 25 seconds.");
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
} else {
  startGame(players);
}
