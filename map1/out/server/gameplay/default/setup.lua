-- Compiled with roblox-ts v2.3.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local addGhostOutfit = TS.import(script, game:GetService("ServerScriptService"), "TS", "add_costume").addGhostOutfit
local triggerSystemMessage = TS.import(script, game:GetService("ServerScriptService"), "TS", "system_message").triggerSystemMessage
local shuffleArray = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "array_utils").shuffleArray
local Players = game:GetService("Players")
local MemoryStore = game:GetService("MemoryStoreService")
local Teams = game:GetService("Teams")
local assignRoles
local function startGame(players)
	local _binding = assignRoles(players)
	local Ghost = _binding[1]
	local Luigis = _binding[2]
	addGhostOutfit(Ghost)
end
function assignRoles(players)
	-- Assign roles based on player preferences.
	local wannabeGhosts = {}
	local wannabeLuigis = {}
	local undecidedPlayers = {}
	-- ▼ ReadonlyArray.forEach ▼
	local _callback = function(player)
		local preferredTeamStorage = MemoryStore:GetSortedMap("PreferredTeams")
		local playerTeamTuple = { preferredTeamStorage:GetAsync(tostring(player.UserId)) }
		local playerTeam = playerTeamTuple[1]
		-- eslint-disable-next-line roblox-ts/lua-truthiness
		local teamName = if playerTeam ~= "" and playerTeam then playerTeam else "No Preference"
		repeat
			if teamName == "Prefers Ghost" then
				local _wannabeGhosts = wannabeGhosts
				local _player = player
				table.insert(_wannabeGhosts, _player)
				break
			end
			if teamName == "Prefers Luigi" then
				local _wannabeLuigis = wannabeLuigis
				local _player = player
				table.insert(_wannabeLuigis, _player)
				break
			end
			local _undecidedPlayers = undecidedPlayers
			local _player = player
			table.insert(_undecidedPlayers, _player)
			break
		until true
	end
	for _k, _v in players do
		_callback(_v, _k - 1, players)
	end
	-- ▲ ReadonlyArray.forEach ▲
	print(undecidedPlayers)
	wannabeGhosts = shuffleArray(wannabeGhosts)
	wannabeLuigis = shuffleArray(wannabeLuigis)
	undecidedPlayers = shuffleArray(undecidedPlayers)
	print(undecidedPlayers)
	if #wannabeGhosts == 0 then
		if #undecidedPlayers == 0 then
			if #wannabeLuigis == 0 then
				-- There are no players? This shouldn't happen.
				error("There are no players! They all left. :(")
			end
			-- Everyone wants to be a Luigi. Pick a random player from that list to be a ghost.
			local _wannabeGhosts = wannabeGhosts
			-- ▼ Array.pop ▼
			local _length = #wannabeLuigis
			local _result = wannabeLuigis[_length]
			wannabeLuigis[_length] = nil
			-- ▲ Array.pop ▲
			table.insert(_wannabeGhosts, _result)
		else
			-- Nobody wants to be a ghost, but at least one person doesn't care. Pick a random undecided player to be the ghost.
			local _wannabeGhosts = wannabeGhosts
			-- ▼ Array.pop ▼
			local _length = #undecidedPlayers
			local _result = undecidedPlayers[_length]
			undecidedPlayers[_length] = nil
			-- ▲ Array.pop ▲
			table.insert(_wannabeGhosts, _result)
		end
	end
	-- ▼ Array.pop ▼
	local _length = #wannabeGhosts
	local _result = wannabeGhosts[_length]
	wannabeGhosts[_length] = nil
	-- ▲ Array.pop ▲
	local GhostPlayer = _result
	GhostPlayer.Team = Teams.Ghost
	-- All remaining players become Luigis.
	for _, player in undecidedPlayers do
		table.insert(wannabeLuigis, player)
	end
	local Luigis = wannabeLuigis
	for _, luigi in Luigis do
		luigi.Team = Teams.Luigi
	end
	triggerSystemMessage("Teams have been assigned, taking preferences into account when possible.")
	return { GhostPlayer, Luigis }
end
return {
	startGame = startGame,
	assignRoles = assignRoles,
}
