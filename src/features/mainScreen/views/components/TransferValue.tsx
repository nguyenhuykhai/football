import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
export const TransferValue = () => {
  const data = [
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
    <div className="w-68 h-52">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
          <ReferenceLine y={22} stroke="#F6B500" strokeDasharray="3 3" />
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
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
