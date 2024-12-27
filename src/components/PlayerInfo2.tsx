import React from 'react';
import { Player } from '../types/player';
import { formatDate } from '../utils/dateUtils';

interface PlayerInfoProps {
  player: Player;
}

export const PlayerInfo2: React.FC<PlayerInfoProps> = ({ player }) => {
  const {
    id,
    name,
    team,
    position,
    height,
    preferredFoot,
    dateOfBirthTimestamp,
    contractUntilTimestamp,
    nationality,
  } = player;

  const age = dateOfBirthTimestamp ? new Date().getFullYear() - new Date(dateOfBirthTimestamp).getFullYear() : null;

  return (
    <div className="block lg:flex w-full flex-wrap overflow-hidden lg:rounded-lg">
      {/* Player Header Section */}
      <div className="relative flex w-full items-center lg:custom-bg-white lg:dark:bg-dark-card dark-away-score px-4 py-6 lg:w-1/2 lg:py-3">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-white w-[90px] h-[90px]">
            <img
              loading="lazy"
              src={`https://img.uniscore.com/football/player/${id}/image/medium`}
              alt={name}
              className="h-full w-full rounded-full object-contain"
            />
          </div>
          <div>
            <h3 className="mb-2 font-oswald text-2xl font-semibold capitalize text-white lg:text-black lg:dark:text-white">
              {name}
            </h3>
            <div className="flex gap-3">
              <a target="_parent" className="css-0" href={`/vi/football/competitor/${team.id}`}>
                <div className="w-10 h-10">
                  <img
                    loading="lazy"
                    src={`https://img.uniscore.com/football/team/${team.id}/image/medium`}
                    alt={team.name}
                    className="h-full w-full object-contain"
                  />
                </div>
              </a>
              <div>
                <h4 className="text-[13px] font-medium capitalize text-white lg:text-black lg:dark:text-white">
                  {team.name}
                </h4>
                <p className="text-[11px] text-light-secondary">
                  Contract until {formatDate(contractUntilTimestamp)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Player Details Grid */}
      <div className="grid w-full grid-cols-2 grid-rows-3 bg-white dark:bg-dark-card lg:w-1/2">
        {/* Nationality */}
        <div className="h-[68px] border-b border-line-default dark:border-dark-time-tennis px-4 py-3 lg:border-l">
          <h4 className="mb-[6px] text-[11px] text-light-secondary">Quốc tịch</h4>
          <div className="flex items-center gap-2">
            <div className="w-[24px] h-[24px]">
              <img
                loading="lazy"
                src={`https://img.uniscore.com/flags/${nationality.id}/image/medium`}
                alt={nationality.name}
                className="h-full w-full object-contain"
              />
            </div>
            <b className="text-[13px] font-semibold text-black dark:text-white">
              {nationality.name}
            </b>
          </div>
        </div>

        {/* Birth Date */}
        <div className="h-[68px] border-b border-l border-line-default dark:border-dark-time-tennis px-4 py-2">
          <h4 className="mb-[6px] text-[11px] text-light-secondary">Ngày sinh</h4>
          <div className="flex items-start gap-2">
            <div className="flex flex-col items-start">
              <b className="text-[13px] font-semibold text-black dark:text-white">
                {formatDate(dateOfBirthTimestamp)}
              </b>
              {age && <p className="text-[11px] text-light-secondary">{age} tuổi</p>}
            </div>
          </div>
        </div>

        {/* Height */}
        <div className="h-[68px] border-b border-line-default dark:border-dark-time-tennis px-4 py-3 lg:border-l">
          <h4 className="mb-[6px] text-[11px] text-light-secondary">Chiều cao</h4>
          <b className="text-[13px] font-semibold text-black dark:text-white">
            {height} cm
          </b>
        </div>

        {/* Preferred Foot */}
        <div className="h-[68px] border-b border-l border-line-default dark:border-dark-time-tennis px-4 py-3">
          <h4 className="mb-[6px] text-[11px] text-light-secondary">Thuận chân</h4>
          <b className="text-[13px] font-semibold text-black dark:text-white">
            {preferredFoot}
          </b>
        </div>

        {/* Jersey Number */}
        <div className="h-[68px] border-l border-line-default dark:border-dark-time-tennis px-4 py-3">
          <h4 className="mb-[6px] text-[11px] text-light-secondary">Số áo</h4>
          <b className="text-[13px] font-semibold text-black dark:text-white">
            {'--'}
          </b>
        </div>

        {/* Position */}
        <div className="h-[68px] border-l border-line-default dark:border-dark-time-tennis px-4 py-3">
          <h4 className="mb-[6px] text-[11px] text-light-secondary">Vị trí</h4>
          <b className="text-[13px] font-semibold text-black dark:text-white">
            {position}
          </b>
        </div>
      </div>
    </div>
  );
};