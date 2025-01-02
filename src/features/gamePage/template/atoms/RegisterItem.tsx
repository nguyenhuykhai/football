import { Player } from "../../types/Player";

interface RegisterItemProps {
    player: Player;
    index: number;
    onViewSkills: (player: Player) => void;
  }
  
  export const RegisterItem: React.FC<RegisterItemProps> = ({ player, index, onViewSkills }) => {
    return (
      <div className="p-4 border rounded-lg bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 
        flex justify-between items-center hover:shadow-md transition-all">
        <div className="flex items-center gap-3">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {index + 1}.
          </span>
          <div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {player.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              #{player.jerseyNumber}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewSkills(player)}
            className="px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg 
              transition-colors flex items-center gap-2"
          >
            Xem kỹ năng
          </button>
        </div>
      </div>
    );
  };