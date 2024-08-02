import _Enum = require("./Enum");

type CharacterOrBasePart = Model | BasePart;

// Duplicated in ./Enum/index.d.ts
type DefinedEnum<T> = {
  [name: string]: number;
} & {
  getName(this: DefinedEnum<T>, valueOrProperty: number | T): string | undefined;
  getValue(this: DefinedEnum<T>, nameOrProperty: string | T): number | undefined;
  getProperty(this: DefinedEnum<T>, nameOrValue: string | number): T | undefined;
};

declare class Zone {
  // Undocumented
  static enum: _Enum["enums"];

  // Events
  localPlayerEntered: RBXScriptSignal;
  localPlayerExited: RBXScriptSignal;
  playerEntered: RBXScriptSignal;
  playerExited: RBXScriptSignal;
  partEntered: RBXScriptSignal;
  partExited: RBXScriptSignal;
  itemEntered: RBXScriptSignal;
  itemExited: RBXScriptSignal;

  // Properties
  accuracy: DefinedEnum<number>;
  enterDetection: DefinedEnum<never>;
  exitDetection: DefinedEnum<never>;
  /**
   * When `true`, the zone will update when its group
   * parts change size or position, or when a descendant
   * group part is added or removed from the group.
   */
  autoUpdate: boolean;
  /**
   * When `true`, will prevent the internal `_update()`
   * from being called multiple times within a 0.1 second
   * period.
   */
  respectUpdateQueue: boolean;
  /**
   * An array of baseparts, defined in the container
   * constructor parameter, that form the zone.
   */
  readonly baseParts: BasePart[];
  readonly region: unknown;
  readonly volume: unknown;
  readonly worldModel: WorldModel;

  // Constructors
  /**
   * Constructs a zone from the given CFrame and Size.
   * Underneath the hood, it's creating a part (or
   * multiple parts if any size coordinage exceeds 2024),
   * parenting this to a folder (the container),
   * constructing a zone with this container, calling
   * `:relocate()` on that zone (which parents it outside
   * of workspace), then finally returning the zone.
   * @param cframe
   * @param size
   */
  fromRegion(this: void, cframe: CFrame, size: number): Zone;
  /**
   * A container is used the define the boundaries of the zone.
   * It can be any non-basepart instance (such as a Model,
   * Folder, etc) that contain descendant baseparts.
   * Alternatively a container can be a singular basepart
   * instance, or a table containing an array of baseparts.
   * @param container
   */
  constructor(container: Instance);

  // Methods
  findLocalPlayer(this: Zone): boolean;
  findPlayer(this: Zone, player: Player): boolean;
  findPart(this: Zone, basePart: BasePart): LuaTuple<[boolean, Part[]]>;
  findItem(this: Zone, basePartOrCharacter: CharacterOrBasePart): LuaTuple<[boolean, Part[]]>;
  findPoint(this: Zone, position: Vector3): LuaTuple<[boolean, Part[]]>;
  getPlayers(this: Zone): Array<Player>;
  getParts(this: Zone): Array<Part>;
  getItems(this: Zone): Array<Instance>;
  /**
   * Generates random points within the zones region until one
   * falls within its bounds. It then returns this `Vector3` and
   * a `table array` of group parts the point falls within.
   */
  getRandomPoint(this: Zone): LuaTuple<[Vector3, Part[]]>;
  /**
   * This is used to detect your own custom instances within
   * zones, such as NPCs, and is a recommended replacement for
   * part-events/methods.
   *
   * An item can be any BasePart or Character/NPC (i.e. a model
   * with a Humanoid and HumanoidRootPart). Once tracked, it
   * can be listened for with the `zone.itemEntered` and
   * `zone.itemExited` events.
   *
   * An item will be automatically untracked if destroyed or
   * has its parent set to `nil`.
   * @param characterOrBasePart
   */
  trackItem(this: Zone, characterOrBasePart: CharacterOrBasePart): void;
  untrackItem(this: Zone, characterOrBasePart: CharacterOrBasePart): void;
  /**
   * This is used to bind the zone to a settingsGroup to enhance the
   * default behaviour of a collection of zones. The properties of a
   * settingsGroup can be viewed at and customised using
   * `ZoneController.setGroup`.
   *
   * This method is particularly useful for zones where you want to
   * guarantee the player/item is not in two zones at once. For example,
   * when working with ambient/music/lighting zones which perfectly
   * border each other.
   *
   * @param settingsGroupName
   */
  bindToGroup(this: Zone, settingsGroupName: string): void;
  unbindFromGroup(this: Zone): void;
  /**
   * Sets the precision of checks based upon the{@link https://github.com/1ForeverHD/ZonePlus/blob/main/src/Zone/Enum/Detection.lua Detection Enum}.
   * Defaults to 'Automatic'.
   * @param enumIdOrName
   */
  setDetection(this: Zone, enumIdOrName: number | string): void;
  /**
   * Moves the zone outside of workspace into a separate WorldModel
   * within ReplicatedStorage or ServerStorage. This action is
   * irreversible - once called it cannot be undone.
   */
  relocate(this: Zone): void;
  /**
   * Tracks the item until it has entered the zone, then calls the
   * given function. If the item is already within the zone, the
   * given function is called right away.
   * 
   * ```lua
    local item = character:FindFirstChild("HumanoidRootPart")
    zone:onItemEnter(item, function()
      print("The item has entered the zone!"))
    end)
   * ```
   * @param characterOrBasePart
   * @param callback
   */
  onItemEnter(this: Zone, characterOrBasePart: CharacterOrBasePart, callback: () => void): void;
  /**
   * Tracks the item until it has exited the zone, then calls the
   * given function. If the item is already outside the zone, the
   * given function is called right away.
   * 
   * ```lua
    local item = character:FindFirstChild("HumanoidRootPart")
    zone:onItemExit(item, function()
      print("The item has exited the zone!"))
    end)
   * ```
   * @param characterOrBasePart
   * @param callback
   */
  onItemExit(this: Zone, characterOrBasePart: CharacterOrBasePart, callback: () => void): void;
  /**
   * Disconnects all connections within the zone.
   */
  destroy(this: Zone): void;
}

export = Zone;
