// viewmodels/GameViewModel.ts
import { Player } from "../types/Player";
import { Game } from "../types/Game";
import { GameLog } from "../types/GameLog";
import { getRandomInt, getRandomElement, getRandomTechniques } from "src/utils/random";
import { calculatePassSuccess } from "src/utils/calculation";
import { TEAM_LIST } from "src/data/teamList";
import { Technique } from "../types/Technique";

class GameViewModel {
  players: Player[] = [];
  logs: GameLog[] = [];
  game: Game | null = null;

  initializeGame(playerNames: string[]): void {
    const existingPlayers = this.players || [];
    const newPlayers = playerNames.slice(existingPlayers.length).map((name, index) => {
      const defenseScore = getRandomInt(1, 5);
      const techniques: Technique[] = getRandomTechniques();
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

  mockPlayers(): void {
    this.players = TEAM_LIST;
    this.game = {
      round: 0,
      currentPlayer: null,
      targetPlayer: null,
      failedPlayer: null,
      isFinished: false,
    };
  }
  
 
  playRound(): void {
    if (!this.game) {
      console.error("Game is not initialized");
      return;
    }
    if (this.game.isFinished) return;
  
    const availablePlayers = this.players.filter((p) => !p.isEliminated);
    if (availablePlayers.length < 2) {
      console.error("Không đủ cầu thủ để tiếp tục.");
      this.game.isFinished = true;
      return;
    }
  
    this.game.round += 1;
  
    const currentPlayer = getRandomElement(availablePlayers);
    const targetPlayer = getRandomElement(
      availablePlayers.filter((p) => p.id !== currentPlayer.id)
    );
    const techniqueUsed = getRandomElement(currentPlayer.techniques);
    console.log("Kỹ thuật sử dụng: ", techniqueUsed);
  
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
  
      this.players = this.players.map((player) =>
        player.id === currentPlayer.id ? updatedPlayer : player
      );
  
      this.game.failedPlayer = updatedPlayer;
    }
  
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
  
    if (this.isGameFinished()) {
      this.game.isFinished = true;
    }
  }

  isGameFinished(): boolean {
    const activePlayers = this.players.filter((p) => !p.isEliminated);
    return activePlayers.length === 1;
  }
}
// Tạo instance duy nhất
const gameViewModel = new GameViewModel();

// Tái sử dụng ở mọi nơi
export default gameViewModel;
