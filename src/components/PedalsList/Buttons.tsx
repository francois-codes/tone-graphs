import React from "react";
import { View } from "react-native";
import { isPedalVisible, useIsPedalVisible, useSetVisiblePedals } from "src/hooks/useVisiblePedals";
import { Button } from "../Button";
import { createStyles } from "../Theme";

const styles = createStyles(({ theme }) => ({
  container: {
    flexDirection: "row",
  },
  color: {
    width: 18,
    height: 18,
    borderRadius: 9,
    overflow: "hidden",
    marginHorizontal: theme.spacings.m,
    marginVertical: theme.spacings.xs,
  },
}));

export function Buttons({ pedal }: { pedal: Pedal }) {
  const isVisible = useIsPedalVisible(pedal);
  const setPedalVisible = useSetVisiblePedals();

  const buttons = [
    {
      icon: isVisible ? "visibility-off" : "visibility",
      onPress: () => setPedalVisible(pedal, !isVisible),
    },
    // { icon: "delete", onPress: () => console.log("delete") },
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.color, { backgroundColor: pedal.color }]} />
      {buttons.map((button, index) => (
        <Button key={index} {...button} disabled={pedal.datapoints.length === 0} />
      ))}
    </View>
  );
}
