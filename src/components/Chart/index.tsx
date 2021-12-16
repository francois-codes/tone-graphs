import React, { useCallback, useMemo } from "react";
import { View } from "react-native";
import * as R from "ramda";

import { useRange } from "src/hooks/useRange";
import { useChartDimensions } from "src/hooks/useChartDimensions";
import { PropSelector } from "src/components/PropSelector";
import { createStyles } from "../Theme";
import { getGraphData, getPropOrFirst } from "./data";
import { useVisiblePedals } from "src/hooks/useVisiblePedals";
import { Graph } from "./Graph";

const styles = createStyles(({ theme }) => ({
  container: {
    flexDirection: "column",
  },
  chartContainer: {
    marginLeft: -15,
    marginTop: theme.spacings.l,
  },
}));

export function Chart() {
  const [toneRange, setToneRange] = useRange("tone");
  const [gainRange, setGainRange] = useRange("gain");
  const visiblePedals = useVisiblePedals();
  const toneValue = `${toneRange}%`;
  const gainValue = `${gainRange}%`;

  const select = useCallback(R.compose(getPropOrFirst(gainValue), getPropOrFirst(toneValue)), [gainValue, toneValue]);

  const graphData = useMemo(() => getGraphData(select, visiblePedals), [select, visiblePedals.length]);

  const { width, height } = useChartDimensions();

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <Graph width={width} height={height} graphData={graphData} />
      </View>
      <PropSelector label="Tone" value={toneRange} setValue={setToneRange} />
      <PropSelector label="Gain" value={gainRange} setValue={setGainRange} />
    </View>
  );
}
