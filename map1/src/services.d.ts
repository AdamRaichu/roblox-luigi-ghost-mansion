interface ReplicatedStorage extends Instance {
  SystemChatEvent: RemoteEvent;
  GameStartEvent: RemoteEvent;
  GamePreStartEvent: RemoteEvent;
  MusicController: RemoteEvent;
  GhostVisibilityHelper: RemoteEvent;

  GhostUserId: IntValue;
}

interface ServerStorage extends Instance {
  CONFIG: Folder & {
    StudioOnly: Folder & {
      UseLongStartDelay: BoolValue;
    };
  };
  GhostItems: Folder & {
    GhostOutfit: GhostOutfit;
    Dash: Tool;
  };
  Question: Model;
  Exclamation: Model;
  DoubleExclamation: Model;
  FlashLight: FlashLightTool;
}

interface TextChatService extends Instance {
  TextChannels: Folder & {
    RBXGeneral: TextChannel;
    RBXSystem: TextChannel;
  };
}

interface Teams extends Instance {
  Ghost: Team;
  Luigi: Team;
}

interface Accessory extends Accoutrement {
  Handle: MeshPart;
}

interface Lighting extends Instance {
  GhostHiddenEffect: ColorCorrectionEffect;
}
