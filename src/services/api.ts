import playerData from '../data/playerInfo.json';
import matchData from '../data/matchList.json';
import { Player } from '../types/player';
import { MatchEvent } from '../types/match';

export const fetchPlayer = async (): Promise<Player> => {
  // Simulating API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(playerData.data.player);
    }, 500);
  });
};

export const fetchMatches = async (): Promise<MatchEvent[]> => {
  // Simulating API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(matchData.data.events);
    }, 500);
  });
};