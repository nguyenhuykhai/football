import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './';
import { fetchPlayerStart, fetchPlayerSuccess, fetchPlayerFailure } from '../../../store/slices/playerSlice';
import { fetchPlayer } from '../services/api';

export const usePlayerData = () => {
  const dispatch = useAppDispatch();
  const { player, loading, error } = useAppSelector((state) => state.player);

  useEffect(() => {
    const loadPlayer = async () => {
      dispatch(fetchPlayerStart());
      try {
        const data = await fetchPlayer();
        dispatch(fetchPlayerSuccess(data));
      } catch (err) {
        console.log(err);
        dispatch(fetchPlayerFailure('Failed to fetch player data'));
      }
    };

    loadPlayer();
  }, [dispatch]);

  return { player, loading, error };
};