const ReplicatedStorage = game.GetService("ReplicatedStorage");
const Teams = game.GetService("Teams");
const MemoryStore = game.GetService("MemoryStoreService");

ReplicatedStorage.PrefersTeamEvent.OnServerEvent.Connect((player: Player, ...args: unknown[]) => {
  // Get team name from event.
  const teamName = args[0] as string;
  Teams.WaitForChild(teamName);

  // Set player team.
  player.Team = Teams.WaitForChild(teamName) as Team;

  // Store to memory for persistence.
  const storage = MemoryStore.GetSortedMap("PreferredTeams");
  storage.SetAsync(tostring(player.UserId), teamName, 600);
});
