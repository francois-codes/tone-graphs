import React from "react";
import { View, Text } from "react-native";
import { createStyles } from "../Theme";

const styles = createStyles(({ theme }) => ({
  container: {
    width: "100%",
    height: 100,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: theme.spacings.l,
    backgroundColor: theme.colors.darkerLight,
    borderTopWidth: 1,
    borderColor: theme.colors.lighterDark,
  },
  text: theme.typography.small.extend({ color: theme.colors.lighterDark }),
}));

export function Footer() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>&copy; 2021 - Pedal Tone Graphs</Text>
    </View>
  );
}
