import React from "react";
import { MatchEvent } from "../../types/match";
import { formatDateAndMonth } from "src/utils/dateUtils";
import { CustomCard, CustomScore } from "../molecules";

interface MatchHistoryProps {
  matches: MatchEvent[];
}

export const MatchHistory: React.FC<MatchHistoryProps> = ({ matches }) => {
  return (
    <div className="w-full mt-4 p-2 md:p-2.5 bg-white dark:bg-[#020C20] rounded-lg">
      <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-4 dark:text-white">MATCHES</h2>
      <div className="space-y-2">
        {matches.map((match, index) => (
          <CustomCard
            key={index}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-3 md:p-4 rounded-lg cursor-pointer shadow-md"
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
                <span className="text-sm md:text-base dark:text-white truncate max-w-[20ch] md:max-w-[40ch]">{match.homeTeam.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 md:w-5 md:h-5">
                  <img
                    src={`https://img.uniscore.com/football/team/${match.awayTeam.id}/image/small`}
                    alt={match.awayTeam.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="text-sm md:text-base dark:text-white truncate max-w-[20ch] md:max-w-[40ch]">{match.awayTeam.name}</span>
              </div>
            </div>

            {/* Scores section */}
            <CustomScore match={match} />
          </CustomCard>
        ))}
      </div>
    </div>
  );
};
