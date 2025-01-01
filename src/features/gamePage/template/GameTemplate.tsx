import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store";
import { goToStep, resetGame } from "src/store/slices/gameSlice";
import PlayerRegistration from "./organisms/PlayerRegistration";
import GamePlay from "./organisms/GamePlay";
import { resetPlayers } from "src/store/slices/teamSlice";
import Header from "src/common/components/Header";

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
    <div
      className="mx-auto min-h-screen transition-colors duration-200
    dark:bg-dark-main bg-light-main
    dark:text-white text-navy-900"
    >
      <Header />
      {currentStep === 1 && (
        <PlayerRegistration onNextStep={() => handleGoToStep(2)} />
      )}
      {currentStep === 2 && <GamePlay onNextStep={() => handleResetGame()} />}
    </div>
  );
};

export default GameTemplate;
