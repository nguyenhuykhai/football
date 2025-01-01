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
        isGhost: false,
      };
    });
  
    this.players = [...existingPlayers, ...newPlayers];
    if (!this.game && this.players.length === 10) {
      // Khởi tạo game nếu chưa tồn tại và đã có 10 cầu thủ
      this.game = {
        round: 0,
        currentPlayer: null,
        targetPlayer: null,
        currentGhostPlayer: null,
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
      currentGhostPlayer: null,
      failedPlayer: null,
      isFinished: false,
    };
  }
  
 
  playRound(): void {
    if (!this.game) {
      console.error("Game is not initialized");
      return;
    }
  
    // Kết thúc trò chơi sau 10 lượt
    if (this.players.every((p: Player) => p.isGhost)) {
      console.log("Tất cả cầu thủ đã làm ghost. Trò chơi kết thúc.");
      this.game.isFinished = true;
      return;
    }
  
    // Tăng số vòng chơi (chỉ tăng khi bắt đầu vòng mới)
    if (this.game.round < 10) {
      this.game.round += 1;
    }
  
    // Chọn ghost
    if (this.game.round === 1) { // Nếu là lượi chơi đầu tiên
      this.game.currentGhostPlayer = getRandomElement(this.players);
      this.game.currentGhostPlayer = {
        ...this.game.currentGhostPlayer,
        isGhost: true,
        score: 10 - this.game.round
      };

      // Cập nhật điểm số của cầu thủ
      this.players = this.players.map((p: Player) => {
        if (this.game && p.id === this.game.currentGhostPlayer?.id) {
          return {
            ...p,
            isGhost: true,
            score: 10 - this.game.round
          };
        }
        return p;
      });
      console.log("Cầu thủ " + this.game.currentGhostPlayer?.name + " đã làm ghost!" + " Điểm số: " + this.players.find((p: Player) => this.game && p.id === this.game.currentGhostPlayer?.id)?.score)
    } else if (!this.game.currentGhostPlayer && this.game.failedPlayer) { // Nếu không có ghost và có người bị phạt trong lượt trước
      if (this.isGhost(this.game.failedPlayer)) { // Nếu người bị phạt đã là ghost
        this.game.currentGhostPlayer = getRandomElement(this.players.filter((p: Player) => !p.isGhost));
        this.game.currentGhostPlayer = {
          ...this.game.currentGhostPlayer,
          isGhost: true,
          score: 10 - this.game.round
        };

        // Cập nhật điểm số của cầu thủ
        this.players = this.players.map((p: Player) => {
          if (this.game && p.id === this.game.currentGhostPlayer?.id) {
            return {
              ...p,
              isGhost: true,
              score: 10 - this.game.round
            };
          }
          return p;
        });
        console.log("Cầu thủ " + this.game.currentGhostPlayer?.name + " đã làm ghost!" + " Điểm số: " + this.players.find((p: Player) => this.game && p.id === this.game.currentGhostPlayer?.id)?.score)
      } else { // Nếu người bị phạt không là ghost
        const foundPlayer = this.players.find((p: Player) => p.id === this.game?.failedPlayer?.id);
        if (foundPlayer) {
          this.game.currentGhostPlayer = foundPlayer;
          this.game.currentGhostPlayer = {
            ...this.game.currentGhostPlayer,
            isGhost: true,
            score: 10 - this.game.round
          };
        }

        // Cập nhật điểm số của cầu thủ
        this.players = this.players.map((p: Player) => {
          if (this.game && p.id === this.game.currentGhostPlayer?.id) {
            return {
              ...p,
              isGhost: true,
              score: 10 - this.game.round
            };
          }
          return p;
        });
        console.log("Cầu thủ " + this.game.currentGhostPlayer?.name + " đã làm ghost!" + " Điểm số: " + this.players.find((p: Player) => this.game && p.id === this.game.currentGhostPlayer?.id)?.score)
      }
    }

    let success = true;
  
    // Chuyền bóng liên tục cho đến khi thất bại
    while (success) {
      if (!this.game.currentPlayer) {
        this.game.currentPlayer = getRandomElement(this.players.filter((p: Player) => p.id !== this.game?.currentGhostPlayer?.id));
      }
      this.game.targetPlayer = getRandomElement(this.players.filter((p: Player) => p.id !== this.game?.currentPlayer?.id && p.id !== this.game?.currentGhostPlayer?.id));
      const techniqueUsed: Technique = getRandomElement(this.game.currentPlayer?.techniques || []);
  
      success = calculatePassSuccess(
        this.game.currentPlayer?.defenseScore || 0,
        techniqueUsed.difficulty
      );
  
      this.logs = [
        ...this.logs,
        {
          round: this.game.round,
          playerFrom: this.game.currentPlayer,
          playerTo: this.game.targetPlayer,
          techniqueUsed,
          isSuccessful: success
        },
      ];
  
      if (!success) { // Nếu chuyền bóng thất bại
        console.log(
          `Cầu thủ ${this.game.currentPlayer?.name} thất bại khi sử dụng kỹ năng ${techniqueUsed.name} để chuyền bóng đến ${this.game.targetPlayer?.name}!`
        );
        // Kiểm tra xem người bị phạt có là ghost không
        this.game.failedPlayer = this.game.currentPlayer;
        this.game.currentPlayer = null;
        this.game.targetPlayer = null;
        this.game.currentGhostPlayer = null;
        this.players = this.players.map((p: Player) => {
          if (this.game && p.id === this.game.currentPlayer?.id) {
            return {
              ...p,
              score: (10 - this.game.round) + p.score
            }
          }
          return p;
        })
      } else { // Nếu chuyền bóng thành công
        console.log(
          `Cầu thủ ${this.game.currentPlayer?.name} thành công khi sử dụng kỹ năng ${techniqueUsed.name} để chuyền bóng đến ${this.game.targetPlayer?.name}!`
        );
        this.players = this.players.map((p: Player) => {
          if (this.game && p.id === this.game.currentPlayer?.id) {
            return {
              ...p,
              score: p.score + techniqueUsed.difficulty
            };
          }
          return p;
        })
        this.game.currentPlayer = this.game.targetPlayer;
        this.game.targetPlayer = null;
        this.game.failedPlayer = null;
      }
    }
  
    if (this.game.round >= 10) {
      this.players.map((p: Player) => {
        console.log(`Cầu thủ ${p.name} tổng điểm: ${p.score}`)
      })
      this.game.isFinished = true;
      this.game.currentGhostPlayer = null;
      this.game.failedPlayer = null;
      console.log("Tất cả cầu thủ đã làm ghost. Trò chơi kết thúc.");
    }
  }

  isGameFinished(): boolean {
    return this.game?.isFinished || false;
  }

  isGhost(player: Player): boolean {
    return this.players.some((p: Player) => p.id === player.id && p.isGhost);
  }
}
// Tạo instance duy nhất
const gameViewModel = new GameViewModel();

// Tái sử dụng ở mọi nơi
export default gameViewModel;
