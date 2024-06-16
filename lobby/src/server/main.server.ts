import { makeHello } from "shared/module";
import { Timer } from "shared/timer";

makeHello("main.server.ts");

const Players = game.GetService("Players");
const Teleport = game.GetService("TeleportService");
const ReplicatedStorage = game.GetService("ReplicatedStorage");

const MapIds = {
  map1: 17721647331,
};

function teleportToMap(players: Player[], mapId: number) {
  const tpOpts = new Instance("TeleportOptions");
  tpOpts.ShouldReserveServer = true;
  Teleport.TeleportAsync(mapId, players, tpOpts);
}

function getPlayerCountTimer() {
  return new Timer(
    15,
    () => {
      const players = Players.GetPlayers();
      triggerSystemMessage("Trying to start game...");
      wait(3);
      if (players.size() > 1) {
        triggerSystemMessage("There are enough players! Teleporting...");
        teleportToMap(players, MapIds.map1);
      } else {
        triggerSystemMessage("There are not enough players! Waiting...");
      }
      playerCountTimer = getPlayerCountTimer();
    },
    0,
    false,
  );
}

let playerCountTimer = getPlayerCountTimer();

// Every time a player joins, run the timer.
Players.PlayerAdded.Connect((player) => {
  playerCountTimer.start();
});

function triggerSystemMessage(message: string) {
  ReplicatedStorage.SystemChatEvent.FireAllClients(message);
  print("Sending system message: " + message);
}
