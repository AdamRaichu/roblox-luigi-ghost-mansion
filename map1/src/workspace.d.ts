// Welds and Type values are not included in indicator model definitions.
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
