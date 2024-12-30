import React from "react";
import { formatDate } from "src/utils/dateUtils";
import { Player } from "src/features/mainPage/types/player";
import InfoCard from "src/common/components/InfoCard";
import usePlayerInfoFields from "src/features/mainPage/configs/usePlayerInfoFields";

interface PlayerInfoProps {
  player: Player;
}

export const PlayerInfo: React.FC<PlayerInfoProps> = ({ player }) => {
  const config = usePlayerInfoFields(player);

  return (
    <div className="block lg:flex w-full flex-wrap overflow-hidden lg:rounded-lg">
      {/* Player Header Section */}
      <div className="relative flex w-full items-center bg-white dark:bg-dark-card px-4 py-6 lg:w-1/2 lg:py-3">
        <div className="absolute right-4 top-3">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
          >
            <path
              d="m10.19 5.345.117.236.26.038 4.897.711-3.544 3.455-.188.183.044.26.837 4.877-4.38-2.303L8 12.68l-.233.122-4.38 2.303.836-4.878.045-.259-.188-.183L.536 6.33l4.897-.711.26-.038.117-.236L8 .908l2.19 4.437Zm5.32.941ZM.472 6.34ZM8.028.85 8 .838l.028.014Zm-.056 0Z"
              className="stroke-light-secondary dark:stroke-dark-secondary"
            ></path>
          </svg>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-full bg-white w-[90px] h-[90px]">
            <img
              loading="lazy"
              src={`https://img.uniscore.com/football/player/${player.id}/image/medium`}
              alt={player.name}
              className="h-full w-full bg-light-main dark:bg-white rounded-full object-fill"
            />
          </div>
          <div>
            <h3 className="mb-2 font-oswald text-2xl font-semibold capitalize text-navy-900 dark:text-white">
              {player.name}
            </h3>
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
                <h4 className="text-sm font-medium capitalize text-navy-900 dark:text-white">
                  {player.team.name}
                </h4>
                <p className="text-[10px] md:text-xs text-light-secondary">
                  Contract until {formatDate(player.contractUntilTimestamp)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Player Details Grid */}
      <div className="grid w-full grid-cols-2 grid-rows-3 bg-white dark:bg-dark-card lg:w-1/2">
        {config.map((item, index) => (
          <InfoCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};
