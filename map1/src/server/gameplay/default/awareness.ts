import { AwarenessLevel } from "shared/enums";
import * as Constants from "shared/contants";

const ServerStorage = game.GetService("ServerStorage");

export function createAwarenessIndicator(player: Player) {
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

export function updateAwarenessIndicator(player: Player, level: AwarenessLevel) {
  const questionIndicator = ServerStorage.Question.Clone() as QuestionModel;
  const exclamationIndicator = ServerStorage.Exclamation.Clone() as ExclamationModel;
  const doubleExclamationIndicator = ServerStorage.DoubleExclamation.Clone() as DoubleExclamationModel;

  const target = (
    (player.Character?.WaitForChild("Head") as Part).WaitForChild("AwarenessIndicatorAttachment") as Attachment
  ).FindFirstChildOfClass("RigidConstraint") as RigidConstraint;

  // Destroy the old indicator if there was one.
  if (target.Attachment1?.Parent) {
    const oldType = target.Attachment1?.FindFirstChildOfClass("StringValue")?.Value;
    switch (oldType) {
      case "Q":
        target.Attachment1?.Parent?.Parent?.Destroy();
        break;
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
      questionIndicator.Parent = game.Workspace;
      break;

    case AwarenessLevel.Exclamation:
      target.Attachment1 = exclamationIndicator.Dot.Attachment;
      exclamationIndicator.Parent = game.Workspace;
      break;

    case AwarenessLevel.DoubleExclamation:
      target.Attachment1 = doubleExclamationIndicator.ExclamationWithAttach.Dot.Attachment;
      doubleExclamationIndicator.Parent = game.Workspace;
      break;

    case AwarenessLevel.Oblivious:
    default:
      break;
  }
}

export function getAwarenessLevel(distance: number): AwarenessLevel {
  if (distance < 0) {
    warn(`Received negative number in getAwarenessLevel (${distance}). Returning AwarenessLevel.DoubleExclamation.`)
  }
  if (distance <= Constants.DoubleExclamationDistance) {
    return AwarenessLevel.DoubleExclamation
  } else if (distance > Constants.DoubleExclamationDistance && distance <= Constants.ExclamationDistance) {
    return AwarenessLevel.Exclamation;
  } else if (distance > Constants.ExclamationDistance && distance <= Constants.QuestionDistance) {
    return AwarenessLevel.Question;
  }
  return AwarenessLevel.Oblivious;
}