// store/slices/teamSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRandomInt, getRandomElement } from "../../utils/random";
import { TECHNIQUES } from "../../utils/constants";
import { Player } from "src/features/gamePage/types/Player";

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
    addPlayer(state, action: PayloadAction<{ name: string; jerseyNumber: number }>) {
      const newPlayer: Player = {
        id: state.players.length,
        name: action.payload.name,
        jerseyNumber: action.payload.jerseyNumber,
        defenseScore: getRandomInt(1, 5),
        techniques: Array.from({ length: 5 }, () => getRandomElement(TECHNIQUES)),
        isEliminated: false,
        orderOfPenalty: null,
        score: 0,
      };
      state.players.push(newPlayer);
    },
    resetPlayers(state) {
      state.players = [];
    },
    updatePlayerScore(state, action: PayloadAction<{ id: number; score: number }>) {
      const player = state.players.find((p) => p.id === action.payload.id);
      if (player) {
        player.score += action.payload.score;
      }
    },
  },
});

export const { addPlayer, resetPlayers, updatePlayerScore } = teamSlice.actions;
export default teamSlice.reducer;