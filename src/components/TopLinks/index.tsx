import React from "react";
import { View, Text } from "react-native";
import { createStyles } from "../Theme";
import { A } from "../A";

const styles = createStyles(({ theme }) => ({
  container: { width: "100%", padding: theme.spacings.m, justifyContent: "flex-start" },
  paragraph: theme.typography.p.extend({ marginBottom: theme.spacings.s }),
}));

export function TopLinks() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        <A href="#credits">What am I seeing here ?</A>
      </Text>
    </View>
  );
}
