import { useState, useEffect } from 'react';
import { Player } from '../types/player';

export function usePlayerViewModel() {
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulating API call
    const fetchPlayer = async () => {
      try {
        // In a real app, this would be an API call
        const response = {
          code: 3,
          data: {
            player: {
              id: "sybadnlqgkh8whq",
              name: "Maximo perrone",
              slug: "maximo-perrone",
              shortName: "M.Perrone",
              team: {
                id: "c9dxsq8ovz7r5s2",
                name: "Como",
                slug: "como",
                sport: {
                  name: "Football",
                  slug: "football"
                },
                tournament: {
                  name: "Serie A",
                  slug: "serie-a",
                  category: {
                    name: "Italy",
                    slug: "italy",
                    id: "70asdo2npgu7tmm",
                    sport: {
                      name: "Football",
                      slug: "football"
                    }
                  }
                },
                country: {
                  id: "70asdo2npgu7tmm",
                  name: "Italy"
                }
              },
              position: "M",
              height: 178,
              preferredFoot: null,
              dateOfBirthTimestamp: 1041897600,
              contractUntilTimestamp: 1751212800,
              proposedMarketValue: 9000000,
              proposedMarketValueRaw: {
                value: 9000000,
                currency: "€"
              },
              nationality: {
                id: "jz5xx7no23txee9",
                name: "Argentina"
              }
            }
          }
        };

        setPlayer(response.data.player);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch player data');
        setLoading(false);
      }
    };

    fetchPlayer();
  }, []);

  return { player, loading, error };
}