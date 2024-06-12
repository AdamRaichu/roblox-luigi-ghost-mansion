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
