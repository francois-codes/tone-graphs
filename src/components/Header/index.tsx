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
    textContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "flex-end",
    },
    text: theme.typography.h0.extend({ marginHorizontal: theme.spacings.m }),
    beta: theme.typography.p.extend({ fontStyle: "italic", fontWeight: "800" }),
  }));

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={{ uri: logo }} style={styles.logo as ImageStyle} resizeMode="contain" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Tone Graphs</Text>
        <Text style={styles.beta}>beta</Text>
      </View>
    </View>
  );
}
