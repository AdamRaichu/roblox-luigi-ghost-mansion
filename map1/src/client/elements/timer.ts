import Roact from "@rbxts/roact";

type TimerState = Readonly<{ duration: number; stopAtZero: boolean; prefixText: string; suffixText: string }>;

interface TimerComponentProperties {
  duration: number;
  stopAtZero: boolean;
  prefixText?: string;
  suffixText?: string;
}

export class GameTimerComponent extends Roact.Component {
  declare state: TimerState;

  private running: boolean = false;

  /**
   * A representation of the gamer timer as a UI element.
   * @param duration the initial value of the timer (in seconds).
   */
  constructor(props: TimerComponentProperties) {
    super({});
    this.setState({
      duration: props.duration,
      stopAtZero: props.stopAtZero,
      // eslint-disable-next-line roblox-ts/lua-truthiness
      prefixText: props?.prefixText ? props.prefixText : "",
      // eslint-disable-next-line roblox-ts/lua-truthiness
      suffixText: props?.suffixText ? props.suffixText : "",
    });
  }

  public render(): Roact.Element | undefined {
    const currentDuration = this.state.duration;

    const label = Roact.createElement(
      "TextLabel",
      {
        Text: this.state.prefixText + tostring(currentDuration) + this.state.suffixText,
        TextColor3: Color3.fromRGB(92, 0, 105),
        TextScaled: true,
        Size: new UDim2(1, 0, 1, 0),
      },
      { UICorner: Roact.createElement("UICorner", { CornerRadius: new UDim(0.5, 0) }) },
    );
    return label;
  }

  protected didMount(): void {
    this.running = true;

    spawn(() => {
      while (this.running) {
        this.setState((state: TimerState) => {
          return {
            duration: state.duration - 1,
          };
        });

        if (this.state.duration <= 0 && this.state.stopAtZero) {
          this.running = false;
          break;
        }

        task.wait(1);
      }
    });
  }

  protected willUnmount(): void {
    this.running = false;
  }
}
