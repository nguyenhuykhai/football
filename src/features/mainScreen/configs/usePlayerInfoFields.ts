import { InfoCardProps } from 'src/common/components/InfoCard';
import { formatAge, formatDate } from 'src/utils/dateUtils';
import { Player } from '../types/player';


const usePlayerInfoFields = (player: Player) => {
  const config: InfoCardProps[] = [
    {
      title: 'Nationality',
      data: player?.nationality.name ?? null,
      imageSrc: '/assets/images/Spain.svg',
      imageAlt: player?.nationality.name,
      className: "border-b border-t lg:border-l lg:border-t-0"
    },
    {
      title: 'Date of birth',
      data: player?.dateOfBirthTimestamp ? formatDate(player?.dateOfBirthTimestamp) : null,
      imageSrc: '/assets/images/tuổi.svg',
      imageAlt: 'Date of birth',
      option: player?.dateOfBirthTimestamp ? formatAge(player?.dateOfBirthTimestamp) : null,
      className: "border-b border-t border-l lg:border-t-0"
    },
    {
      title: 'Height',
      data: player?.height ? `${player?.height} cm` : null,
      imageSrc: '/assets/images/Height.svg',
      imageAlt: `${player?.height} cm`,
      className: "border-b lg:border-l"
    },
    {
      title: 'Preferred foot',
      data: player?.preferredFoot ?? null,
      imageSrc: '/assets/images/Foot.svg',
      imageAlt: 'Preferred foot',
      className: "border-b border-l"
    },
    {
      title: 'Jersey number',
      data: null,
      imageSrc: '/assets/images/Jersey.svg',
      imageAlt: 'Jersey number',
      className: "lg:border-l"
    },
    {
      title: 'Position',
      data: null,
      imageSrc: '/assets/images/Football.svg',
      imageAlt: `Position ${player?.position}`,
      className: "border-l"
    }
  ];

  return config;
};

export default usePlayerInfoFields;
