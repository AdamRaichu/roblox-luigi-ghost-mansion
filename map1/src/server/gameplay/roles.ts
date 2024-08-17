import { triggerSystemMessage } from "server/system_message";
import { shuffleArray } from "shared/array_utils";

const MemoryStore = game.GetService("MemoryStoreService");
const Teams = game.GetService("Teams");
const ReplicatedStorage = game.GetService("ReplicatedStorage");

/**
 *
 * @param {Player[]} players An array containing all current players. This function expects that they are on a team with the name `Prefers Ghost`, `Prefers Luigi`, or `No Preference`.
 * @returns {[Player, Player[]]} The first element is the ghost, and the second element is an array of Luigi players.
 */
export function assignRoles(players: Player[]): [Player, Player[]] {
  // Assign roles based on player preferences.
  let wannabeGhosts: Player[] = [];
  let wannabeLuigis: Player[] = [];
  let undecidedPlayers: Player[] = [];

  players.forEach((player) => {
    const preferredTeamStorage = MemoryStore.GetSortedMap("PreferredTeams");
    const playerTeamTuple = preferredTeamStorage.GetAsync(tostring(player.UserId));
    const playerTeam = playerTeamTuple[0];
    // eslint-disable-next-line roblox-ts/lua-truthiness
    const teamName = playerTeam ? playerTeam : "No Preference";

    switch (teamName) {
      case "Prefers Ghost":
        wannabeGhosts.push(player);
        break;
      case "Prefers Luigi":
        wannabeLuigis.push(player);
        break;
      default:
        undecidedPlayers.push(player);
        break;
    }
  });

  wannabeGhosts = shuffleArray(wannabeGhosts);
  wannabeLuigis = shuffleArray(wannabeLuigis);
  undecidedPlayers = shuffleArray(undecidedPlayers);

  if (wannabeGhosts.size() === 0) {
    if (undecidedPlayers.size() === 0) {
      if (wannabeLuigis.size() === 0) {
        // There are no players? This shouldn't happen.
        error("There are no players! They all left. :(");
      }
      // Everyone wants to be a Luigi. Pick a random player from that list to be a ghost.
      wannabeGhosts.push(wannabeLuigis.pop() as Player);
    } else {
      // Nobody wants to be a ghost, but at least one person doesn't care. Pick a random undecided player to be the ghost.
      wannabeGhosts.push(undecidedPlayers.pop() as Player);
    }
  }

  const GhostPlayer = wannabeGhosts.pop() as Player;
  GhostPlayer.Team = Teams.Ghost;
  ReplicatedStorage.GhostUserId.Value = GhostPlayer.UserId;

  // All remaining players become Luigis.
  for (const player of undecidedPlayers) {
    wannabeLuigis.push(player);
  }

  const Luigis = shuffleArray(wannabeLuigis);

  for (const luigi of Luigis) {
    luigi.Team = Teams.Luigi;
  }

  triggerSystemMessage("Teams have been assigned, taking preferences into account when possible.");

  return [GhostPlayer, Luigis];
}
