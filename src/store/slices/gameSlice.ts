// store/slices/gameSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
  currentStep: number; // Bước hiện tại: 1 - đăng ký, 2 - trò chơi, 3 - tổng kết
  currentRound: number; // Lượt chơi hiện tại
}

const initialState: GameState = {
  currentStep: 1, // Bắt đầu ở bước đăng ký cầu thủ
  currentRound: 1, // Bắt đầu từ lượt chơi đầu tiên
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    goToStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    nextRound(state) {
      if (state.currentRound < 10) {
        state.currentRound += 1;
      }
    },
    resetGame(state) {
      state.currentStep = 1;
      state.currentRound = 1;
    },
  },
});

export const { goToStep, nextRound, resetGame } = gameSlice.actions;
export default gameSlice.reducer;