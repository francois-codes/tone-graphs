import React, { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Footer } from "../Footer";
import { useCreateStyles } from "../Theme";

type Props = {
  children: ReactNode;
};

export function Container({ children }: Props) {
  const styles = useCreateStyles(({ theme, dimensions: { width } }) => ({
    app: {
      flex: 1,
      minHeight: "100vh",
      minWidth: "100vw",
      backgroundColor: theme.colors.light,
    },
    container: {
      maxWidth: 1440,
      flex: 1,
      width,
      // flexGrow: 1,
      marginHorizontal: "auto",
      alignItems: "center",
    },
    scrollContainer: {
      flex: 1,
      minHeight: "100vh",
      minWidth: "100vw",
    },
    innerScroll: {
      flex: 1,
    },
  }));

  return (
    <SafeAreaView style={styles.app}>
      <View style={styles.container}>{children}</View>
      <Footer />
    </SafeAreaView>
  );
}
