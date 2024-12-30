import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './slices/playerSlice';
import matchReducer from './slices/matchSlice';
import teamReducer from './slices/teamSlice';
import gameReducer from './slices/gameSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    matches: matchReducer,
    team: teamReducer,
    game: gameReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;