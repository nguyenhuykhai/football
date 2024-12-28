import React from 'react';
import { Player } from '../types/player';

interface PlayerStatsProps {
  player: Player;
}

export const PlayerStats: React.FC<PlayerStatsProps> = ({ player }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <div className="bg-navy-800 p-4 rounded-lg">
        <div className="text-gray-400 text-sm">Nationality</div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xl text-white">{player.nationality}</span>
        </div>
      </div>
      
      <div className="bg-navy-800 p-4 rounded-lg">
        <div className="text-gray-400 text-sm">Height</div>
        <div className="text-xl text-white">{player.height} cm</div>
      </div>
      
      <div className="bg-navy-800 p-4 rounded-lg">
        <div className="text-gray-400 text-sm">Preferred Foot</div>
        <div className="text-xl text-white">{player.preferredFoot}</div>
      </div>
    </div>
  );
};