import React from "react";
import * as R from "ramda";
import { View } from "react-native";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { xAxisProps, yAxisProps, DataKeys, lineChartProps, lineProps } from "./settings";

import { useToneRange } from "src/hooks/useToneRange";
import { useChartDimensions } from "src/hooks/useChartDimensions";
import { ToneSelector } from "src/components/ToneSelector";
import { createStyles } from "../Theme";

type Props = {
  data: ToneGraph;
};

const styles = createStyles(() => ({
  container: {
    flexDirection: "column",
  },
  chartContainer: {
    marginLeft: -15,
  },
}));

export function Chart({ data }: Props) {
  const [toneRange] = useToneRange();

  const toneValue = `${toneRange}%`;
  const _data = R.groupBy(R.prop("tone"), data)[toneValue];

  const { width, height } = useChartDimensions();

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <LineChart height={height} width={width} data={_data} {...lineChartProps}>
          <Line dataKey={DataKeys.db} stroke="#8884d8" {...lineProps} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis {...xAxisProps} />
          <YAxis {...yAxisProps} />
        </LineChart>
      </View>
      <ToneSelector />
    </View>
  );
}
