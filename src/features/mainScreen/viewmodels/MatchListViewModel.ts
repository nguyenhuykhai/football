import { useState, useEffect } from 'react';
import { MatchEvent } from '../types/match';

export function useMatchListViewModel() {
  const [matches, setMatches] = useState<MatchEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulating API call
    const fetchMatches = async () => {
      try {
        // In a real app, this would be an API call
        const response = {
          code: 3,
          data: {
            events: [] // Your match data here
          }
        };

        setMatches(response.data.events);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError('Failed to fetch match data');
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return { matches, loading, error };
}