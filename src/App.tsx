import Header from './components/Header';
import { MatchList } from './components/MatchList';
// import { PlayerInfo } from './components/PlayerInfo';
import { PlayerInfo2 } from './components/PlayerInfo2';
import { useMatchData, usePlayerData } from './hooks';

function App() {
  const { player, loading: playerLoading, error: playerError } = usePlayerData();
  const { matches, loading: matchesLoading, error: matchesError } = useMatchData();

  if (playerLoading || matchesLoading) {
    return <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4">
      <div className="text-white">Loading...</div>
    </div>;
  }

  if (playerError || matchesError) {
    return <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4">
      <div className="text-red-500">Error loading data</div>
    </div>;
  }

  if (!player) {
    return null;
  }

  return (
    <div className="min-h-screen bg-navy-950">
      <Header />
      <div className="px-4 py-6 md:p-6">
        <div className="max-w-7xl mx-auto">
          <PlayerInfo2 player={player} />
          <MatchList matches={matches} />
        </div>
      </div>
    </div>
  );
}

export default App;