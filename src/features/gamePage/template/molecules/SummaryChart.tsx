import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { GameLog } from "../../types/GameLog";

interface SummaryChartProps {
  logs: GameLog[];
  isOpen: boolean;
  onClose: () => void;
}

interface TechniqueStats {
  name: string;
  successful: number;
  failed: number;
  total: number;
}

const SummaryChart: React.FC<SummaryChartProps> = ({
  logs,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const techniqueStats = logs.reduce(
    (acc: { [key: string]: TechniqueStats }, log) => {
      const techniqueName = log.techniqueUsed.name;
      if (!acc[techniqueName]) {
        acc[techniqueName] = {
          name: techniqueName,
          successful: 0,
          failed: 0,
          total: 0,
        };
      }

      acc[techniqueName].total += 1;
      if (log.isSuccessful) {
        acc[techniqueName].successful += 1;
      } else {
        acc[techniqueName].failed += 1;
      }

      return acc;
    },
    {}
  );

  const chartData = Object.values(techniqueStats);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 w-full max-w-4xl m-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
            Thống kê kỹ thuật sử dụng
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Chart Container */}
        <div className="h-[200px] md:h-[200px] lg:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 10,
                left: 0,
                bottom: 5,
              }}
              barGap={0}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 8 }}
                interval={0}
                textAnchor="middle"
                height={60}
              />
              <YAxis tick={{ fontSize: 12 }} width={40} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: "20px",
                }}
              />
              <Bar
                dataKey="successful"
                name="Thành công"
                fill="#22c55e"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="failed"
                name="Thất bại"
                fill="#ef4444"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Grid */}
        <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 overflow-y-auto max-h-[200px] md:max-h-[250px]">
          {chartData.map((stat: TechniqueStats) => (
            <div
              key={stat.name}
              className="p-3 md:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                {stat.name}
              </h3>
              <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <p className="flex justify-between">
                  <span>Tổng số:</span>
                  <span className="font-medium">{stat.total}</span>
                </p>
                <p className="flex justify-between">
                  <span>Thành công:</span>
                  <span className="text-green-600">{stat.successful}</span>
                </p>
                <p className="flex justify-between">
                  <span>Thất bại:</span>
                  <span className="text-red-600">{stat.failed}</span>
                </p>
                <p className="flex justify-between border-t dark:border-gray-600 pt-1 mt-1">
                  <span>Tỷ lệ thành công:</span>
                  <span className="font-medium">
                    {((stat.successful / stat.total) * 100).toFixed(1)}%
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SummaryChart;
