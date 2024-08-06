import { addGhostOutfit } from "server/add_costume";
import { GhostVisibilityHelperCommand } from "shared/enums";
import { makePlayerInvisible, makePlayerVisible } from "shared/visibility";
import { assignRoles } from "../roles";
import { createAwarenessIndicator, updateAwarenessForAll } from "./awareness";
import { Zone } from "@rbxts/zone-plus";

const ReplicatedStorage = game.GetService("ReplicatedStorage");
const ServerStorage = game.GetService("ServerStorage");

export function startGame(players: Player[]) {
  const [Ghost, Luigis] = assignRoles(players);
  addGhostOutfit(Ghost);
  // TODO: Add Luigi's outfit.
  // Teleport players to spawn points.
  const spawnPointFolder = game.Workspace.WaitForChild("Map").WaitForChild("SpawnPoints") as SpawnPointsFolder;
  Ghost.Character?.MoveTo(spawnPointFolder.Ghost.Position);

  const lightZones: LightZones = {};

  for (let i = 0; i < Luigis.size(); i++) {
    const luigi = Luigis[i];
    const part = spawnPointFolder.WaitForChild("Luigi" + tostring(i + 1)) as Part;
    luigi.Character?.MoveTo(part.Position);

    createAwarenessIndicator(luigi);

    // Give luigi's the flashlights.
    const bp = luigi.FindFirstChildOfClass("Backpack");
    const clonedLight = ServerStorage.FlashLight.Clone();
    clonedLight.Parent = bp;

    // Setup flashlight zones.
    const lights = clonedLight.Lights;
    lightZones[luigi.UserId] = {
      L1: new Zone(lights.L1),
      L2: new Zone(lights.L2),
      L3: new Zone(lights.L3),
      L4: new Zone(lights.L4),
      L5: new Zone(lights.L5),
    };
  }

  // Trigger client setup.
  ReplicatedStorage.GameStartEvent.FireAllClients();

  // TODO: Freeze players temporarily.
  // TODO: Start music.

  // Make the ghost invisible on all, but visible to the ghost.
  makePlayerInvisible(Ghost);
  ReplicatedStorage.GhostVisibilityHelper.FireClient(Ghost, GhostVisibilityHelperCommand.GhostIsHidden);

  // Testing
  Luigis.forEach(function (luigi) {
    function printPlayer(player: Player) {
      print("%s entered the zone".format(player.Name));
      if (Ghost.UserId === player.UserId) {
        print("...and they are the Ghost!");
        makePlayerVisible(Ghost);
        ReplicatedStorage.GhostVisibilityHelper.FireClient(Ghost, GhostVisibilityHelperCommand.GhostBecomesVisible);
      }
    }
    const zones = lightZones[luigi.UserId];
    zones.L1.playerEntered.Connect(printPlayer);
    zones.L2.playerEntered.Connect(printPlayer);
    zones.L3.playerEntered.Connect(printPlayer);
    zones.L4.playerEntered.Connect(printPlayer);
    zones.L5.playerEntered.Connect(printPlayer);
  });
  // eslint-disable-next-line no-constant-condition
  while (true) {
    wait(0.1);
    updateAwarenessForAll(Luigis, Ghost);
  }
}
