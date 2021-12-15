import React, { useEffect } from "react";
import * as R from "ramda";
import { View } from "react-native";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { xAxisProps, yAxisProps, DataKeys, lineChartProps, lineProps } from "./settings";

import { useToneRange } from "src/hooks/useToneRange";
import { useChartDimensions } from "src/hooks/useChartDimensions";
import { ToneSelector } from "src/components/ToneSelector";
import { createStyles } from "../Theme";
import { useSetVisiblePedals, useVisiblePedals } from "src/hooks/useVisiblePedals";

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
  const [toneRange] = useToneRange();
  const visiblePedals = useVisiblePedals();

  const toneValue = `${toneRange}%`;

  const formattedData = R.compose(
    R.apply(R.concat),
    R.map(
      R.compose(
        R.prop(toneValue),
        (pedal) => R.groupBy(R.prop("tone"), pedal.datapoints || []),
        (pedal) =>
          R.evolve(
            {
              datapoints: R.map(
                R.compose(
                  (datapoint) => R.assoc(pedal.id + "_db", datapoint.db, datapoint),
                  (datapoint) => R.assoc("id", pedal.id, datapoint),
                ),
              ),
            },
            pedal,
          ),
      ),
    ),
  )(pedals);

  const setPedalVisible = useSetVisiblePedals();

  useEffect(() => {
    pedals.forEach((pedal) => {
      setPedalVisible(pedal, true);
    });
  }, []);

  const { width, height } = useChartDimensions();

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <LineChart height={height} width={width} data={formattedData} {...lineChartProps}>
          {visiblePedals.map((pedal, index) => (
            <Line
              key={index}
              dataKey={pedal.id + "_" + DataKeys.db}
              strokeWidth={3}
              stroke={pedal.color}
              {...lineProps}
            />
          ))}

          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis {...xAxisProps} />
          <YAxis {...yAxisProps} />
        </LineChart>
      </View>
      <ToneSelector />
    </View>
  );
}
