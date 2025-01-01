import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  LabelList,
} from "recharts";
import { Player } from "../../types/player";
import { formatNumber } from "src/utils/numberUtils";
// import { CustomizedLabel } from "../atoms/CustomizedLabel";

export type CustomAreaChartProps = {
  data: { time: string; values: number; imageSrc: string; imageAlt: string }[];
  player: Player;
};

export const CustomAreaChart: React.FC<CustomAreaChartProps> = ({ data, player }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 30, right: 0, left: 30, bottom: 10 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8} />
            <stop offset="50%" stopColor="#61B8FF" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#61B8FF" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="rgba(255, 255, 255, 0.1)"
        />
        <ReferenceLine
          y={formatNumber(player.proposedMarketValueRaw.value)}
          stroke="#F6B500"
          strokeDasharray="3 3"
        />
        <XAxis
          dataKey="time"
          axisLine={true}
          tickLine={false}
          tick={{ fill: "#FFFFFF" }}
          tickFormatter={(value) => `‘${value}`}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          orientation="right"
          tick={{ fill: "#FFFFFF" }}
          domain={[0, 70]}
          ticks={[22, 44, 66]}
          tickFormatter={(value) => `${value}M`}
        />
        <Tooltip contentStyle={{ color: "black" }} />
        <Area
          type="linear"
          dataKey="values"
          stroke="#2187E5"
          fill="url(#colorUv)"
          strokeWidth={2}
          dot={{
            stroke: "#2187E5",
            strokeWidth: 2,
            r: 4,
            fill: "#FFFFFF",
            fillOpacity: 1,
          }}
        >
          <LabelList
            dataKey="imageSrc"
            offset={5}
            position="centerTop"
            content={(entry) => (
              <image
                x={entry.x as number - 10}
                y={entry.y as number - 35}
                width={entry.width as number}
                height={entry.height as number}
                href={entry.value as string}
              />
            )}
          />
        </Area>
      </AreaChart>
    </ResponsiveContainer>
  );
}
