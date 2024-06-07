import { makeHello } from "shared/module";
import { triggerSystemMessage } from "./system_message";

const MemoryStore = game.GetService("MemoryStoreService");
const Players = game.GetService("Players");

print(makeHello("main.server.ts"));

const preferredTeamStorage = MemoryStore.GetSortedMap("PreferredTeams");

// Whenever a player joins, send out a system message announcing their team preference.
Players.PlayerAdded.Connect((player) => {
  wait(5);
  const playerTeamTuple = preferredTeamStorage.GetAsync(tostring(player.UserId));
  const playerTeam = playerTeamTuple[0];
  // eslint-disable-next-line roblox-ts/lua-truthiness
  const teamName = playerTeam ? playerTeam : "ERROR: No team preference set. Please report this to the developer.";
  triggerSystemMessage(`Player ${player.Name} joined the game as a ${teamName}.`);

  // player.Character
});

// FIXME: Prevent super fast character rotation.
