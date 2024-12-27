import React from 'react';
import { User } from 'lucide-react';
import { Player } from '../types/player';
import { formatDate } from '../utils/dateUtils';

interface PlayerInfoProps {
  player: Player;
}

export const PlayerInfo: React.FC<PlayerInfoProps> = ({ player }) => {
  return (
    <div className="bg-navy-900 rounded-lg p-4 md:p-6 shadow-lg">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
        <div className="flex-shrink-0 w-full md:w-auto flex justify-center">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-navy-800 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 md:w-14 md:h-14 text-white" />
          </div>
        </div>
        
        <div className="flex-1 w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4">
            <h1 className="text-xl md:text-2xl font-bold text-white">{player.name}</h1>
            <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
              {player.position === 'M' ? 'Midfielder' : player.position}
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div>
                <span className="block text-gray-400">Team</span>
                <span className="text-white">{player.team.name}</span>
              </div>
              <div>
                <span className="block text-gray-400">Nationality</span>
                <span className="text-white">{player.nationality.name}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <span className="block text-gray-400">Market Value</span>
                <span className="text-white">
                  {player.proposedMarketValueRaw.currency}
                  {player.proposedMarketValue.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="block text-gray-400">Contract Until</span>
                <span className="text-white">{formatDate(player.contractUntilTimestamp)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};