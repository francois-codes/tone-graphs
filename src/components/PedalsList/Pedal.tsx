import React from "react";
import { View, Text, Image, ImageStyle } from "react-native";
import { useCreateStyles } from "../Theme";

export function Pedal({ pedal }: { pedal: Pedal }) {
  const styles = useCreateStyles(({ theme, responsiveValue }) => ({
    container: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderColor: theme.colors.dark,
      borderWidth: 1,
      backgroundColor: theme.colors.white,
      borderRadius: 10,
      padding: theme.spacings.m,
      marginVertical: theme.spacings.m,
    },
    image: {
      width: responsiveValue({ desktop: 60, tablet: 40, mobile: 30 }),
      height: responsiveValue({ desktop: 60, tablet: 40, mobile: 30 }),
    },
    titleContainer: { flexGrow: 1, flexDirection: "column", flex: 1, paddingHorizontal: theme.spacings.m },
    title: theme.typography.h1.extend({ fontWeight: "800" }),
    brand: theme.typography.h2.extend({ fontWeight: "600" }),
    buttonsContainer: {
      borderColor: "red",
      borderWidth: 1,
    },
  }));

  return (
    <View style={styles.container}>
      <Image source={{ uri: pedal.image }} style={styles.image as ImageStyle} resizeMode="contain" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{pedal.name}</Text>
        <Text style={styles.brand}>{pedal.brand}</Text>
      </View>
      <View style={styles.buttonsContainer}></View>
    </View>
  );
}
