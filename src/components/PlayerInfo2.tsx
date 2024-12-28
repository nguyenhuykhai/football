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

  const age = dateOfBirthTimestamp ? new Date().getFullYear() - new Date(dateOfBirthTimestamp * 1000).getFullYear() : null;

  return (
    <div className="block lg:flex w-full flex-wrap overflow-hidden lg:rounded-lg">
      {/* Player Header Section */}
      <div className="relative flex w-full items-center bg-dark-card px-4 py-6 lg:w-1/2 lg:py-3">
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
              stroke="white"
            ></path>
          </svg>
        </div>

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
              <a
                target="_parent"
                className="css-0"
                href={`/vi/football/competitor/${team.id}`}
              >
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
      <div className="grid w-full grid-cols-2 grid-rows-3 bg-dark-card lg:w-1/2">
        {/* Nationality */}
        <div className="h-[68px] border-b border-line-default dark:border-dark-time-tennis px-4 py-3 lg:border-l">
          <h4 className="mb-[6px] text-[11px] text-light-secondary">
            Nationality
          </h4>
          <div className="flex items-center gap-2">
            <div className="w-[24px] h-[24px]">
              <img
                loading="lazy"
                src='/assets/images/Spain.svg'
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
          <h4 className="mb-[6px] text-[11px] text-light-secondary">
            Date of birth
          </h4>
          <div className="flex items-start gap-2">
            <div className="flex flex-col items-start">
              <b className="text-[13px] font-semibold text-black dark:text-white">
                {formatDate(dateOfBirthTimestamp)}
              </b>
              {age ? (
                <p className="text-[11px] text-light-secondary">{age} years old</p>
              ) : (
                <p className="text-[11px] text-light-secondary">--</p>
              )}
            </div>
          </div>
        </div>

        {/* Height */}
        <div className="h-[68px] border-b border-line-default dark:border-dark-time-tennis px-4 py-3 lg:border-l">
          <h4 className="mb-[6px] text-[11px] text-light-secondary">
            Height
          </h4>
          <div className="flex items-center gap-2">
            <div className="w-[24px] h-[24px]">
              <img
                loading="lazy"
                src='/assets/images/Height.svg'
                alt={`${height} cm`}
                className="h-full w-full object-contain"
              />
            </div>
            <b className="text-[13px] font-semibold text-black dark:text-white">
              {height ? `${height} cm` : "--"}
            </b>
          </div>
        </div>

        {/* Preferred Foot */}
        <div className="h-[68px] border-b border-line-default dark:border-dark-time-tennis px-4 py-3 lg:border-l">
          <h4 className="mb-[6px] text-[11px] text-light-secondary">
            Preferred foot
          </h4>
          <div className="flex items-center gap-2">
            <div className="w-[24px] h-[24px]">
              <img
                loading="lazy"
                src='/assets/images/Foot.svg'
                alt={`${preferredFoot}`}
                className="h-full w-full object-contain"
              />
            </div>
            <b className="text-[13px] font-semibold text-black dark:text-white">
              {preferredFoot ? preferredFoot : "--"}
            </b>
          </div>
        </div>

        {/* Jersey Number */}
        <div className="h-[68px] border-b border-line-default dark:border-dark-time-tennis px-4 py-3 lg:border-l">
          <h4 className="mb-[6px] text-[11px] text-light-secondary">
            Jersey number
          </h4>
          <div className="flex items-center gap-2">
            <div className="w-[24px] h-[24px]">
              <img
                loading="lazy"
                src='/assets/images/Jersey.svg'
                alt="Jersey number"
                className="h-full w-full object-contain"
              />
            </div>
            <b className="text-[13px] font-semibold text-black dark:text-white">--</b>
          </div>
        </div>

        {/* Position */}
        <div className="h-[68px] border-b border-line-default dark:border-dark-time-tennis px-4 py-3 lg:border-l">
          <h4 className="mb-[6px] text-[11px] text-light-secondary">
            Position
          </h4>
          <div className="flex items-center gap-2">
            <div className="w-[24px] h-[24px]">
              <img
                loading="lazy"
                src='/assets/images/Football.svg'
                alt={`${position}`}
                className="h-full w-full object-contain"
              />
            </div>
            <b className="text-[13px] font-semibold text-black dark:text-white">
              {position ? position : "--"}
            </b>
          </div>
        </div>
      </div>
    </div>
  );
};