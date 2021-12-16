import React, { useCallback, useMemo } from "react";
import { View } from "react-native";
import * as R from "ramda";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { xAxisProps, yAxisProps, lineChartProps, lineProps, getDataKey } from "./settings";

import { useRange } from "src/hooks/useRange";
import { useChartDimensions } from "src/hooks/useChartDimensions";
import { PropSelector } from "src/components/PropSelector";
import { createStyles } from "../Theme";
import { getGraphData, getPropOrFirst } from "./data";
import { useVisiblePedals } from "src/hooks/useVisiblePedals";

type Props = {
  pedals: Pedal[];
};

const styles = createStyles(({ theme }) => ({
  container: {
    flexDirection: "column",
  },
  chartContainer: {
    marginLeft: -15,
    marginTop: theme.spacings.l,
  },
}));

export function Chart({ pedals }: Props) {
  const [toneRange, setToneRange] = useRange("tone");
  const [gainRange, setGainRange] = useRange("gain");
  const visiblePedals = useVisiblePedals();
  const toneValue = `${toneRange}%`;
  const gainValue = `${gainRange}%`;

  const select = useCallback(R.compose(getPropOrFirst(gainValue), getPropOrFirst(toneValue)), [gainValue, toneValue]);

  const graphData = useMemo(() => getGraphData(select, pedals), [select, pedals, visiblePedals.length]);

  const { width, height } = useChartDimensions();

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <LineChart height={height} width={width} data={graphData} {...lineChartProps}>
          {visiblePedals.map((pedal, index) => (
            <Line key={index} dataKey={getDataKey(pedal)} strokeWidth={3} stroke={pedal.color} {...lineProps} />
          ))}

          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis {...xAxisProps} />
          <YAxis {...yAxisProps} />
        </LineChart>
      </View>
      <PropSelector label="Tone" value={toneRange} setValue={setToneRange} />
      <PropSelector label="Gain" value={gainRange} setValue={setGainRange} />
    </View>
  );
}
