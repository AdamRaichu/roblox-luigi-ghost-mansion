import Zone from "..";

declare class ZoneController {
  getZones(this: void): Zone[];
  getTouchingZone(this: void, player: Player): LuaTuple<[Zone[], object]>;
  /**
   * `properties` is a dictionary defining the
   * groups settings. The default properties are:
   *
   * ```lua
    {
      onlyEnterOnceExitedAll = true, -- When set to `true`, it prevents items (players, parts, etc) from entering multiple zones at once within that group.
    }
   * ```
   *
   * A zone can be bound to a group using {@link https://1foreverhd.github.io/ZonePlus/api/zone/#bindtogroup zone:bindToGroup}.
   * @param settingsGroupName
   * @param properties
   */
  setGroup(this: void, settingsGroupName: string, properties: object): object;
  getGroup(this: void, settingsGroupName: string): object;
}
