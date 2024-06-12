import { MusicControllerCommand } from "shared/enums";

const ReplicatedStorage = game.GetService("ReplicatedStorage");

ReplicatedStorage.MusicController.OnClientEvent.Connect(function (cmd: MusicControllerCommand & string) {
  print(`Received ${cmd} command from MusicController.`);
  switch (cmd) {
    case MusicControllerCommand.BeginMusic:
      // Play the music.
      break;

    default:
      error(`Unexpected command!`);
      break;
  }
});
