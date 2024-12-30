import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "src/store";
import { nextRound } from "src/store/slices/gameSlice";

const GamePlay: React.FC<{ onNextStep: () => void }> = ({ onNextStep }) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentRound = useSelector((state: RootState) => state.game.currentRound);

  const handleNextRound = () => {
    if (currentRound < 10) {
      dispatch(nextRound());
    } else {
      onNextStep();
    }
  };

  return (
    <div>
      <h1>Lượt chơi: {currentRound}</h1>
      <button onClick={handleNextRound}>
        {currentRound < 10 ? "Tiếp tục" : "Kết thúc trò chơi"}
      </button>
    </div>
  );
};

export default GamePlay;
