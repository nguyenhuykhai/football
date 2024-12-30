// store/slices/gameSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { GameLog } from "src/features/gamePage/types/GameLog";
import gameViewModel from "src/features/gamePage/viewmodels/GameViewModel";

interface GameState {
  currentStep: number;
  currentRound: number;
  logs: GameLog[]; // Lưu lịch sử vòng chơi
}

const initialState: GameState = {
  currentStep: 1, // Bước hiện tại
  currentRound: 1, // Lượt chơi hiện tại
  logs: [], // Lịch sử chơi
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
      playRoundBound(); // Xử lý vòng chơi bằng ViewModel
      state.currentRound = gameViewModel.game?.round || state.currentRound; // Cập nhật lượt
      state.logs = gameViewModel.logs; // Cập nhật lịch sử
    },
    resetGame(state) {
      gameViewModel.initializeGame([]); // Reset ViewModel
      state.currentStep = 1;
      state.currentRound = 1;
      state.logs = [];
    },
  },
});

export const { goToStep, playRound, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
