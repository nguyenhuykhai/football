import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "src/features/gamePage/types/Player";
import gameViewModel from "src/features/gamePage/viewmodels/GameViewModel";

interface TeamState {
  players: Player[];
}

const initialState: TeamState = {
  players: [],
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    initializePlayers(state, action: PayloadAction<{name: string, jerseyNumber: number}[]>): void {
      gameViewModel.initializeGame(action.payload);
      state.players = gameViewModel.players;
    },
    mockPlayers(state) {
      gameViewModel.mockPlayers();
      state.players = gameViewModel.players;
    },
    resetPlayers(state) {
      gameViewModel.players = [];
      state.players = [];
    },
  },
});

export const { initializePlayers, resetPlayers, mockPlayers } = teamSlice.actions;
export default teamSlice.reducer;