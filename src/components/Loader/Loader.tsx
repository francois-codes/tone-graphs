import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { useWindowDimensions, View, ImageStyle, Animated, Easing } from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { logo } from "src/assets";
import { pedalsAtom } from "src/atoms/pedals";
import { fetchPedals } from "src/Pedals/fetch";
import { createStyles } from "../Theme";

type Props = {
  children: React.ReactNode;
  state: PedalState;
  preview: boolean;
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

export function Loader({ children, state, preview }: Props) {
  const [loaded, setLoaded] = React.useState(false);
  const setPedals = useSetRecoilState(pedalsAtom);
  const pedals = useRecoilValue(pedalsAtom);
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

  const loadPedals = useCallback(async () => {
    const pedals = await fetchPedals(preview, state);
    setPedals(pedals);
  }, []);

  useEffect(() => {
    loadPedals();
  }, []);

  useEffect(() => {
    if (pedals?.length > 0 && !loaded && dimensions.width) {
      setLoaded(true);
    }
  }, [pedals?.length, loaded, dimensions.width]);

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
