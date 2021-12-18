import React from "react";
import { View, Image, Text, ImageStyle, TouchableOpacity } from "react-native";
import { useSetPedalState } from "src/atoms/pedals";
import { useCreateStyles } from "../Theme";

export function PedalCard({ pedal }: { pedal: Pedal }) {
  const styles = useCreateStyles(({ theme, responsiveValue }) => ({
    container: {
      width: responsiveValue({ desktop: 200, mobile: 120 }),
      height: responsiveValue({ desktop: 200, mobile: 120 }),
      borderRadius: 10,
      borderColor: theme.colors.lighterDark,
      borderWidth: 1,
      margin: theme.spacings.m,
      alignItems: "center",
      justifyContent: "center",
    },
    selected: {
      borderColor: theme.colors.primary,
    },
    image: {
      width: responsiveValue({ desktop: 60, tablet: 40, mobile: 30 }),
      height: responsiveValue({ desktop: 60, tablet: 40, mobile: 30 }),
      margin: theme.spacings.l,
    },
    title: theme.typography.h2.extend({ fontWeight: "800" }),
    brand: theme.typography.p.extend({ fontWeight: "600" }),
  }));

  const { setPedalSelected } = useSetPedalState();

  return (
    <TouchableOpacity onPress={() => setPedalSelected(pedal, !pedal.selected)}>
      <View style={[styles.container, pedal.selected ? styles.selected : {}]}>
        <Image source={{ uri: pedal.image }} style={styles.image as ImageStyle} resizeMode="contain" />
        <Text style={styles.title}>{pedal.name}</Text>
        <Text style={styles.brand}>{pedal.brand}</Text>
      </View>
    </TouchableOpacity>
  );
}
