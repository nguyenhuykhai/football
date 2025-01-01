import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/store";
import { playRound } from "src/store/slices/gameSlice";
import gameViewModel from "src/features/gamePage/viewmodels/GameViewModel";
import RoundDetailsDialog from "../molecules/RoundDetailsDialog";
import SummaryChart from "../molecules/SummaryChart";

const GamePlay: React.FC<{ onNextStep: () => void }> = ({ onNextStep }) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentRound = useSelector((state: RootState) => state.game.currentRound);
  const logs = useSelector((state: RootState) => state.game.logs);
  const [selectedRound, setSelectedRound] = useState<number | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  const players = gameViewModel.players || [];
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  const roundSummaries = Array.from(new Set(logs.map((log) => log.round)))
    .sort((a, b) => b - a)
    .map((round) => {
      const roundLogs = logs.filter((log) => log.round === round);
      const lastLog = roundLogs[roundLogs.length - 1];
      return {
        round,
        totalPasses: roundLogs.length,
        result: lastLog.isSuccessful ? "Thành công" : "Thất bại",
        failedPlayer: lastLog.isSuccessful ? null : lastLog.playerFrom,
      };
    });

  const handleShowSummary = () => {
    setShowSummary(true);
  }

  return (
    <div className="container mx-auto p-4 text-gray-900 dark:text-gray-100">
      {/* Control buttons */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Lượt chơi hiện tại: {currentRound}
        </h1>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => onNextStep()}
            className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            Quay lại
          </button>
          <button
            onClick={() =>
              currentRound >= 10 ? onNextStep() : dispatch(playRound())
            }
            className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            {currentRound >= 10 ? "Kết thúc trò chơi" : "Tiếp tục lượt chơi"}
          </button>
          <button
            onClick={() => handleShowSummary()}
            disabled={currentRound < 10}
            className="px-6 py-2 bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600 dark:disabled:hover:bg-green-500 transition-colors"
          >
            Biểu đồ kết quả
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Player list */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4">Danh sách cầu thủ</h2>
          <div className="overflow-y-auto max-h-[600px] pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            <ul className="space-y-2">
              {sortedPlayers.map((player, index) => (
                <li
                  key={player.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-between bg-gray-50 dark:bg-gray-700"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{index + 1}.</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{player.name}</span>
                        {player.isGhost && (
                          <span className="px-2 py-1 text-xs font-semibold bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 rounded-full">
                            Ghost
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        #{player.jerseyNumber}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{player.score} điểm</div>
                    {[0, 1, 2].includes(index) && (
                      <span
                        className={`text-sm ${
                          index === 0
                            ? "text-yellow-600 dark:text-yellow-400"
                            : index === 1
                            ? "text-gray-600 dark:text-gray-400"
                            : "text-orange-600 dark:text-orange-400"
                        }`}
                      >
                        Top {index + 1}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Round history */}
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
      </div>

      {/* Round details dialog */}
      {selectedRound && (
        <RoundDetailsDialog
          round={selectedRound}
          logs={logs}
          onClose={() => setSelectedRound(null)}
        />
      )}

      <SummaryChart
        logs={logs}
        isOpen={showSummary}
        onClose={() => setShowSummary(false)}
      />
    </div>
  );
};

export default GamePlay;
