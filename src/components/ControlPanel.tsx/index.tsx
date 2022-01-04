import React from "react";
import { View } from "react-native";

import { useRange } from "src/hooks/useRange";

import { PropSelector } from "src/components/PropSelector";
import { createStyles } from "../Theme";

const styles = createStyles(({ theme }) => ({
  controlPanel: {
    flexDirection: "row",
    flexGrow: 0,
    marginVertical: theme.spacings.m,
    paddingVertical: theme.spacings.s,
    borderWidth: 1,
    borderColor: theme.colors.lighterDark,
    borderRadius: 10,
    backgroundColor: theme.colors.darkerLight,
  },
}));

export function ControlPanel() {
  const [toneRange, setToneRange] = useRange("tone");
  const [gainRange, setGainRange] = useRange("gain");

  return (
    <View style={styles.controlPanel}>
      <PropSelector label="Tone" value={toneRange} setValue={setToneRange} />
      <PropSelector label="Gain" value={gainRange} setValue={setGainRange} />
    </View>
  );
}
