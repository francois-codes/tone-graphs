import React from "react";
import { View, Text, Image, ImageStyle } from "react-native";
import { useCreateStyles } from "../Theme";
import { Buttons } from "./Buttons";
import { PedalContainer } from "./PedalContainer";

export function Pedal({ pedal }: { pedal: Pedal }) {
  const styles = useCreateStyles(({ theme, responsiveValue }) => ({
    image: {
      width: responsiveValue({ desktop: 60, tablet: 40, mobile: 30 }),
      height: responsiveValue({ desktop: 60, tablet: 40, mobile: 30 }),
    },
    titleContainer: { flexGrow: 1, flexDirection: "column", flex: 1, paddingHorizontal: theme.spacings.m },
    title: theme.typography.h1.extend({ fontWeight: "800" }),
    brand: theme.typography.h2.extend({ fontWeight: "600" }),
  }));

  return (
    <PedalContainer>
      <Image source={{ uri: pedal.image }} style={styles.image as ImageStyle} resizeMode="contain" />
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {pedal.name}
        </Text>
        <Text style={styles.brand} numberOfLines={1}>
          {pedal.brand}
        </Text>
      </View>
      <Buttons pedal={pedal} />
    </PedalContainer>
  );
}
