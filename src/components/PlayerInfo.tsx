import React from 'react';
// import { User } from 'lucide-react';
import { Player } from '../types/player';
import { formatDate } from '../utils/dateUtils';

interface PlayerInfoProps {
  player: Player;
}

export const PlayerInfo: React.FC<PlayerInfoProps> = ({ player }) => {
  return (
    <div className="bg-navy-900 rounded-lg p-4 md:p-6 shadow-lg">
      <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
        <div className="flex-shrink-0 w-full md:w-auto flex justify-center">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center">
            <img
              className="object-cover rounded-full"
              src={`https://img.uniscore.com/football/player/${player.id}/image/medium`}
              alt="Rounded avatar"
            />
          </div>
        </div>

        <div className="flex-1 w-full">
          <div className="flex flex-col items-start gap-2 mb-4">
            <h1 className="mb-2 font-oswald text-2xl font-semibold capitalize text-white lg:text-black lg:dark:text-white">
              {player.name}
            </h1>
            <div>
              <div className="flex gap-3">
                <div className="w-10 h-10">
                  <img
                    loading="lazy"
                    src={`https://img.uniscore.com/football/team/${player.team.id}/image/medium`}
                    alt={player.team.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium capitalize text-white lg:text-black lg:dark:text-white">
                    Como
                  </h4>
                  <p className="text-xs text-light-secondary">
                    Contract until 2025-06-29
                  </p>
                </div>
              </div>
            </div>
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
                <span className="text-white">
                  {formatDate(player.contractUntilTimestamp)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};