import React from "react";
import { View } from "react-native";
import { useSetPedalState } from "src/atoms/pedals";
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
  const { setPedalVisible, setPedalSelected } = useSetPedalState();

  const buttons = [
    {
      icon: pedal.visible ? "visibility-off" : "visibility",
      onPress: () => setPedalVisible(pedal, !pedal.visible),
    },
    { icon: "delete", onPress: () => setPedalSelected(pedal, !pedal.selected) },
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.color, { backgroundColor: pedal.color }]} />
      {buttons.map((button, index) => (
        <Button key={index} {...button} />
      ))}
    </View>
  );
}
