import React from "react";
import { Player } from "../../types/Player";

export type RoundSummary = {
    round: number;
    totalPasses: number;
    result: string;
    failedPlayer: Player | null;
}

interface RoundHistoryProps {
    roundSummaries: RoundSummary[],
    setSelectedRound: (round: number) => void;
}

export const RoundHistory: React.FC<RoundHistoryProps> = ({
  roundSummaries,
  setSelectedRound,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-4">Lịch sử lượt chơi</h2>
      <div className="overflow-y-auto max-h-[600px] pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        <div className="space-y-3">
          {roundSummaries.map((summary) => (
            <div
              key={summary.round}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold">Lượt {summary.round}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Số lần chuyền: {summary.totalPasses}
                  {summary.failedPlayer &&
                    ` - Thất bại: ${summary.failedPlayer.name}`}
                </p>
              </div>
              <button
                onClick={() => setSelectedRound(summary.round)}
                className="px-3 py-1 text-sm bg-blue-600 dark:bg-blue-500 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                Chi tiết
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
