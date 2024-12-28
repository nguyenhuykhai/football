import { useEffect } from 'react';
import { fetchMatchesStart, fetchMatchesSuccess, fetchMatchesFailure } from 'src/store/slices/matchSlice';
import { fetchMatches } from '../services/api';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

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
        console.log(err);
        dispatch(fetchMatchesFailure('Failed to fetch match data'));
      }
    };

    loadMatches();
  }, [dispatch]);

  return { matches, loading, error };
};