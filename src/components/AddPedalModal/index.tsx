import React, { useState } from "react";
import * as R from "ramda";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { MaterialIcons } from "@expo/vector-icons";

import { modalsAtom } from "src/atoms/modals";
import { pedalsAtom } from "src/atoms/pedals";
import { TextInput } from "../TextInput";

import { useCreateStyles } from "../Theme";
import { PedalCard } from "./Pedal";

const propMatches = (q, prop) => R.compose(R.includes(q), R.toLower, R.propOr("", prop));

const pedalMatches = R.curry((query, pedal) => {
  const lowerCaseQuery = R.toLower(query);

  return R.anyPass([propMatches(lowerCaseQuery, "name"), propMatches(lowerCaseQuery, "brand")])(pedal);
});

export function AddPedalModal() {
  const styles = useCreateStyles(({ theme }) => ({
    container: {
      padding: theme.spacings.l,
    },
    pedalsContainer: {
      flexWrap: "wrap",
      flexDirection: "row",
    },
    inputContainer: {
      marginHorizontal: theme.spacings.m,
      flexDirection: "row",
      alignItems: "center",
    },
    textInput: {
      marginBottom: 0,
      marginRight: theme.spacings.l,
    },
  }));

  const [search, setSearch] = useState("");
  const pedals = useRecoilValue(pedalsAtom);
  const setModal = useSetRecoilState(modalsAtom);

  const results = R.unless(() => R.isNil(search), R.filter(pedalMatches(search)))(pedals);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} value={search} onChangeText={setSearch} placeholder="Filter pedals" />
        <TouchableOpacity onPress={() => setModal(null)}>
          <MaterialIcons name="close" size={24} color="#343536" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.pedalsContainer}>
        {results.map((pedal, index) => (
          <PedalCard key={index} pedal={pedal} />
        ))}
      </ScrollView>
    </View>
  );
}
