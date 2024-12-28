import Header from "../../../common/components/Header";
import { useMatchData, usePlayerData } from "../hooks";
import { MatchList } from "./components/MatchList";
import { PlayerInfo } from "./components/PlayerInfo";

function FootballView() {
  const {
    player,
    loading: playerLoading,
    error: playerError,
  } = usePlayerData();
  const {
    matches,
    loading: matchesLoading,
    error: matchesError,
  } = useMatchData();

  if (playerLoading || matchesLoading) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (playerError || matchesError) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4">
        <div className="text-red-500">Error loading data</div>
      </div>
    );
  }

  if (!player) {
    return null;
  }

  return (
    <div
      className="min-h-screen transition-colors duration-200
    dark:bg-dark-main bg-light-main
    dark:text-white text-navy-900"
    >
      <Header />
      <div className="px-0 md:px-4 pb-6">
        <div className="max-w-7xl mx-auto">
          <PlayerInfo player={player} />
          <MatchList matches={matches} />
        </div>
      </div>
    </div>
  );
}

export default FootballView;
