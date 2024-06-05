const TextChatService = game.GetService("TextChatService");
const ReplicatedStorage = game.GetService("ReplicatedStorage");

const channelsExist = false;

function sendSystemMessage(
	message: string,
	// color: Color3 = Color3.fromHex("#00008b"),
	// font: Enum.Font = Enum.Font.Arial,
	// textSize: number = 14,
) {
	if (!channelsExist) {
		waitForChannels();
	}

	TextChatService.TextChannels.RBXSystem.DisplaySystemMessage("[SYSTEM]: " + message);
}

function waitForChannels() {
	TextChatService.WaitForChild("TextChannels");
	TextChatService.TextChannels.WaitForChild("RBXSystem");
}

ReplicatedStorage.SystemChatEvent.OnClientEvent.Connect(sendSystemMessage);
