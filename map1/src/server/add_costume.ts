const ServerStorage = game.GetService("ServerStorage");

const ghostJacket = ServerStorage.GhostItems.WaitForChild("GhostOutfit") as Accessory;

export function addGhostOutfit(player: Player) {
  // Add now
  addOutfitToHumanoid(player.Character?.WaitForChild("Humanoid") as Humanoid, ghostJacket);

  // And on respawn.
  player.CharacterAdded.Connect((character) => {
    const hum = character.WaitForChild("Humanoid") as Humanoid;
    addOutfitToHumanoid(hum, ghostJacket);
  });
}

function addOutfitToHumanoid(humanoid: Humanoid, outfit: Accessory) {
  const outfitClone = outfit.Clone();
  outfitClone.Parent = ServerStorage;
  humanoid.AddAccessory(outfitClone);
}
