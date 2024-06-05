-- Compiled with roblox-ts v2.3.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Roact = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact", "src")
local game_ui = TS.import(script, script.Parent, "elements", "game_ui").game_ui
local Players = game:GetService("Players")
local guiTree = Roact.mount(game_ui, Players.LocalPlayer:FindFirstChildOfClass("PlayerGui"))
