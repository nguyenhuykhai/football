import { Player } from "../../types/player";
import {
  CustomLegend,
  CustomTransferItem,
  CustomAreaChart,
  type CustomAreaChartProps,
} from "../molecules";

export const TransferValue: React.FC<{ player: Player }> = ({ player }) => {
  const data: CustomAreaChartProps["data"] = [
    { time: "10", values: 0 },
    { time: "13", values: 0 },
    { time: "14", values: 43 },
    { time: "15", values: 47 },
    { time: "16", values: 55 },
    { time: "17", values: 20 },
    { time: "18", values: 0 },
    { time: "19", values: 66 },
    { time: "20", values: 20 },
    { time: "22", values: 0 },
  ];

  return (
    <div className="w-full lg:flex flex-wrap mt-4 px-2 md:px-2.5 bg-white dark:bg-dark-card overflow-hidden rounded-lg">
      {/* Transfer Value */}
      <div className="lg:w-1/2 md:pr-0 lg:pr-4 md:border-r-0 lg:border-r border-gray-200 dark:border-dark-time-tennis">
        <h2 className="text-base md:text-lg font-semibold my-2 md:my-4 dark:text-white">
          TRANSFER VALUE
        </h2>
        <div className="w-full lg:w-3/4 h-60 rounded-md bg-gradient-to-b from-gray-800 to-blue-900">
          <CustomAreaChart data={data} player={player} />
        </div>
        <CustomLegend className="mb-2 md:mb-4" player={player} />
      </div>

      {/* Transfer History */}
      <div className="w-full lg:w-1/2 p-4">
        <ul>
          {Array.from({ length: 5 }).map((_, index) => (
            <CustomTransferItem key={index} index={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};