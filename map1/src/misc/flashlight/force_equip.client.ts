const parent: Tool = script.Parent as Tool;

function equipMe() {
  (parent.Parent?.Parent as Player).Character?.FindFirstChildOfClass("Humanoid")?.EquipTool(parent);
}

parent.Unequipped.Connect(equipMe);
task.wait(3);
equipMe();
