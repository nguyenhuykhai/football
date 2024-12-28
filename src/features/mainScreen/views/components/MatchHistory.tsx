import React from 'react';
import { MatchEvent } from '../../types/match';

interface MatchHistoryProps {
  matches: MatchEvent[];
}

export const MatchHistory: React.FC<MatchHistoryProps> = ({ matches }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-white mb-4">Match History</h2>
      <div className="space-y-3">
        {matches.map((match, index) => (
          <div key={index} className="bg-navy-800 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-white">{match.homeTeam.name}</span>
                <span className="text-2xl text-white">{match.homeTeam.score}</span>
                <span className="text-gray-400">-</span>
                <span className="text-2xl text-white">{match.awayTeam.score}</span>
                <span className="text-white">{match.awayTeam.name}</span>
              </div>
              <div className="text-gray-400">{match.competition}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};