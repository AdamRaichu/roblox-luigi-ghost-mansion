import { makeHello } from "shared/module";
import { triggerSystemMessage } from "./system_message";

const MemoryStore = game.GetService("MemoryStoreService");
const Players = game.GetService("Players");

print(makeHello("main.server.ts"));

const preferredTeamStorage = MemoryStore.GetSortedMap("PreferredTeams");

Players.PlayerAdded.Connect((player) => {
  // wait(5);
});

// FIXME: Prevent super fast character rotation.
