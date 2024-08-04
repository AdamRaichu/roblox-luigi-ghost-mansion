import { AwarenessLevel } from "shared/enums";
import * as Constants from "shared/contants";
import { calculate2dDistance } from "shared/distance";

const ServerStorage = game.GetService("ServerStorage");

export function createAwarenessIndicator(player: Player): void {
  const headAttach = new Instance("Attachment");
  headAttach.Name = "AwarenessIndicatorAttachment";
  headAttach.Position = new Vector3(0, 2, 0);
  headAttach.Parent = player.Character?.WaitForChild("Head") as Part;

  const indicatorAttach = new Instance("Attachment");
  const constraint = new Instance("RigidConstraint");
  constraint.Parent = headAttach;
  constraint.Attachment0 = headAttach;
  constraint.Attachment1 = indicatorAttach;
}

export function updateAwarenessIndicator(player: Player, level: AwarenessLevel): void {
  const questionIndicator = ServerStorage.Question.Clone() as QuestionModel;
  const exclamationIndicator = ServerStorage.Exclamation.Clone() as ExclamationModel;
  const doubleExclamationIndicator = ServerStorage.DoubleExclamation.Clone() as DoubleExclamationModel;

  const target = (
    (player.Character?.WaitForChild("Head") as Part).WaitForChild("AwarenessIndicatorAttachment") as Attachment
  ).FindFirstChildOfClass("RigidConstraint") as RigidConstraint;

  if (getCurrentAwarenessLevel(player) === level) {
    return;
  }

  // Destroy the old indicator if there was one.
  if (target.Attachment1?.Parent) {
    const oldType = target.Attachment1?.FindFirstChildOfClass("StringValue")?.Value;
    switch (oldType) {
      case "Q":
      case "E":
        target.Attachment1?.Parent?.Parent?.Destroy();
        break;
      case "DE":
        target.Attachment1?.Parent?.Parent?.Parent?.Destroy();
        break;

      case undefined:
      default:
        print(target.Attachment1);
        error("Unexpected Type value in AwarenessIndicatorAttachment");
        break;
    }
  }

  switch (level) {
    case AwarenessLevel.Question:
      target.Attachment1 = questionIndicator.Question.Attachment;
      questionIndicator.Parent = player.Character;
      break;

    case AwarenessLevel.Exclamation:
      target.Attachment1 = exclamationIndicator.Dot.Attachment;
      exclamationIndicator.Parent = player.Character;
      break;

    case AwarenessLevel.DoubleExclamation:
      target.Attachment1 = doubleExclamationIndicator.ExclamationWithAttach.Dot.Attachment;
      doubleExclamationIndicator.Parent = player.Character;
      break;

    case AwarenessLevel.Oblivious:
    default:
      break;
  }
}

export function getAwarenessLevel(distance: number): AwarenessLevel {
  if (distance < 0) {
    warn(`Received negative number in getAwarenessLevel (${distance}). Returning AwarenessLevel.DoubleExclamation.`);
  }
  if (distance <= Constants.DoubleExclamationDistance) {
    return AwarenessLevel.DoubleExclamation;
  } else if (distance > Constants.DoubleExclamationDistance && distance <= Constants.ExclamationDistance) {
    return AwarenessLevel.Exclamation;
  } else if (distance > Constants.ExclamationDistance && distance <= Constants.QuestionDistance) {
    return AwarenessLevel.Question;
  }
  return AwarenessLevel.Oblivious;
}

export function updateAwarenessForAll(luigis: Player[], ghost: Player): void {
  luigis.forEach(function (luigi) {
    updateAwarenessIndicator(
      luigi,
      getAwarenessLevel(
        calculate2dDistance(
          luigi.Character?.PrimaryPart?.Position as Vector3,
          ghost.Character?.PrimaryPart?.Position as Vector3,
        ),
      ),
    );
  });
}

function getCurrentAwarenessLevel(player: Player): AwarenessLevel {
  const target = (
    (player.Character?.WaitForChild("Head") as Part).WaitForChild("AwarenessIndicatorAttachment") as Attachment
  ).FindFirstChildOfClass("RigidConstraint") as RigidConstraint;

  return awarenessStringToLevel(target.Attachment1?.FindFirstChildOfClass("StringValue")?.Value ?? "");
}

function awarenessStringToLevel(key: string): AwarenessLevel {
  switch (key) {
    case "Q":
      return AwarenessLevel.Question;
    case "E":
      return AwarenessLevel.Exclamation;
    case "DE":
      return AwarenessLevel.DoubleExclamation;

    default:
      return AwarenessLevel.Oblivious;
  }
}
