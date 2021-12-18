import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
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
      backgroundColor: "rgba(31,31,31,0.7)",
      flex: 1,
      justifyContent: "flex-start",
    },
    modalContainer: {
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.lighterDark,
      borderWidth: 1,
      borderRadius: 6,
      width: "100vw",
      height: "100vh",
    },
  }));

  useEffect(() => {
    console.log("modal", { modal });
  }, [modal]);

  if (!modal) return null;

  const Component = ModalsMap[modal];

  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <Component />
        </View>
      </View>
    </View>
  );
}
