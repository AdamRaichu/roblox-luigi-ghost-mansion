interface ReplicatedStorage extends Instance {
  SystemChatEvent: RemoteEvent;
  GameStartEvent: RemoteEvent;
  MusicController: RemoteEvent;
  GhostVisibilityHelper: RemoteEvent;
}

interface ServerStorage extends Instance {
  GhostOutfit: Accessory;
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

interface SpawnPointsFolder extends Folder {
  Ghost: Part;
  Luigi1: Part;
  Luigi2: Part;
  Luigi3: Part;
  Luigi4: Part;
}

interface Accessory extends Accoutrement {
  Handle: MeshPart;
}

interface Lighting extends Instance {
  GhostHiddenEffect: ColorCorrectionEffect;
}
