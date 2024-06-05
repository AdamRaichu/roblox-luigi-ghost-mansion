-- Compiled with roblox-ts v2.3.0
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local function triggerSystemMessage(message)
	ReplicatedStorage.SystemChatEvent:FireAllClients(message)
	print("Sending system message: " .. message)
end
return {
	triggerSystemMessage = triggerSystemMessage,
}
