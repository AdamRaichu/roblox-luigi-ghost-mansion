const ServerStorage = game.GetService("ServerStorage");

const ghostJacket = ServerStorage.WaitForChild("GhostOutfit") as Accessory;

export function addGhostOutfit(player: Player) {
  player.CharacterAdded.Connect((character) => {
    const ghostJacketClone = ghostJacket.Clone();
    ghostJacketClone.Parent = ServerStorage;
    const hum = character.WaitForChild("Humanoid") as Humanoid;
    hum.AddAccessory(ghostJacketClone);
  });
}
