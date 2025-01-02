import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/store";
import { playRound } from "src/store/slices/gameSlice";
import gameViewModel from "src/features/gamePage/viewmodels/GameViewModel";
import RoundDetailsDialog from "../molecules/RoundDetailsDialog";
import SummaryChart from "../molecules/SummaryChart";
import { ListPlayers } from "../molecules/ListPlayers";
import { RoundHistory, RoundSummary } from "../molecules/RoundHistory";

const GamePlay: React.FC<{ onNextStep: () => void }> = ({ onNextStep }) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentRound = useSelector((state: RootState) => state.game.currentRound);
  const logs = useSelector((state: RootState) => state.game.logs);
  const [selectedRound, setSelectedRound] = useState<number | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  const players = gameViewModel.players || [];
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  const roundSummaries: RoundSummary[] = Array.from(new Set(logs.map((log) => log.round)))
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
        <ListPlayers players={sortedPlayers} />

        {/* Round history */}
        <RoundHistory roundSummaries={roundSummaries} setSelectedRound={setSelectedRound} />
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
