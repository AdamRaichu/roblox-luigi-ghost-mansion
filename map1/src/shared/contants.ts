export const DoubleExclamationDistance = 0; // FIXME: Set actual values.
export const ExclamationDistance = 0;
export const QuestionDistance = 0;
// 0 < DoubleExclamationDistance < ExclamationDistance < QuestionDistance
assert(DoubleExclamationDistance > 0 && DoubleExclamationDistance < ExclamationDistance && ExclamationDistance < QuestionDistance
  , "Invalid constants for awareness indicator distances. Please review them.");
