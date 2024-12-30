import { makeAutoObservable } from 'mobx';
import { Player, Skill, AVAILABLE_SKILLS } from '../types/gamePlayer';

export class GameViewModel {
  players: Player[] = [];
  currentRound: number = 0;
  penalizedPlayer: Player | null = null;
  gameHistory: Array<{round: number, events: string[]}> = [];

  constructor() {
    makeAutoObservable(this);
  }

  initializePlayers(playerData: Array<{name: string, number: number}>) {
    this.players = playerData.map(data => ({
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      number: data.number,
      defenseRating: Math.floor(Math.random() * 5) + 1,
      skills: this.getRandomSkills(),
      score: 0,
      firstPenaltyOrder: null
    }));
  }

  private getRandomSkills(): Skill[] {
    const shuffled = [...AVAILABLE_SKILLS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  }

  startNewRound() {
    this.currentRound++;
    const availablePlayers = this.players.filter(p => p.firstPenaltyOrder === null);
    const randomIndex = Math.floor(Math.random() * availablePlayers.length);
    const newPenalizedPlayer = availablePlayers[randomIndex];
    
    if (newPenalizedPlayer) {
      newPenalizedPlayer.firstPenaltyOrder = this.currentRound;
      this.penalizedPlayer = newPenalizedPlayer;
    }
  }

  calculateScore(player: Player) {
    if (player.firstPenaltyOrder === null) return 0;
    return (10 - player.firstPenaltyOrder) + player.score;
  }

  getTopPlayers(): Player[] {
    return [...this.players]
      .sort((a, b) => this.calculateScore(b) - this.calculateScore(a))
      .slice(0, 3);
  }
}