-- Compiled with roblox-ts v2.3.0
local TextChatService = game:GetService("TextChatService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local channelsExist = false
local waitForChannels
local function sendSystemMessage(message)
	if not channelsExist then
		waitForChannels()
	end
	TextChatService.TextChannels.RBXSystem:DisplaySystemMessage("[SYSTEM]: " .. message)
end
function waitForChannels()
	TextChatService:WaitForChild("TextChannels")
	TextChatService.TextChannels:WaitForChild("RBXSystem")
end
ReplicatedStorage.SystemChatEvent.OnClientEvent:Connect(sendSystemMessage)
