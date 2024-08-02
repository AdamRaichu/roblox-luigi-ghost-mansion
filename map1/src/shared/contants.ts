export const DoubleExclamationDistance = 5; // FIXME: Set actual values.
export const ExclamationDistance = 8;
export const QuestionDistance = 12;
// 0 < DoubleExclamationDistance < ExclamationDistance < QuestionDistance
assert(
  DoubleExclamationDistance > 0 &&
    DoubleExclamationDistance < ExclamationDistance &&
    ExclamationDistance < QuestionDistance,
  "Invalid constants for awareness indicator distances. Please review them.",
);
