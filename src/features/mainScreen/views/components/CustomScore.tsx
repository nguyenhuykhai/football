import { MatchEvent } from "../../types/match";

export default function CustomScore({
  match,
  className,
}: {
  match: MatchEvent;
  className?: string;
}) {
  const winningScoreStyle = "bg-win-score";
  const losingScoreStyle =
    "bg-gradient-to-r from-[#00289F] via-[#001F7B] to-[#091557]";
  const equalScoreStyle = "bg-sky-700";

  let homeScoreStyle: string;
  let awayScoreStyle: string;

  // Determine styles based on scores
  if (match.homeScore.display === match.awayScore.display) {
    homeScoreStyle = equalScoreStyle;
    awayScoreStyle = equalScoreStyle;
  } else {
    homeScoreStyle =
      match.homeScore.display >= match.awayScore.display
        ? winningScoreStyle
        : losingScoreStyle;
    awayScoreStyle =
      match.awayScore.display >= match.homeScore.display
        ? winningScoreStyle
        : losingScoreStyle;
  }

  return (
    <div
      className={`flex items-center space-x-2 md:space-x-3 ${className || ""}`}
    >
      <div className="flex flex-col space-y-2">
        <span
          className={`w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-white rounded text-sm font-semibold md:text-base ${homeScoreStyle}`}
        >
          {match.homeScore.display}
        </span>
        <span
          className={`w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-white rounded text-sm font-semibold md:text-base ${awayScoreStyle}`}
        >
          {match.awayScore.display}
        </span>
      </div>

      {/* Rating indicator */}
      <span className="px-1.5 py-0.5 md:px-2 md:py-1 text-[10px] md:text-xs text-white font-semibold bg-orange-500 rounded">
        8.2
      </span>
    </div>
  );
}
