import { addGhostOutfit } from "server/add_costume";
import { GhostVisibilityHelperCommand } from "shared/enums";
import { makePlayerInvisible } from "shared/visibility";
import { assignRoles } from "../roles";
import { createAwarenessIndicator, updateAwarenessForAll } from "./awareness";

const ReplicatedStorage = game.GetService("ReplicatedStorage");

export function startGame(players: Player[]) {
  const [Ghost, Luigis] = assignRoles(players);
  addGhostOutfit(Ghost);
  // TODO: Add Luigi's outfit.
  // Teleport players to spawn points.
  const spawnPointFolder = game.Workspace.WaitForChild("Map").WaitForChild("SpawnPoints") as SpawnPointsFolder;
  Ghost.Character?.MoveTo(spawnPointFolder.Ghost.Position);

  for (let i = 0; i < Luigis.size(); i++) {
    const luigi = Luigis[i];
    const part = spawnPointFolder.WaitForChild("Luigi" + tostring(i + 1)) as Part;
    luigi.Character?.MoveTo(part.Position);

    createAwarenessIndicator(luigi);
  }

  // Trigger client setup.
  ReplicatedStorage.GameStartEvent.FireAllClients();

  // TODO: Freeze players temporarily.
  // TODO: Start music.

  // Make the ghost invisible on all, but visible to the ghost.
  makePlayerInvisible(Ghost);
  ReplicatedStorage.GhostVisibilityHelper.FireClient(Ghost, GhostVisibilityHelperCommand.GhostIsHidden);

  // Testing
  // eslint-disable-next-line no-constant-condition
  while (true) {
    wait(0.1);
    updateAwarenessForAll(Luigis, Ghost);
  }
}
