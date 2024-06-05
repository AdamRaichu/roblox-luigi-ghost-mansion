-- Compiled with roblox-ts v2.3.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local startGame = TS.import(script, game:GetService("ServerScriptService"), "TS", "gameplay", "default", "setup").startGame
local triggerSystemMessage = TS.import(script, game:GetService("ServerScriptService"), "TS", "system_message").triggerSystemMessage
local Players = game:GetService("Players")
local TeleportService = game:GetService("TeleportService")
wait(5)
triggerSystemMessage("Game starting in 25 seconds.")
wait(5)
triggerSystemMessage("Game starting in 15 seconds.")
wait(5)
triggerSystemMessage("Game starting in 10 seconds.")
wait(5)
triggerSystemMessage("Game starting in 5...")
wait(1)
triggerSystemMessage("4...")
wait(1)
triggerSystemMessage("3...")
wait(1)
triggerSystemMessage("2...")
wait(1)
triggerSystemMessage("1...")
wait(1)
local players = Players:GetPlayers()
local playerCount = #players
if playerCount == 1 then
	triggerSystemMessage("You are the only player! Sending you back to the lobby.")
	TeleportService:TeleportAsync(13862972119, players)
elseif playerCount == 2 then
	triggerSystemMessage("Two player games are not yet supported. Sending you back to the lobby.")
	TeleportService:TeleportAsync(13862972119, players)
else
	startGame(players)
end
