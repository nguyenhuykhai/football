import classNames from "classnames";

export type CustomTransferItemProps = {
  index: number;
};

export const CustomTransferItem: React.FC<CustomTransferItemProps> = ({
  index,
}) => {
  return (
    <div
      className={classNames(
        "flex items-center gap-4 py-3 border-b border-gray-200 dark:border-dark-time-tennis",
        {
          "border-b-0": index === 4,
        }
      )}
    >
      <span className="w-10 h-10">
        <img
          loading="lazy"
          src="https://img.uniscore.com/football/team/j1l4rjnhpdxm7vx/image/medium"
          alt="Chelsea"
          className="h-full w-full object-contain"
        />
      </span>
      <div className="flex-1 space-y-1">
        <span className="block font-medium leading-5 text-black dark:text-white">
          Chelsea
        </span>
        <span className="block text-xs text-label font-medium leading-4">
          30 Jun 2020
        </span>
      </div>
      <span className="flex flex-col text-right text-xs font-medium leading-5">
        <span className="text-dark-green">-</span>
        <span className="text-dark-green">End of loan</span>
      </span>
    </div>
  );
}
