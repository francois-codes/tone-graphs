import React from "react";
import * as R from "ramda";
import { View } from "react-native";
import { Pedal } from "./Pedal";

import { useCreateStyles } from "../Theme";

export function PedalsList({ pedals }: { pedals: Pedal[] }) {
  const styles = useCreateStyles(({ theme }) => ({
    container: {
      flex: 1,
      flexDirection: "column",
      alignSelf: "stretch",
      justifyContent: "flex-start",
      padding: theme.spacings.m,
    },
  }));

  const pedalsList = R.reverse(R.sortBy(R.compose(R.length, R.prop("datapoints")), pedals));

  return (
    <View style={styles.container}>
      {pedalsList.map((pedal, index) => (
        <Pedal key={index} pedal={pedal} />
      ))}
    </View>
  );
}
