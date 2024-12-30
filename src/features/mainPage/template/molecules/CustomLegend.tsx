import classNames from "classnames";

export const CustomLegend:React.FC<{className?: string}> = ({className}) => {
  return (
    <div className={classNames("space-y-1 mt-2", className)}>
      <div className="flex items-center gap-2">
        <span>
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 20 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5"
          >
            <path
              stroke="#F5A585"
              strokeWidth="2"
              strokeDasharray="2 2"
              d="M0 1h20"
            ></path>
          </svg>
        </span>
        <div className="w-full flex flex-row justify-between space-x-2">
          <p className="text-xs leading-5 font-medium dark:text-label">
            Current player value
          </p>
          <p className="text-xs leading-5 font-medium dark:text-label">
            11.6M $
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span>
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 22 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5"
          >
            <path fill="#00A32C" d="M0 0h22v3H0z"></path>
          </svg>
        </span>
        <div className="w-full flex flex-row justify-between space-x-2">
          <p className="text-xs leading-5 font-medium dark:text-label">
            Transfer fee
          </p>
          <p className="text-xs leading-5 font-medium dark:text-label">
            (Highest) 66M $
          </p>
        </div>
      </div>
    </div>
  );
}
