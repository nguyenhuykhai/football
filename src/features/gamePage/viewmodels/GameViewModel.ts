// viewmodels/GameViewModel.ts
import { Player } from "../types/Player";
import { Game } from "../types/Game";
import { GameLog } from "../types/GameLog";
import { getRandomElement, getRandomInt, getRandomTechniques } from "src/utils/random";
import { calculatePassSuccess } from "src/utils/calculation";
import { TEAM_LIST } from "src/data/teamList";

class GameViewModel {
  players: Player[] = [];
  logs: GameLog[] = [];
  game: Game | null = null;

  private createPlayer(name: string, jerseyNumber: number, index: number, existingLength: number): Player {
    return {
      id: existingLength + index,
      name,
      jerseyNumber,
      defenseScore: getRandomInt(1, 5),
      techniques: getRandomTechniques(),
      isEliminated: false,
      orderOfPenalty: null,
      score: 0,
      isGhost: false,
    };
  }

  private updatePlayerScore(playerId: number, score: number): void {
    this.players = this.players.map(p => 
      p.id === playerId ? { ...p, score: p.score + score } : p
    );
  }

  private makePlayerGhost(playerId: number): void {
    this.players = this.players.map(p => 
      p.id === playerId ? { ...p, isGhost: true, score: 10 - (this.game?.round || 0) } : p
    );
  }

  private selectNewGhost(): void {
    if (!this.game) return;
    
    const availablePlayers = this.players.filter(p => !p.isGhost);
    if (availablePlayers.length === 0) return;
    
    if (this.game.failedPlayer && !this.game.failedPlayer.isGhost) {
      const foundPlayer = this.findPlayerById(this.game.failedPlayer.id);
      if (foundPlayer) {
        this.game.currentGhostPlayer = foundPlayer;
        this.makePlayerGhost(foundPlayer.id);
      }
    } else {
      this.game.currentGhostPlayer = getRandomElement(availablePlayers);
      this.makePlayerGhost(this.game.currentGhostPlayer.id);
    }
  }

  private handleFailedPass(): void {
    if (!this.game?.currentPlayer) return;
    
    this.game.failedPlayer = this.game.currentPlayer;
    this.game.currentPlayer = null;
    this.game.targetPlayer = null;
    this.game.currentGhostPlayer = null;
  }

  initializeGame(playerNames: {name: string, jerseyNumber: number}[]): void {
    const existingLength = this.players.length;
    const newPlayers = playerNames
      .slice(existingLength)
      .map(({name, jerseyNumber}, index) => this.createPlayer(name, jerseyNumber, index, existingLength));
    
    this.players = [...this.players, ...newPlayers];
    if (!this.game && this.players.length === 10) {
      this.game = this.initializeGameState();
    }
  }

  playRound(): void {
    if (!this.game) {
      this.game = this.initializeGameState();
    }

    if (this.players.every(p => p.isGhost) || this.game.round >= 10) {
      this.endGame();
      return;
    }

    this.game.round = Math.min(this.game.round + 1, 10);
    
    if (this.game.round === 1 || !this.game.currentGhostPlayer) {
      this.selectNewGhost();
    }

    this.playPassingPhase();
  }

  private playPassingPhase(): void {
    let success = true;
    while (success && this.game && !this.game.isFinished) {
      const currentPlayer = this.selectCurrentPlayer();
      const targetPlayer = this.selectTargetPlayer();
      const technique = getRandomElement(currentPlayer.techniques);

      success = calculatePassSuccess(currentPlayer.defenseScore, technique.difficulty);
      this.logs = [...this.logs, {
        round: this.game.round,
        playerFrom: currentPlayer,
        playerTo: targetPlayer,
        techniqueUsed: technique,
        isSuccessful: success
      }];

      if (!success) {
        this.handleFailedPass();
      } else {
        this.updatePlayerScore(currentPlayer.id, technique.difficulty);
        this.game.currentPlayer = targetPlayer;
      }
    }
  }

  private initializeGameState(): Game {
    return {
      round: 0,
      currentPlayer: null,
      targetPlayer: null,
      currentGhostPlayer: null,
      failedPlayer: null,
      isFinished: false,
    };
  }

  private endGame(): void {
    if (!this.game) return;
    this.game.isFinished = true;
    this.game.currentGhostPlayer = null;
    this.game.failedPlayer = null;
  }

  resetAllFields(): void {
    this.game = this.initializeGameState();
    this.logs = [];
    this.players = [];
  }

  isGameFinished(): boolean {
    return this.game?.isFinished || false;
  }

  mockPlayers(): void {
    this.players = TEAM_LIST;
    this.game = this.initializeGameState();
  }

  private selectCurrentPlayer(): Player {
    if (!this.game?.currentPlayer) {
      const availablePlayers = this.players.filter(p => 
        p.id !== this.game?.currentGhostPlayer?.id
      );
      this.game!.currentPlayer = getRandomElement(availablePlayers);
    }
    return this.game!.currentPlayer;
  }

  private selectTargetPlayer(): Player {
    const availablePlayers = this.players.filter(p => 
      p.id !== this.game?.currentPlayer?.id && 
      p.id !== this.game?.currentGhostPlayer?.id
    );
    this.game!.targetPlayer = getRandomElement(availablePlayers);
    return this.game!.targetPlayer;
  }

  private findPlayerById(id: number): Player | null {
    return this.players.find(p => p.id === id) || null;
  }
}

export default new GameViewModel();
