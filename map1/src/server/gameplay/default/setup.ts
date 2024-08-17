import { addGhostOutfit } from "server/add_costume";
import { ActiveBeam, GhostVisibilityHelperCommand } from "shared/enums";
import { makePlayerInvisible, makePlayerVisible } from "shared/visibility";
import { flashlightZoneListener, getZones } from "../flashlight_utils";
import { assignRoles } from "../roles";
import { createAwarenessIndicator, updateAwarenessForAll } from "./awareness";

const ReplicatedStorage = game.GetService("ReplicatedStorage");
const ServerStorage = game.GetService("ServerStorage");
const Lighting = game.GetService("Lighting");
const TweenService = game.GetService("TweenService");

export function startGame(players: Player[]) {
  ReplicatedStorage.GamePreStartEvent.FireAllClients();

  const [Ghost, Luigis] = assignRoles(players);
  addGhostOutfit(Ghost);
  // TODO: Add Luigi's outfit.

  const ghostBp = Ghost.FindFirstChildOfClass("Backpack");
  const dash = ServerStorage.GhostItems.Dash.Clone();
  const ghostHum = Ghost.Character?.FindFirstChildOfClass("Humanoid") as Humanoid;
  dash.Parent = ghostBp;
  dash.Equipped.Connect(() => {
    makePlayerVisible(Ghost);
    ReplicatedStorage.GhostVisibilityHelper.FireClient(Ghost, GhostVisibilityHelperCommand.GhostBecomesVisible);
    ghostHum.WalkSpeed = 32;
  });
  dash.Unequipped.Connect(() => {
    makePlayerInvisible(Ghost);
    ReplicatedStorage.GhostVisibilityHelper.FireClient(Ghost, GhostVisibilityHelperCommand.GhostIsHidden);
    ghostHum.WalkSpeed = 16;
  });

  const spawnPointFolder = game.Workspace.WaitForChild("Map").WaitForChild("SpawnPoints") as SpawnPointsFolder;
  Ghost.Character?.MoveTo(spawnPointFolder.Ghost.Position);

  const lightZones: LightZones = {};

  for (let i = 0; i < Luigis.size(); i++) {
    const luigi = Luigis[i];
    const startPoint = spawnPointFolder.WaitForChild("Luigi" + tostring(i + 1)) as Part;
    luigi.Character?.MoveTo(startPoint.Position);

    createAwarenessIndicator(luigi);

    // Give luigi's the flashlights.
    const bp = luigi.FindFirstChildOfClass("Backpack");
    const clonedLight = ServerStorage.FlashLight.Clone();
    clonedLight.Parent = bp;
    lightZones[luigi.UserId] = getZones(clonedLight);
    const zones = lightZones[luigi.UserId];
    const OutfitHitbox = ((Ghost.Character as Model).WaitForChild("GhostOutfit") as GhostOutfit).Hitbox;
    zones.L1.trackItem(OutfitHitbox);
    zones.L2.trackItem(OutfitHitbox);
    zones.L3.trackItem(OutfitHitbox);
    zones.L4.trackItem(OutfitHitbox);
    zones.L5.trackItem(OutfitHitbox);
    zones.L1.onItemEnter(OutfitHitbox, () => {
      print("OutfitHitbox entered L1");
    });
    zones.L1.itemEntered.Connect((entered) => {
      flashlightZoneListener(clonedLight, ActiveBeam.L1, entered);
    });
    zones.L2.itemEntered.Connect((entered) => {
      flashlightZoneListener(clonedLight, ActiveBeam.L2, entered);
    });
    zones.L3.itemEntered.Connect((entered) => {
      flashlightZoneListener(clonedLight, ActiveBeam.L3, entered);
    });
    zones.L4.itemEntered.Connect((entered) => {
      flashlightZoneListener(clonedLight, ActiveBeam.L4, entered);
    });
    zones.L5.itemEntered.Connect((entered) => {
      flashlightZoneListener(clonedLight, ActiveBeam.L5, entered);
    });
  }

  // TODO: Freeze players temporarily.
  task.wait(2);
  TweenService.Create(Lighting, new TweenInfo(0.2, Enum.EasingStyle.Exponential, Enum.EasingDirection.In), {
    Brightness: 0,
  }).Play();

  // Make the ghost invisible on all, but visible to the ghost.
  makePlayerInvisible(Ghost);
  ReplicatedStorage.GhostVisibilityHelper.FireClient(Ghost, GhostVisibilityHelperCommand.GhostIsHidden);

  // Trigger client setup.
  ReplicatedStorage.GameStartEvent.FireAllClients();
  // TODO: Start music.

  // eslint-disable-next-line no-constant-condition
  while (true) {
    task.wait(0.1);
    updateAwarenessForAll(Luigis, Ghost);
  }
}
