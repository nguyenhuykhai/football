import React from "react";

export interface InfoCardProps {
  title: string;
  data: string | null;
  imageSrc: string;
  imageAlt?: string;
  option?: string | null;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  data,
  imageSrc,
  imageAlt,
  option,
  className,
}) => {
  return (
    <div
      className={`h-20 ${className || ""} border-gray-200 dark:border-dark-time-tennis px-4 py-3`}
    >
      <h4 className="mb-[6px] text-xs text-light-secondary">{title}</h4>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6">
          <img
            loading="lazy"
            src={imageSrc}
            alt={imageAlt || title}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex flex-col items-start">
          <b className="text-sm font-semibold text-navy-900 dark:text-white">
            {data || "--"}
          </b>
          {option ? (
            <p className="text-xs text-light-secondary">{option}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
