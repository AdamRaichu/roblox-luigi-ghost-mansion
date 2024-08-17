export function makePlayerInvisible(player: Player) {
  changeTransparency_exceptGhostOutfit_exceptHitbox(player, 1);
}

export function makePlayerVisible(player: Player) {
  changeTransparency_exceptGhostOutfit_exceptHitbox(player, 0);
}

function changeTransparency_exceptGhostOutfit_exceptHitbox(player: Player, transparency: number) {
  const character = player.Character;
  if (character === undefined) {
    return;
  }

  character.GetDescendants().forEach((descendant) => {
    if ((descendant.IsA("BasePart") && descendant.Name !== "Hitbox") || descendant.IsA("Decal")) {
      descendant.Transparency = transparency;
    }
    if (descendant.IsA("Accessory") && descendant.Name !== "GhostOutfit") {
      descendant.Handle.Transparency = transparency;
    }
  });
}
