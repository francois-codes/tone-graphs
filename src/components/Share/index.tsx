/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useCreateStyles } from "../Theme";
import { TouchableOpacity, View, Text } from "react-native";
import { useShareLink } from "src/hooks/useShareLink";

async function copyToClipboard(text) {
  await window.navigator.clipboard.writeText(text);
  alert("Link copied to clipboard !!");
}

function goToInstagram() {
  window.open("https://instagram.com/tonegraphs", "_blank");
}

const messageBody = (url) =>
  `Check out this awesome this cool graph of pedal EQ responses at https://tonegraphs.com ! %0D%0A%0D%0A${url}`;

function shareByMail(text) {
  window.open("mailto:?subject=ToneGraphs&body=" + messageBody(text), "_blank");
}

export function Share() {
  const styles = useCreateStyles(({ theme, responsiveValue }) => ({
    container: {
      flexDirection: responsiveValue({
        desktop: "row",
        mobile: "column",
      }),
      alignItems: responsiveValue({
        desktop: "center",
        mobile: "flex-start",
      }),
      justifyContent: "flex-start",
      width: "100%",
    },
    touchable: {
      padding: theme.spacings.m,
      flexDirection: "row",
      alignItems: "center",
    },
    text: theme.typography.p.extend({ marginHorizontal: theme.spacings.m }),
  }));

  const shareLink = useShareLink();

  const shareButtons = [
    {
      icon: "link",
      onPress: () => copyToClipboard(shareLink),
      Component: MaterialIcons,
      text: "copy link to this page",
    },
    {
      icon: "instagram",
      onPress: () => goToInstagram(),
      Component: MaterialCommunityIcons,
      text: "see our instagram account",
    },
    {
      icon: "mail-outline",
      onPress: () => shareByMail(shareLink),
      Component: MaterialIcons,
      text: "share by email",
    },
    // { icon: "twitter", onPress: () => console.log("twitter"), Component: MaterialCommunityIcons },
    // { icon: "facebook", onPress: () => console.log("facebook"), Component: MaterialCommunityIcons },
  ];

  return (
    <View style={styles.container}>
      {shareButtons.map(({ Component, icon, onPress, text }, index) => (
        <TouchableOpacity key={index} style={styles.touchable} onPress={onPress}>
          {/* @ts-ignore */}
          <Component name={icon} size={24} color="#343536" />
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
