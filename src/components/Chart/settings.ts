import { XAxisProps, YAxisProps } from "recharts";
import { CurveType } from "recharts/types/shape/Curve";

export enum DataKeys {
  db = "db",
  frequency = "frequency",
}

const frequencyRange = [40, 21_000];
const dbRange = [-35, 10];

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
  ticks: [-30, -20, -10, 0, 10],
  domain: dbRange,
  name: "Decibels (dB)",
  style,
  interval: "preserveStartEnd",
};

export const lineChartProps = {
  margin: { top: 20, right: 20, bottom: 20, left: 20 },
};

export const lineProps = {
  dot: false,
  type: "linear" as CurveType,
};
