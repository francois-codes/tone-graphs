import React from "react";
import { View, TouchableOpacity } from "react-native";
import { createStyles } from "../Theme";
import { BlockPicker } from "react-color";
import { useSetPedalState } from "src/atoms/pedals";
import { Popover } from "react-tiny-popover";

type Props = {
  pedal: Pedal;
};

const styles = createStyles(({ theme }) => ({
  pickerContainer: {
    position: "absolute",
  },
  color: {
    width: 18,
    height: 18,
    borderRadius: 9,
    overflow: "hidden",
    marginHorizontal: theme.spacings.m,
    marginVertical: theme.spacings.xs,
  },
}));

export function ColorSelector({ pedal }: Props) {
  const [modal, setModal] = React.useState(false);
  const { setPedalColor } = useSetPedalState();

  return (
    <Popover
      isOpen={modal}
      positions={["bottom"]}
      padding={10}
      onClickOutside={() => setModal(false)}
      content={
        <BlockPicker
          color={pedal.color}
          onChangeComplete={({ hex }) => {
            setPedalColor(pedal, hex);
          }}
        />
      }
    >
      <TouchableOpacity onPress={() => setModal(!modal)}>
        <View style={[styles.color, { backgroundColor: pedal.color }]} />
      </TouchableOpacity>
    </Popover>
  );
}
