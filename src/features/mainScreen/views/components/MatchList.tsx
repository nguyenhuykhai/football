import React from 'react';
import { MatchEvent } from '../../types/match';
import { formatDate } from '../../../../utils/dateUtils';

interface MatchListProps {
  matches: MatchEvent[];
}

export const MatchList: React.FC<MatchListProps> = ({ matches }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold text-white mb-4">MATCHES</h2>
      <div className="space-y-3">
        {matches.map((match) => (
          <div key={match.id} className="bg-navy-800 rounded-lg p-3 md:p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-2">
                  <div className="text-right min-w-[100px] sm:min-w-[120px]">
                    <span className="text-white text-sm md:text-base">{match.homeTeam.shortName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg md:text-2xl font-bold text-white">{match.homeScore.current}</span>
                    <span className="text-gray-400">-</span>
                    <span className="text-lg md:text-2xl font-bold text-white">{match.awayScore.current}</span>
                  </div>
                  <div className="min-w-[100px] sm:min-w-[120px]">
                    <span className="text-white text-sm md:text-base">{match.awayTeam.shortName}</span>
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-auto flex justify-between sm:justify-end items-center gap-4">
                <span className="text-sm text-blue-400">{match.tournament.name}</span>
                <span className="text-xs md:text-sm text-gray-400">
                  {formatDate(match.startTimestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};