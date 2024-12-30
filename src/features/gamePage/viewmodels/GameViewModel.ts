// viewmodels/GameViewModel.ts
import { Player } from "../types/Player";
import { Technique } from "../types/Technique";
import { Game } from "../types/Game";
import { GameLog } from "../types/GameLog";
import { TECHNIQUES } from "src/utils/constants";
import { getRandomInt, getRandomElement } from "src/utils/random";
import { calculatePassSuccess } from "src/utils/calculation";

class GameViewModel {
  players: Player[] = [];
  logs: GameLog[] = [];
  game: Game | null = null;

  initializeGame(playerNames: string[]): void {
    // Tạo cầu thủ
    this.players = playerNames.map((name, index) => {
      const defenseScore = getRandomInt(1, 5);
      const techniques: Technique[] = Array.from({ length: 5 }, () =>
        getRandomElement(TECHNIQUES)
      );
      return {
        id: index,
        name,
        jerseyNumber: index + 1,
        defenseScore,
        techniques,
        isEliminated: false,
        orderOfPenalty: null,
        score: 0,
      };
    });

    // Khởi tạo game
    this.game = {
      round: 0,
      currentPlayer: null,
      targetPlayer: null,
      failedPlayer: null,
      isFinished: false,
    };
  }

  playRound(): void {
    if (!this.game || this.game.isFinished) return;

    this.game.round += 1;

    const currentPlayer = getRandomElement(
      this.players.filter((p) => !p.isEliminated)
    );
    const targetPlayer = getRandomElement(
      this.players.filter((p) => p.id !== currentPlayer.id && !p.isEliminated)
    );
    const techniqueUsed = getRandomElement(currentPlayer.techniques);

    const success = calculatePassSuccess(
      targetPlayer.defenseScore,
      techniqueUsed.difficulty
    );

    if (!success) {
      currentPlayer.isEliminated = true;
      currentPlayer.orderOfPenalty = this.game.round;
      this.game.failedPlayer = currentPlayer;
    }

    this.logs.push({
      round: this.game.round,
      playerFrom: currentPlayer,
      playerTo: targetPlayer,
      techniqueUsed,
      isSuccessful: success,
    });

    // Kiểm tra kết thúc
    if (this.players.filter((p) => !p.isEliminated).length === 1) {
      this.game.isFinished = true;
    }
  }
}

export default GameViewModel;
