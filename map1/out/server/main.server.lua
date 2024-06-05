-- Compiled with roblox-ts v2.3.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local makeHello = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "module").makeHello
local triggerSystemMessage = TS.import(script, game:GetService("ServerScriptService"), "TS", "system_message").triggerSystemMessage
local MemoryStore = game:GetService("MemoryStoreService")
local Players = game:GetService("Players")
print(makeHello("main.server.ts"))
local preferredTeamStorage = MemoryStore:GetSortedMap("PreferredTeams")
-- Whenever a player joins, send out a system message announcing their team preference.
Players.PlayerAdded:Connect(function(player)
	wait(5)
	local playerTeamTuple = { preferredTeamStorage:GetAsync(tostring(player.UserId)) }
	local playerTeam = playerTeamTuple[1]
	-- eslint-disable-next-line roblox-ts/lua-truthiness
	local teamName = if playerTeam ~= "" and playerTeam then playerTeam else "ERROR: No team preference set. Please report this to the developer."
	triggerSystemMessage(`Player {player.Name} joined the game as a {teamName}.`)
end)
