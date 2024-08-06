import { Zone } from "@rbxts/zone-plus";

// Welds and Type values are not included in indicator model definitions.
declare global {
  interface QuestionModel extends Model {
    Question: Part & {
      Attachment: Attachment;
    };
  }

  interface ExclamationModel extends Model {
    Part: Part;
    Dot: Part & {
      Attachment: Attachment;
    };
  }

  interface DoubleExclamationModel extends Model {
    ExclamationWithAttach: ExclamationModel;
    Exclamation: Model & {
      Part: Part;
      Dot: Part;
    };
  }

  interface FlashLightTool extends Tool {
    Lights: Folder & {
      L1: Part;
      L2: Part;
      L3: Part;
      L4: Part;
      L5: Model;
    };
    Handle: Part;
  }

  interface LightZones {
    [uid: number]: {
      L1: Zone;
      L2: Zone;
      L3: Zone;
      L4: Zone;
      L5: Zone;
    };
  }
}
