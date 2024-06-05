const ReplicatedStorage = game.GetService("ReplicatedStorage");

export function triggerSystemMessage(message: string) {
  ReplicatedStorage.SystemChatEvent.FireAllClients(message);
  print("Sending system message: " + message);
}
