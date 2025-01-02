import React, { useState } from "react";
import { Player } from "../../types/Player";
import { PlayerSkillsModal } from "../atoms/PlayerSkillsModal";
import { CustomItem } from "../atoms/CustomItem";

export const ListPlayers: React.FC<{ players: Player[] }> = ({ players }) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-4">Danh sách cầu thủ</h2>
      <div className="overflow-y-auto max-h-[600px] pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        <ul className="space-y-2">
          {players.map((player, index) => (
            <CustomItem
              key={player.id}
              player={player}
              index={index}
              onViewSkills={setSelectedPlayer}
            />
          ))}
        </ul>
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
