-- Compiled with roblox-ts v2.3.0
local ServerStorage = game:GetService("ServerStorage")
local ghostJacket = ServerStorage:WaitForChild("GhostOutfit")
local function addGhostOutfit(player)
	player.CharacterAdded:Connect(function(character)
		local ghostJacketClone = ghostJacket:Clone()
		ghostJacketClone.Parent = ServerStorage
		local hum = character:WaitForChild("Humanoid")
		hum:AddAccessory(ghostJacketClone)
	end)
end
return {
	addGhostOutfit = addGhostOutfit,
}
