import React, { ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import { useCreateStyles } from "../Theme";

type Props = { children: ReactNode; style?: ViewStyle };

export function PedalContainer({ children, style = {} }: Props) {
  const styles = useCreateStyles(({ theme, responsiveValue }) => ({
    container: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderColor: theme.colors.dark,
      borderWidth: 1,
      backgroundColor: theme.colors.white,
      borderRadius: 10,
      padding: theme.spacings.m,
      marginVertical: theme.spacings.m,
      height: responsiveValue({ mobile: 70, desktop: 91 }),
      maxHeight: responsiveValue({ mobile: 70, desktop: 91 }),
      overflow: "hidden",
    },
  }));

  return <View style={[styles.container, style]}>{children}</View>;
}
