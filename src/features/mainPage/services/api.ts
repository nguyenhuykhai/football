import playerData from 'src/data/playerInfo.json';
import matchData from 'src/data/matchList.json';
import { Player } from '../types/player';
import { MatchEvent } from '../types/match';

export const fetchPlayer = async (): Promise<Player> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(playerData.data.player);
    }, 500);
  });
};

export const fetchMatches = async (): Promise<MatchEvent[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(matchData.data.events);
    }, 500);
  });
};