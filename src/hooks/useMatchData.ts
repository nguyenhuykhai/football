import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './';
import { fetchMatchesStart, fetchMatchesSuccess, fetchMatchesFailure } from '../store/slices/matchSlice';
import { fetchMatches } from '../services/api';

export const useMatchData = () => {
  const dispatch = useAppDispatch();
  const { matches, loading, error } = useAppSelector((state) => state.matches);

  useEffect(() => {
    const loadMatches = async () => {
      dispatch(fetchMatchesStart());
      try {
        const data = await fetchMatches();
        dispatch(fetchMatchesSuccess(data));
      } catch (err) {
        dispatch(fetchMatchesFailure('Failed to fetch match data'));
      }
    };

    loadMatches();
  }, [dispatch]);

  return { matches, loading, error };
};