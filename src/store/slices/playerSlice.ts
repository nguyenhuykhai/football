import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Player } from 'src/features/mainScreen/types/player';

interface PlayerState {
  player: Player | null;
  loading: boolean;
  error: string | null;
}

const initialState: PlayerState = {
  player: null,
  loading: false,
  error: null,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    fetchPlayerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPlayerSuccess: (state, action: PayloadAction<Player>) => {
      state.player = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchPlayerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchPlayerStart, fetchPlayerSuccess, fetchPlayerFailure } = playerSlice.actions;
export default playerSlice.reducer;