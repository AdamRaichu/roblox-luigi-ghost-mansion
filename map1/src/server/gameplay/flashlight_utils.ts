import { Zone } from "@rbxts/zone-plus";
import { ActiveBeam } from "shared/enums";

const ReplicatedStorage = game.GetService("ReplicatedStorage");

function rawIntToActiveBeams(power: number): ActiveBeam {
  return ActiveBeam.L5;
  // FIXME: This is testing code.
  switch (
    tostring(os.time() * 2)
      .reverse()
      .sub(0, 0)
  ) {
    case "2":
      return ActiveBeam.L1;
    case "4":
      return ActiveBeam.L2;
    case "6":
      return ActiveBeam.L3;
    case "8":
      return ActiveBeam.L4;
    case "0":
      return ActiveBeam.L5;

    default:
      return ActiveBeam.Dead;
  }
}

export function getBeamLevel(light: FlashLightTool): ActiveBeam {
  return rawIntToActiveBeams(light.CurrentPower.Value);
}

export function createBeamPowerImpl(light: FlashLightTool) {
  light.CurrentPower.Changed.Connect(function (power) {
    const beam = getBeamLevel(light);
    // Make all beams invisible
    light.Lights["L1"].Transparency = 1;
    light.Lights["L2"].Transparency = 1;
    light.Lights["L3"].Transparency = 1;
    light.Lights["L4"].Transparency = 1;
    light.Lights["L5"].L4.Transparency = 1;
    light.Lights["L5"].L5.Transparency = 1;
    // Make the beam visible
    switch (beam) {
      case "L1":
        light.Lights["L1"].Transparency = 0;
        break;
      case "L2":
        light.Lights["L2"].Transparency = 0;
        break;
      case "L3":
        light.Lights["L3"].Transparency = 0;
        break;
      case "L4":
        light.Lights["L4"].Transparency = 0;
        break;
      case "L5":
        light.Lights["L5"].L4.Transparency = 0;
        light.Lights["L5"].L5.Transparency = 0;
        break;
      case "Dead":
        break;
    }
  });
}

export function getZones(light: FlashLightTool) {
  const lights = light.Lights;
  return {
    L1: new Zone(lights.L1),
    L2: new Zone(lights.L2),
    L3: new Zone(lights.L3),
    L4: new Zone(lights.L4),
    L5: new Zone(lights.L5),
  };
}

export function flashlightZoneListener(light: FlashLightTool, zoneId: ActiveBeam, entered: Model | BasePart) {
  print("flashlightZoneListener");
  if (!(entered.Name === "Hitbox")) {
    return;
  }
  const currentPower = getBeamLevel(light);
  if (currentPower !== zoneId) {
    return;
  }

  // if (!light.)

  // At this point, we know we've tagged the ghost with the correct beam.
  // However, we don't know if the flashlight is on.
  print("Gottem");
}
