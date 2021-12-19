import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Pedal } from "./Pedal";
import { MaterialIcons } from "@expo/vector-icons";

import { useCreateStyles } from "../Theme";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { PedalContainer } from "./PedalContainer";
import { selectedPedalsSelector } from "src/atoms/pedals";
import { Modals, modalsAtom } from "src/atoms/modals";

export function PedalsList() {
  const styles = useCreateStyles(({ theme }) => ({
    container: {
      flex: 1,
      flexDirection: "column",
      alignSelf: "stretch",
      justifyContent: "flex-start",
      padding: theme.spacings.m,
    },
    addContainer: {
      backgroundColor: theme.colors.darkerLight,
      justifyContent: "flex-start",
      paddingHorizontal: theme.spacings.l,
    },
    buttonText: theme.typography.h1.extend({
      fontWeight: "800",
      color: theme.colors.lighterDark,
      paddingLeft: theme.spacings.m,
    }),
  }));

  const pedals = useRecoilValue(selectedPedalsSelector);

  const setModal = useSetRecoilState(modalsAtom);

  return (
    <View style={styles.container}>
      {pedals.map((pedal, index) => (
        <Pedal key={index} pedal={pedal} />
      ))}
      <TouchableOpacity onPress={() => setModal(Modals.AddPedal)}>
        <PedalContainer style={styles.addContainer}>
          <MaterialIcons name="add" size={24} color="#343536" />
          <Text style={styles.buttonText}>Add Pedal</Text>
        </PedalContainer>
      </TouchableOpacity>
    </View>
  );
}
