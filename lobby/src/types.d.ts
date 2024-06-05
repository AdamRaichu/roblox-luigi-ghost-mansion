interface Workspace extends Instance {
  Lobby: LobbyFolder;
}

interface LobbyFolder extends Folder {}

interface TextChatService extends Instance {
  TextChannels: TextChannelsFolder;
}

interface TextChannelsFolder extends Folder {
  RBXGeneral: TextChannel;
  RBXSystem: TextChannel;
}

interface ReplicatedStorage extends Instance {
  SystemChatEvent: RemoteEvent;
  PrefersTeamEvent: RemoteEvent;
}

interface Teams extends Instance {
  "Prefers Ghost": Team;
  "Prefers Luigi": Team;
  "No Preference": Team;
}
