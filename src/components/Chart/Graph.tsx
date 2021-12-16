import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { xAxisProps, yAxisProps, lineChartProps, lineProps, DataKeys } from "./settings";

type Props = {
  graphData: Pedal[];
  width: number;
  height: number;
};

export function Graph(props: Props) {
  const { graphData, width, height } = props;

  return (
    <LineChart height={height} width={width} {...lineChartProps}>
      {graphData.map((pedal) => (
        <Line
          key={pedal.id}
          name={pedal.name}
          dataKey={DataKeys.db}
          data={pedal.datapoints}
          strokeWidth={3}
          stroke={pedal.color}
          {...lineProps}
        />
      ))}

      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Tooltip
        formatter={(value, name) => {
          return [Math.round(value * 100) / 100, name];
        }}
        label={(value, name) => {
          [Math.round(value * 100) / 100, name];
        }}
        labelStyle={{ fontFamily: "open sans", fontSize: 10 }}
        itemStyle={{ fontFamily: "open sans", fontSize: 10 }}
      />
      <XAxis {...xAxisProps} />
      <YAxis {...yAxisProps} />
    </LineChart>
  );
}
