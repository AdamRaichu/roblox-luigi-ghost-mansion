-- Compiled with roblox-ts v2.3.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Roact = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact", "src")
local game_ui = (Roact.createFragment({
	GameUI = Roact.createElement("ScreenGui", {
		ResetOnSpawn = false,
	}, {
		GhostHealthBar = Roact.createElement("Frame", {
			Position = UDim2.new(0, 10, 0, 10),
		}),
		GameTimer = Roact.createElement("Frame"),
		LuigiLightLevels = Roact.createElement("Frame"),
	}),
}))
return {
	game_ui = game_ui,
}
