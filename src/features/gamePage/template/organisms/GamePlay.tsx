import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/store";
import { playRound, goToStep } from "src/store/slices/gameSlice";

const GamePlay: React.FC<{ onNextStep: () => void }> = ({ onNextStep }) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentRound = useSelector((state: RootState) => state.game.currentRound);
  const logs = useSelector((state: RootState) => state.game.logs);

  const handleNextRound = () => {
    if (currentRound < 10) {
      dispatch(playRound());
    } else {
      dispatch(goToStep(3)); // Chuyển sang bước 3
      onNextStep();
    }
  };

  return (
    <div>
      <h1>Lượt chơi: {currentRound}</h1>
      <button onClick={handleNextRound}>
        {currentRound < 10 ? "Tiếp tục" : "Kết thúc trò chơi"}
      </button>
      <div>
        <h2>Lịch sử:</h2>
        <ul>
          {logs.map((log, index) => (
            <li key={index}>
              Lượt {log.round}: {log.playerFrom.name} chuyền bóng đến {log.playerTo.name} -{" "}
              {log.isSuccessful ? "Thành công" : "Thất bại"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GamePlay;
