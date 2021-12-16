import React from "react";
import { View, Text } from "react-native";
import { createStyles } from "../Theme";
import { A } from "../A";

const styles = createStyles(({ theme }) => ({
  container: {
    flex: 1,
    marginVertical: theme.spacings.xxl,
    padding: theme.spacings.m,
  },
  header: theme.typography.h1.extend({ marginTop: theme.spacings.l, marginBottom: theme.spacings.s }),
  paragraph: theme.typography.p.extend({ marginBottom: theme.spacings.s }),
}));

export function InfoText() {
  return (
    <View style={styles.container}>
      <div id="credits" />
      <Text style={styles.header}>Welcome to ToneGraphs !</Text>
      <Text style={styles.paragraph}>
        We&apos;re happy to present you with this database for visualizing and comparing frequency responses of boost,
        overdrive, distortion, and fuzz pedals. Have fun!
      </Text>

      <Text style={styles.header}>⚠️ Disclaimer !</Text>
      <Text style={styles.paragraph}>
        The frequency response is far from a comprehensive way to describe the sound of a pedal. Attack, clipping,
        compression, impedances, etc. are all essential parts of how a pedal behaves. The curves you see here are how a
        circuit responds to a flat Pink Noise input. A pedal is but one of the many components that define the sound you
        hear from an amp.
      </Text>

      <Text style={styles.header}>Technical mumbo-jumbo</Text>
      <Text style={styles.paragraph}>
        Pedals are fed a relatively high-input, high-quality{" "}
        <A href="https://www.audiocheck.net/testtones_pinknoise.php" target="_blank">
          Pink Noise
        </A>{" "}
        (except when varying input is of interest), then response is calculated relative to the Pink Noise input. Level
        is standardized so it peaks at 0dB. Frequency analyses are made using{" "}
        <A href="https://www.audacityteam.org" target="_blank">
          Audacity
        </A>
        . Data management and processing are made using{" "}
        <A href="https://tidyverse.tidyverse.org" target="_blank">
          tidyverse
        </A>{" "}
        in R.
      </Text>

      <Text style={styles.header}>Credits</Text>
      <Text style={styles.paragraph}>
        The idea for ToneGraphs.com spawned in Rafael&apos;s head. Then François offered to help and build this website.
        you can come chat with use in the That Pedal Show facebook group, or in{" "}
        <A href="https://github.com/f-roland/tone-graphs" target="_blank">
          the repository on GitHub
        </A>
        . This site uses React, Expo, Next.js and is hosted on Vercel. This is open source, so feel free to contribute!
      </Text>
      <Text style={styles.paragraph}>
        The pedal icon comes from{" "}
        <A href="https://thenounproject.com/Hum/" target="_blank">
          Hum
        </A>
      </Text>
    </View>
  );
}
