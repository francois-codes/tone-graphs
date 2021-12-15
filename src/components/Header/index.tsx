import React from "react";
import { View, Text, Image, ImageStyle } from "react-native";
import { logo } from "src/assets";
import { useCreateStyles } from "../Theme";

export function Header() {
  const styles = useCreateStyles(({ theme, responsiveValue }) => ({
    container: {
      height: responsiveValue({ mobile: 100, desktop: 150 }),
      width: "100%",
      paddingVertical: theme.spacings.m,
      paddingHorizontal: theme.spacings.m,
      flexDirection: "row",
      alignItems: "flex-end",
    },
    logo: {
      width: responsiveValue<number>({ mobile: 30, desktop: 44 }),
      height: responsiveValue<number>({ mobile: 45, desktop: 62 }),
    },
    logoContainer: {
      marginBottom: responsiveValue<number>({ mobile: 6, desktop: 12 }),
    },
    text: theme.typography.h0.extend({ marginHorizontal: theme.spacings.m }),
  }));

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={{ uri: logo }} style={styles.logo as ImageStyle} resizeMode="contain" />
      </View>
      <Text style={styles.text}>Tone Graphs</Text>
    </View>
  );
}
