import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/store";
import { playRound } from "src/store/slices/gameSlice";
import gameViewModel from "src/features/gamePage/viewmodels/GameViewModel";

const GamePlay: React.FC<{ onNextStep: () => void }> = ({ onNextStep }) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentRound = useSelector((state: RootState) => state.game.currentRound);
  const logs = useSelector((state: RootState) => state.game.logs);

  // Danh sách cầu thủ
  const isFinished = gameViewModel.game?.isFinished;
  const players = gameViewModel.players || [];

  // Xử lý nhấn nút tiếp tục hoặc kết thúc
  const handleNextRound = () => {
    if (isFinished) {
      onNextStep();
    } else {
      dispatch(playRound());
    }
  };

  // Xếp hạng cầu thủ dựa trên điểm số
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Danh sách cầu thủ */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded p-4">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Danh sách cầu thủ</h2>
          <ul className="space-y-2">
            {sortedPlayers.map((player, index) => (
              <li
                key={player.id}
                className={`p-4 border rounded flex justify-between items-center 
                ${player.isEliminated ? "bg-red-100 dark:bg-red-800" : "bg-gray-50 dark:bg-gray-700"}
                border-gray-200 dark:border-gray-600`}
              >
                <div>
                  <strong>
                    {index + 1}. {player.name}
                  </strong>{" "}
                  <span className="text-sm text-gray-600 dark:text-gray-400">(#{player.jerseyNumber})</span>
                  {player.isEliminated && (
                    <span className="ml-2 text-red-600 dark:text-red-400 text-sm font-bold">Đã bị loại</span>
                  )}
                </div>
                <div>
                  {index === 0 && <span className="text-yellow-500 font-bold">Top 1</span>}
                  {index === 1 && <span className="text-gray-400 font-bold">Top 2</span>}
                  {index === 2 && <span className="text-brown-500 font-bold">Top 3</span>}
                </div>
                <div className="text-sm text-gray-900 dark:text-gray-100">Điểm: {player.score}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* Lịch sử lượt chơi */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded p-4">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Lịch sử lượt chơi</h2>
          <div className="overflow-y-auto max-h-80">
            <ul className="space-y-2">
              {[...logs]
                .reverse() // Đảo thứ tự log (mới nhất trước)
                .map((log, index) => (
                  <li
                    key={index}
                    className="p-4 border rounded bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                  >
                    <span className="block font-bold text-gray-900 dark:text-white">Lượt {log.round}</span>
                    <span className="block text-gray-800 dark:text-gray-300">
                      {log.playerFrom.name} chuyền bóng đến {log.playerTo.name} bằng{" "}
                      <strong>{log.techniqueUsed.name}</strong> -{" "}
                      <span className={log.isSuccessful ? "text-green-600" : "text-red-600"}>
                        {log.isSuccessful ? "Thành công" : "Thất bại"}
                      </span>
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Thông tin lượt chơi */}
      <div className="mt-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Lượt chơi hiện tại: {currentRound}</h1>
        <button
          onClick={handleNextRound}
          className={`mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-md 
          hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none transition-colors`}
        >
          {gameViewModel.isGameFinished() ? "Kết thúc trò chơi" : "Tiếp tục lượt chơi"}
        </button>
      </div>
    </div>
  );
};

export default GamePlay;