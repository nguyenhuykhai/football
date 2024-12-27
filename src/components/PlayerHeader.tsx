import React from 'react';
import { User } from 'lucide-react';
import { Player } from '../types/player';

interface PlayerHeaderProps {
  player: Player;
}

export const PlayerHeader: React.FC<PlayerHeaderProps> = ({ player }) => {
  return (
    <div className="bg-navy-900 p-6 rounded-lg flex items-center gap-6">
      <div className="relative">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
          <User className="w-16 h-16 text-navy-900" />
        </div>
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-white">{player.name}</h1>
          <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
            {player.position}
          </span>
        </div>
        
        <div className="mt-2 text-gray-300">
          <span>{player.team}</span>
          <span className="mx-2">•</span>
          <span>Contract until {new Date(player.contract.until).getFullYear()}</span>
        </div>
      </div>
    </div>
  );
};