import { Player } from "../../types/Player";

interface PlayerSkillsModalProps {
    player: Player;
    onClose: () => void;
  }
  
  export const PlayerSkillsModal: React.FC<PlayerSkillsModalProps> = ({ player, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Kỹ năng của {player.name}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Điểm phòng thủ:</span>
              <span>{player.defenseScore}</span>
            </div>
            <div>
              <span className="font-medium">Kỹ thuật:</span>
              <ul className="mt-2 space-y-2">
                {player.techniques.map((technique, index) => (
                  <li key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <span>{technique.name}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Độ khó: {technique.difficulty}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };