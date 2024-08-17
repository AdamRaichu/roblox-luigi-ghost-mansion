export enum MusicControllerCommand {
  BeginMusic = "BeginMusic",
  PlayerDie_Continue = "PlayerDie.Continue",
  GameOver_GhostWin = "GameOver.GhostWin",
  GameOver_PlayerWin = "GameOver.PlayerWin",
}

export enum GhostVisibilityHelperCommand {
  GhostIsHidden = "GhostIsHidden",
  GhostBecomesVisible = "GhostBecomesVisible",
}

export enum AwarenessLevel {
  Question = "Question",
  Exclamation = "Exclamation",
  DoubleExclamation = "DoubleExclamation",
  Oblivious = "Oblivious",
}

export enum ActiveBeam {
  L1 = "L1",
  L2 = "L2",
  L3 = "L3",
  L4 = "L4",
  L5 = "L5",
  Dead = "Dead",
}
