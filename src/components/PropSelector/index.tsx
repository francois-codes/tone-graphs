import React from "react";
import { Slider, Text } from "react-native-elements";
import { View } from "react-native";
import { useCreateStyles } from "../Theme";
import { useChartDimensions } from "src/hooks/useChartDimensions";

type Props = {
  label: string;
  value: number;
  setValue: (value: number) => void;
  steps?: number;
};

const DEFAULT_STEPS = 25;

export function PropSelector(props: Props) {
  const { value, setValue, label, steps = DEFAULT_STEPS } = props;

  const { width } = useChartDimensions();

  const styles = useCreateStyles(({ theme, responsiveValue }) => ({
    container: {
      width,
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 55,
    },
    text: theme.typography.h2.extend({
      width: responsiveValue({ desktop: 130, mobile: 100 }),
      paddingRight: theme.spacings.l,
    }),
    slider: { width: width - 200 },
    trackStyle: { height: 3, width: "100%" },
    thumbStyle: { height: 15, width: 15, backgroundColor: theme.colors.dark },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {label}: {value}%
      </Text>
      <Slider
        style={styles.slider}
        value={value}
        step={steps}
        minimumValue={0}
        maximumValue={100}
        onValueChange={setValue}
        trackStyle={styles.trackStyle}
        thumbStyle={styles.thumbStyle}
      />
    </View>
  );
}
