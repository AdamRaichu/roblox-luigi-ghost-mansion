interface ReplicatedStorage extends Instance {
  SystemChatEvent: RemoteEvent;
  GameStartEvent: RemoteEvent;
}

interface TextChatService extends Instance {
  TextChannels: TextChannelsFolder;
}

interface TextChannelsFolder extends Folder {
  RBXGeneral: TextChannel;
  RBXSystem: TextChannel;
}

interface Teams extends Instance {
  Ghost: Team;
  Luigi: Team;
}
