import React from "react";
import { Text } from "react-native-elements";
import { View } from "react-native";
import { useCreateStyles } from "../Theme";
import { Pot } from "../Pot";

type Props = {
  label: string;
  value: number;
  setValue: (value: number) => void;
  steps?: number;
};

export function PropSelector(props: Props) {
  const { value, setValue, label } = props;

  const styles = useCreateStyles(({ theme }) => ({
    container: {
      justifyContent: "center",
      alignItems: "center",
      paddingLeft: 55,
    },
    text: theme.typography.p.extend({
      color: theme.colors.lighterDark,
      fontWeight: "800",
      textAlign: "center",
    }),
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <Pot value={value} onValueChange={setValue} />
    </View>
  );
}
