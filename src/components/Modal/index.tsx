import React from "react";
import { View } from "react-native";
import { useRecoilValue } from "recoil";
import { modalsAtom, Modals } from "src/atoms/modals";
import { useCreateStyles } from "../Theme";
import { AddPedalModal } from "../AddPedalModal";

const ModalsMap = {
  [Modals.AddPedal]: AddPedalModal,
};

export function Modal() {
  const modal = useRecoilValue(modalsAtom);

  const styles = useCreateStyles(({ theme }) => ({
    backdrop: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(31,31,31,0.7)",
      flex: 1,
      justifyContent: "flex-start",
    },
    modalContainer: {
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.lighterDark,
      borderWidth: 1,
      borderRadius: 6,
      flex: 1,
    },
  }));

  if (!modal) return null;

  const Component = ModalsMap[modal];

  return (
    <View style={styles.backdrop}>
      <View style={styles.modalContainer}>
        <Component />
      </View>
    </View>
  );
}
