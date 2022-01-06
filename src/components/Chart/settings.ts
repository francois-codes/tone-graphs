import { XAxisProps, YAxisProps } from "recharts";
import { CurveType } from "recharts/types/shape/Curve";

export enum DataKeys {
  db = "db",
  frequency = "frequency",
}

const frequencyRange = [40, 21_000];
const dbRange = [-25, 5];

const style = { fontFamily: "Open sans", fontSize: 12 };

export const xAxisProps: XAxisProps = {
  type: "number",
  dataKey: DataKeys.frequency,
  ticks: [50, 200, 800, 2_000, 5_000, 10_000, 20_000],
  domain: frequencyRange,
  scale: "log",
  name: "Frequency (Hz)",
  allowDuplicatedCategory: false,
  style,
};

export const yAxisProps: YAxisProps = {
  type: "number",
  dataKey: DataKeys.db,
  ticks: [-25, -20, -15, -10, -5, 0, 5],
  domain: dbRange,
  name: "Decibels (dB)",
  style,
  interval: "preserveStartEnd",
  allowDataOverflow: true,
};

export const lineChartProps = {
  margin: { top: 20, right: 20, bottom: 20, left: 20 },
};

export const lineProps = {
  dot: false,
  type: "monotone" as CurveType,
};
