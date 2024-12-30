import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store";
import { goToStep, resetGame } from "src/store/slices/gameSlice";
import PlayerRegistration from "./organisms/PlayerRegistration";
import GamePlay from "./organisms/GamePlay";
import GameSummary from "./organisms/GameSummary";
import { resetPlayers } from "src/store/slices/teamSlice";

const GameTemplate: React.FC = () => {
  const currentStep = useSelector((state: RootState) => state.game.currentStep);
  const dispatch = useDispatch();

  const handleGoToStep = (step: number) => {
    dispatch(goToStep(step));
  };

  const handleResetGame = () => {
    dispatch(resetGame());
    dispatch(resetPlayers());
  };

  return (
    <div className="container mx-auto p-4">
      {currentStep === 1 && <PlayerRegistration onNextStep={() => handleGoToStep(2)} />}
      {currentStep === 2 && <GamePlay onNextStep={() => handleGoToStep(3)} />}
      {currentStep === 3 && <GameSummary onReset={() => handleResetGame()} />}
    </div>
  );
};

export default GameTemplate;
