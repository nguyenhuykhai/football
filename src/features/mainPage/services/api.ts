import playerData from 'src/data/playerInfo.json';
import matchData from 'src/data/matchList.json';
import { Player } from 'src/features/mainScreen/types/player';
import { MatchEvent } from 'src/features/mainScreen/types/match';

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