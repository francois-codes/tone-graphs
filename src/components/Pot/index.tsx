import React, { useEffect, useRef } from "react";
import * as R from "ramda";
import { View, ImageStyle, Animated, PanResponder } from "react-native";
import { knob } from "src/assets";
import { useCreateStyles } from "../Theme";

type Props = {
  value: number;
  onValueChange: (number) => void;
};

const initialValueToPan = (initialValue: number) => -(initialValue - 50) * 2;
const panToInitialValue = (pan: number) => Math.round(-pan / 2) + 50;

export function Pot({ onValueChange, value: initialValue = 50 }: Props) {
  const styles = useCreateStyles(() => ({
    container: {
      width: 80,
      height: 80,
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      width: 60,
      height: 60,
    },
  }));

  const pan = useRef(new Animated.Value(initialValueToPan(initialValue))).current;
  // @ts-ignore
  const potValue = useRef(initialValueToPan(initialValue));

  pan.addListener(({ value }) => {
    const newValue = R.clamp(0, 100, panToInitialValue(value));

    if (newValue !== potValue.current) {
      potValue.current = newValue;
      if (newValue % 25 === 0) {
        onValueChange(newValue);
      }
    }
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        // @ts-ignore
        pan.setOffset(pan._value);
      },
      onPanResponderMove: (e, gesture) => {
        Animated.event([null, { dy: pan }])(e, gesture);
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  ).current;

  const potView = useRef(null);

  const onTouchMove = (e) => {
    if (e.target === potView.current.children[0].children[1]) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [potView.current]);

  return (
    <View style={styles.container} ref={potView}>
      <Animated.Image
        source={{ uri: knob }}
        style={
          [
            styles.image,
            {
              transform: [
                {
                  rotate: pan.interpolate({
                    inputRange: [-100, 0, 100],
                    outputRange: ["120deg", "0deg", "-120deg"],
                    extrapolate: "clamp",
                  }),
                },
              ],
            },
          ] as ImageStyle
        }
        {...panResponder.panHandlers}
      />
    </View>
  );
}
