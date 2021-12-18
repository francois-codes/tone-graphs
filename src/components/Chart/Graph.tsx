import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Label } from "recharts";
import { xAxisProps, yAxisProps, lineChartProps, lineProps, DataKeys } from "./settings";

type Props = {
  graphData: Pedal[];
  width: number;
  height: number;
};

const styles = {
  tooltip: { fontFamily: "open sans", fontSize: 12, fontWeight: "600" },
  label: { fontFamily: "open sans", fontSize: 14, fontWeight: "600" },
};

function formatFrequency(frequency) {
  if (frequency < 1000) {
    return `${Math.round(frequency)} Hz`;
  }

  return `${Math.round(frequency / 100) / 10} kHz`;
}

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
        formatter={(value, name) => [Math.round(value * 100) / 100, name]}
        labelFormatter={(value) => `Frequency: ${formatFrequency(value)}`}
        labelStyle={styles.tooltip}
        itemStyle={styles.tooltip}
      />

      <XAxis {...xAxisProps}>
        <Label position="bottom" value="frequency" style={styles.label} />
      </XAxis>
      <YAxis {...yAxisProps}>
        <Label position="left" value="dB" offset={-20} style={styles.label} />
      </YAxis>
    </LineChart>
  );
}
