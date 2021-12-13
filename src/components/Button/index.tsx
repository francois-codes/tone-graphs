/* eslint-disable  @typescript-eslint/ban-ts-comment */
import React from "react";

import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { createStyles } from "../Theme";

type Props = {
  icon: string;
  onPress: () => void;
};

const styles = createStyles(({ theme }) => ({
  container: {
    marginHorizontal: theme.spacings.m,
  },
}));

export function Button({ icon, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {/* @ts-ignore */}
      <MaterialIcons name={icon} size={24} color="#343536" />
    </TouchableOpacity>
  );
}
