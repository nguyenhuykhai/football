import { useEffect, useState } from "react";
import { CustomAreaChartData } from "../template/molecules";
import { TRANSFER_VALUE_DATA } from "src/data/mainScreen";

export function FootballViewModel() {
  const [data, setData] = useState<CustomAreaChartData[]>([]);
  useEffect(() => {
    setData(TRANSFER_VALUE_DATA);
  }, []);

  return { data };
}
