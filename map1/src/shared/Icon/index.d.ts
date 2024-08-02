/**
 * Typings for TopbarPlus v3, by AdamRaichu
 *
 * For use with roblox-ts.
 */

// Apparently is a reimplementation of RBXScriptSignal, see Packages/GoodSignal.lua
type GoodSignal = RBXScriptSignal;

type IconState = "Deselected" | "Selected" | "Viewing";

declare class Icon {
  // Functions
  getIcons(this: void): {
    [UID: string]: Icon;
  };
  getIcon(this: void, nameOrUID: string): Icon;
  setTopbarEnabled(this: void, bool: boolean): void;
  modifyBaseTheme(this: void, modifications: Array<unknown> | Array<Array<unknown>>): void;
  setDisplayOrder(this: void, integer: number): void;

  // Properties
  readonly name: string;
  readonly isSelected: boolean;
  // Different from the docs, but this is what the code says. See init.lua:299
  readonly isEnabled: boolean;
  readonly totalNotices: number;
  readonly locked: boolean;

  // Events
  readonly selected: GoodSignal;
  readonly deselected: GoodSignal;
  readonly toggled: GoodSignal;
  readonly viewingStarted: GoodSignal;
  readonly viewingEnded: GoodSignal;
  readonly notified: GoodSignal;

  constructor();

  // Methods
  setName(this: Icon, name: string): Icon;
  getInstance(this: Icon, instanceName: string): Instance;
  modifyTheme(this: Icon, modifications: Array<unknown> | Array<Array<unknown>>): Icon;
  modifyChildTheme(this: Icon, modifications: Array<unknown> | Array<Array<unknown>>): Icon;
  setEnabled(this: Icon, bool: boolean): Icon;
  select(this: Icon): Icon;
  deselect(this: Icon): Icon;
  notify(this: Icon, clearNoticeEvent: GoodSignal | BindableEvent): Icon;
  clearNotices(this: Icon): Icon;
  disableOverlay(this: Icon, bool: boolean): Icon;
  setImage(this: Icon, imageId: unknown /* string | number ?*/, iconState?: IconState): Icon;
  setLabel(this: Icon, text: string, iconState?: IconState): Icon;
  setOrder(this: Icon, order: number, iconState: IconState): Icon;
  setCornerRadius(this: Icon, scale: number, offset: number, iconState: IconState): Icon;
  align(this: Icon, alignment: "Left" | "Center" | "Right"): Icon;
  setWidth(this: Icon, minimumSize: number, iconState: IconState): Icon;
  setImageScale(this: Icon, number: number, iconState: IconState): Icon;
  setImageRatio(this: Icon, number: number, iconState: IconState): Icon;
  setTextSize(this: Icon, number: number, iconState: IconState): Icon;
  setTextFont(
    this: Icon,
    font: string | number | Enum.Font,
    fontWeight: Enum.FontWeight,
    fontStyle: Enum.FontStyle,
    iconState: IconState,
  ): Icon;
  bindToggleItem(this: Icon, guiObjectOrLayerCollector: GuiObject | LayerCollector): Icon;
  unbindToggleItem(this: Icon, guiObjectOrLayerCollector: GuiObject | LayerCollector): Icon;
  bindEvent(this: Icon, iconEventName: string, callback: (self: Icon, ...args: unknown[]) => void): Icon;
  unbindEvent(this: Icon, iconEventName: string): Icon;
  bindToggleKey(this: Icon, keyCodeEnum: Enum.KeyCode): Icon;
  unbindToggleKey(this: Icon, keyCodeEnum: Enum.KeyCode): Icon;
  call(this: Icon, func: (self: Icon) => void): Icon;
  // FIXME: I don't know what this is.
  addToJanitor(this: Icon, userdata: unknown): Icon;
  lock(this: Icon): Icon;
  unlock(this: Icon): Icon;
  debounce(this: Icon, seconds: number): Icon;
  autoDeselect(this: Icon, bool: boolean): Icon;
  oneClick(this: Icon, bool: boolean): Icon;
  setCaption(this: Icon, text: string): Icon;
  setCaptionHint(this: Icon, keyCodeEnum: Enum.KeyCode): Icon;
  setDropdown(this: Icon, icons: Array<Icon>): Icon;
  joinDropdown(this: Icon, parentIcon: Icon): Icon;
  setMenu(this: Icon, icons: Array<Icon>): Icon;
  joinMenu(this: Icon, parentIcon: Icon): Icon;
  leave(this: Icon): Icon;
  destroy(this: Icon): Icon;
}

export = Icon;
