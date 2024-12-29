import React from "react";
import { MatchEvent } from "../../types/match";
import { formatDateAndMonth } from "src/utils/dateUtils";
import CustomCard from "./CustomCard";

interface MatchHistoryProps {
  matches: MatchEvent[];
}

export const MatchHistory2: React.FC<MatchHistoryProps> = ({ matches }) => {
  return (
    <div className="w-full">
      <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-4 dark:text-white">MATCHES</h2>
      <div className="space-y-2">
        {matches.map((match, index) => (
          <CustomCard
            key={index}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-3 md:p-4 rounded-lg cursor-pointer"
          >
            {/* Time section */}
            <div className="min-w-[40px] space-y-1 md:space-y-2 text-xs md:text-sm text-center font-normal text-black dark:text-gray-400">
              <div>{formatDateAndMonth(match.startTimestamp)}</div>
              <div className="uppercase text-[10px] md:text-xs">{match.status.type}</div>
            </div>

            {/* Teams section */}
            <div className="space-y-1 md:space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 md:w-5 md:h-5">
                  <img
                    src={`https://img.uniscore.com/football/team/${match.homeTeam.id}/image/small`}
                    alt={match.homeTeam.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="text-sm md:text-base dark:text-white truncate">{match.homeTeam.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 md:w-5 md:h-5">
                  <img
                    src={`https://img.uniscore.com/football/team/${match.awayTeam.id}/image/small`}
                    alt={match.awayTeam.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="text-sm md:text-base dark:text-white truncate">{match.awayTeam.name}</span>
              </div>
            </div>

            {/* Scores section */}
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="flex flex-col space-y-2">
                <span className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center bg-blue-500 text-white rounded text-sm md:text-base">
                  {match.homeScore.display}
                </span>
                <span className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center bg-blue-500 text-white rounded text-sm md:text-base">
                  {match.awayScore.display}
                </span>
              </div>

              {match.winnerCode && (
                <span className="px-1.5 py-0.5 md:px-2 md:py-1 text-[10px] md:text-xs text-white bg-orange-500 rounded">
                  8.2
                </span>
              )}

              <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </CustomCard>
        ))}
      </div>
    </div>
  );
};
