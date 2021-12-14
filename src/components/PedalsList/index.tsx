import React from "react";
import { View } from "react-native";
import { Pedal } from "./Pedal";

import { useCreateStyles } from "../Theme";

export function PedalsList({ pedals }: { pedals: Pedal[] }) {
  const styles = useCreateStyles(({ theme }) => ({
    container: {
      flex: 1,
      flexDirection: "column",
      alignSelf: "stretch",
      padding: theme.spacings.m,
    },
  }));

  return (
    <View style={styles.container}>
      {pedals.map((pedal, index) => (
        <Pedal key={index} pedal={pedal} />
      ))}
    </View>
  );
}
