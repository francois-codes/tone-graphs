import React from "react";
import { View } from "react-native";
import { Button } from "../Button";
import { createStyles } from "../Theme";

const buttons = [
  { icon: "visibility-off", onPress: () => console.log("view") },
  { icon: "delete", onPress: () => console.log("delete") },
];

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

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function Buttons({ pedal }: { pedal: Pedal }) {
  return (
    <View style={styles.container}>
      <View style={[styles.color, { backgroundColor: getRandomColor() }]} />
      {buttons.map((button, index) => (
        <Button key={index} {...button} />
      ))}
    </View>
  );
}
