import React, { useState } from "react";
import { Player } from "../../types/Player";
import { PlayerSkillsModal } from "../atoms/PlayerSkillsModal";
import { RegisterItem } from "../atoms/RegisterItem";

export const ListRegister: React.FC<{ players: Player[] }> = ({ players }) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Danh sách cầu thủ đăng ký
      </h2>
      <div className="overflow-y-auto max-h-[400px] pr-2 space-y-2 scrollbar-thin 
        scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        {players.map((player, index) => (
          <RegisterItem
            key={player.id}
            player={player}
            index={index}
            onViewSkills={setSelectedPlayer}
          />
        ))}
      </div>

      {selectedPlayer && (
        <PlayerSkillsModal
          player={selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </div>
  );
};
