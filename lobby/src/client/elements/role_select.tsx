import Roact from "@rbxts/roact";

const Players = game.GetService("Players");
const ReplicatedStorage = game.GetService("ReplicatedStorage");

// Center the frame element in the center of the left side of the screen
export const roleSelect = (
  <screengui Key={"RoleSelectGui"}>
    <frame
      Key={"RoleSelectFrame"}
      Position={new UDim2(0, 0, 0.5, -100)}
      AnchorPoint={new Vector2(0, 0.5)}
      Size={new UDim2(0, 100, 0, 200)}
      BackgroundColor3={Color3.fromRGB(8, 69, 196)}
    >
      <textlabel
        Key={"PreferredRoleLabel"}
        RichText={true}
        Text={"<b>Preferred Role</b>"}
        Position={new UDim2(0.5, 0, 0.05, 0)}
      ></textlabel>
      <textbutton
        Text="👻"
        Key={"GhostButton"}
        TextScaled={true}
        Position={new UDim2(0.1, 0, 0.1, 0)}
        Size={new UDim2(0.8, 0, 0.2, 0)}
        BackgroundTransparency={0}
        Event={{
          MouseButton1Click: () => {
            sayPrefersTeam("Prefers Ghost");
          },
        }}
      ></textbutton>
      <textbutton
        Text="🔦"
        Key={"LuigiButton"}
        TextScaled={true}
        Position={new UDim2(0.1, 0, 0.4, 0)}
        Size={new UDim2(0.8, 0, 0.2, 0)}
        BackgroundTransparency={0}
        Event={{
          MouseButton1Click: () => {
            sayPrefersTeam("Prefers Luigi");
          },
        }}
      ></textbutton>
      <textbutton
        Key={"EitherButton"}
        Text="🤷‍♂️"
        TextScaled={true}
        Position={new UDim2(0.1, 0, 0.7, 0)}
        Size={new UDim2(0.8, 0, 0.2, 0)}
        BackgroundTransparency={0}
        Event={{
          MouseButton1Click: () => {
            sayPrefersTeam("No Preference");
          },
        }}
      ></textbutton>
    </frame>
  </screengui>
);

function destroyRoleSelect() {
  Players.LocalPlayer.FindFirstChildOfClass("PlayerGui")?.WaitForChild("RoleSelectGui")?.Destroy();
}

function sayPrefersTeam(team: string) {
  ReplicatedStorage.PrefersTeamEvent.FireServer(team);
}
