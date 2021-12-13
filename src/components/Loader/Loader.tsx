import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useWindowDimensions, View, ImageStyle, Animated, Easing } from "react-native";
import { logo } from "src/assets";
import { createStyles } from "../Theme";

type Props = {
  children: React.ReactNode;
};

const styles = createStyles(() => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    minWidth: "100vw",
  },
  logo: {
    width: 100,
    height: 150,
  },
}));

export function Loader({ children }: Props) {
  const [loaded, setLoaded] = React.useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const dimensions = useWindowDimensions();
  const duration = 3_000;

  useLayoutEffect(() => {
    const loop = Animated.timing(animatedValue, {
      toValue: 1,
      duration,
      easing: Easing.linear,
      useNativeDriver: false,
    });

    Animated.loop(loop, { iterations: 10 }).start(() => animatedValue.setValue(0));
  }, []);

  useEffect(() => {
    if (!loaded && dimensions.width) setLoaded(true);
  }, [dimensions.width]);

  if (loaded) {
    return <>{children}</>;
  }

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: logo }}
        style={[
          styles.logo as ImageStyle,
          { opacity: animatedValue.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 0.2, 1] }) },
        ]}
      />
    </View>
  );
}
