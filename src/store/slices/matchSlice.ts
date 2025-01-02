import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MatchEvent } from 'src/features/mainPage/types/match';

interface MatchState {
  matches: MatchEvent[];
  loading: boolean;
  error: string | null;
}

const initialState: MatchState = {
  matches: [],
  loading: false,
  error: null,
};

const matchSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    fetchMatchesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMatchesSuccess: (state, action: PayloadAction<MatchEvent[]>) => {
      state.matches = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchMatchesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchMatchesStart, fetchMatchesSuccess, fetchMatchesFailure } = matchSlice.actions;
export default matchSlice.reducer;