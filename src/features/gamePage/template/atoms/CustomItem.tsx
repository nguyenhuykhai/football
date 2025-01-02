import React from "react";
import { Player } from "../../types/Player";

interface CustomItemProps {
  player: Player;
  index: number;
  onViewSkills: (player: Player) => void;
}

export const CustomItem: React.FC<CustomItemProps> = ({ player, index, onViewSkills }) => {
  const getTopStyles = (index: number) => {
    if (index === 0 && player.score > 0) return "bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800";
    if (index === 1 && player.score > 0) return "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800";
    if (index === 2 && player.score > 0) return "bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800";
    return "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-700";
  };

  const getTopBadge = (index: number) => {
    if (index === 0) return "text-yellow-600 dark:text-yellow-400";
    if (index === 1) return "text-blue-600 dark:text-blue-400";
    if (index === 2) return "text-green-600 dark:text-green-400";
    return "";
  };

  return (
    <li
      className={`p-4 border rounded-lg flex items-center justify-between transition-all hover:shadow-md ${getTopStyles(index)}`}
    >
      <div className="flex items-center gap-2">
        <span className="font-medium">{index + 1}.</span>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{player.name}</span>
            {player.isGhost && (
              <span className="px-2 py-1 text-xs font-semibold bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 rounded-full">
                Ghost
              </span>
            )}
            {player.score > 0 && [0, 1, 2].includes(index) && (
              <span className={`text-xs font-bold ${getTopBadge(index)}`}>
                Top {index + 1}
              </span>
            )}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            #{player.jerseyNumber}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => onViewSkills(player)}
          className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
        >
          Xem kỹ năng
        </button>
        <div className="text-right min-w-[80px]">
          <div className="font-bold">{player.score} điểm</div>
        </div>
      </div>
    </li>
  );
};
