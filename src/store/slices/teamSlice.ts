// store/slices/teamSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "src/features/gamePage/types/Player";
import gameViewModel from "src/features/gamePage/viewmodels/GameViewModel";

interface TeamState {
  players: Player[];
}

const initialState: TeamState = {
  players: [], // Danh sách cầu thủ
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    initializePlayers(state, action: PayloadAction<string[]>) {
      gameViewModel.initializeGame(action.payload); // Dùng ViewModel để khởi tạo cầu thủ
      state.players = gameViewModel.players; // Cập nhật danh sách cầu thủ vào Redux
    },
    resetPlayers(state) {
      gameViewModel.players = []; // Reset trong ViewModel
      state.players = []; // Reset trong Redux
    },
  },
});

export const { initializePlayers, resetPlayers } = teamSlice.actions;
export default teamSlice.reducer;