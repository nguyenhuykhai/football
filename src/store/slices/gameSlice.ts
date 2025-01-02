// store/slices/gameSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { GameLog } from "src/features/gamePage/types/GameLog";
import gameViewModel from "src/features/gamePage/viewmodels/GameViewModel";

interface GameState {
  currentStep: number;
  currentRound: number;
  logs: GameLog[];
}

const initialState: GameState = {
  currentStep: 1,
  currentRound: 1,
  logs: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    goToStep(state, action) {
      state.currentStep = action.payload;
    },
    playRound(state) {
      const playRoundBound = gameViewModel.playRound.bind(gameViewModel);
      playRoundBound();
    
      state.currentRound = gameViewModel.game?.round || state.currentRound;
      state.logs = gameViewModel.logs;
    },  
    resetGame(state) {
      gameViewModel.resetAllFields();
      state.currentStep = 1;
      state.currentRound = 1;
      state.logs = [];
    },
  },
});

export const { goToStep, playRound, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
