import React from "react";
import { Slider, Text } from "react-native-elements";
import { View } from "react-native";
import { useCreateStyles } from "../Theme";
import { useToneRange } from "src/hooks/useToneRange";
import { useChartDimensions } from "src/hooks/useChartDimensions";

export function ToneSelector() {
  const [toneRange, setToneRange] = useToneRange();

  const { width } = useChartDimensions();

  const styles = useCreateStyles(({ theme }) => ({
    container: {
      width,
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 55,
    },
    text: theme.typography.h2.extend({
      paddingRight: theme.spacings.l,
    }),
    slider: { width: width - 200 },
    trackStyle: { height: 3, width: "100%" },
    thumbStyle: { height: 15, width: 15, backgroundColor: theme.colors.dark },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.text}>tone: {toneRange}</Text>
      <Slider
        style={styles.slider}
        value={toneRange}
        step={50}
        minimumValue={0}
        maximumValue={100}
        onValueChange={setToneRange}
        trackStyle={styles.trackStyle}
        thumbStyle={styles.thumbStyle}
      />
    </View>
  );
}
