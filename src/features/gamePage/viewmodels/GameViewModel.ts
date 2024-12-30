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
    const existingPlayers = this.players || [];
    const newPlayers = playerNames.slice(existingPlayers.length).map((name, index) => {
      const defenseScore = getRandomInt(1, 5);
      const techniques: Technique[] = Array.from({ length: 5 }, () =>
        getRandomElement(TECHNIQUES)
      );
      return {
        id: existingPlayers.length + index,
        name,
        jerseyNumber: existingPlayers.length + index + 1,
        defenseScore,
        techniques,
        isEliminated: false,
        orderOfPenalty: null,
        score: 0,
      };
    });
  
    this.players = [...existingPlayers, ...newPlayers];
  
    if (!this.game && this.players.length === 10) {
      // Khởi tạo game nếu chưa tồn tại và đã có 10 cầu thủ
      this.game = {
        round: 0,
        currentPlayer: null,
        targetPlayer: null,
        failedPlayer: null,
        isFinished: false,
      };
    }
  }  

  playRound(): void {
    if (!this.game) {
      console.error("Game is not initialized");
      return;
    }
    if (this.game.isFinished) return;
  
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
      const updatedPlayer = {
        ...currentPlayer,
        isEliminated: true,
        orderOfPenalty: this.game.round,
      };
  
      // Cập nhật danh sách cầu thủ
      this.players = this.players.map((player) =>
        player.id === currentPlayer.id ? updatedPlayer : player
      );
  
      // Cập nhật failedPlayer trong game
      this.game.failedPlayer = updatedPlayer;
    }
  
    // Cập nhật logs (không thay đổi trực tiếp mảng)
    this.logs = [
      ...this.logs,
      {
        round: this.game.round,
        playerFrom: currentPlayer,
        playerTo: targetPlayer,
        techniqueUsed,
        isSuccessful: success,
      },
    ];
  
    console.log(this.logs);
  
    // Kiểm tra kết thúc
    if (this.players.filter((p) => !p.isEliminated).length === 1) {
      this.game.isFinished = true;
    }
  }  
}
// Tạo instance duy nhất
const gameViewModel = new GameViewModel();

// Tái sử dụng ở mọi nơi
export default gameViewModel;
