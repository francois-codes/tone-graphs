import React from "react";
import { View, Text } from "react-native";

import { TextInput } from "../TextInput";
import { Button } from "../Button";
import { useCreateStyles } from "../Theme";

type Props = {
  state: Pedal;
  setName: (name: string) => void;
  setDatapoints: (csv: string) => void;
  resetState: () => void;
};

const prettify = (data) => JSON.stringify(data, null, 2);

export function PreviewForm(props: Props) {
  const styles = useCreateStyles(({ theme, responsiveValue }) => ({
    container: {
      flex: 1,
    },
    header: theme.typography.h2.extend({ marginVertical: theme.spacings.m }),
    label: theme.typography.p.extend({ marginVertical: theme.spacings.s }),
    textArea: theme.forms.textInput.extend({ height: responsiveValue({ desktop: 200, mobile: 150 }) }),
    buttonContainer: { flexDirection: "row" },
  }));

  const buttonsEnabled = props.state.name && props.state.datapoints?.length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pedal data preview</Text>
      <Text style={styles.label}>Pedal Name:</Text>
      <TextInput value={props.state.name} placeholder="type pedal name" onChangeText={props.setName} />
      <Text style={styles.label}>Pedal Datapoints:</Text>
      <TextInput
        style={styles.textArea}
        multiline
        numberOfLines={10}
        value={prettify(props.state.datapoints)}
        placeholder="type pedal datapoints"
        onChangeText={props.setDatapoints}
      />
      <View style={styles.buttonContainer}>
        <Button icon="clear" onPress={props.resetState} />
        <Button
          icon="save"
          onPress={() => {
            const data = props.state.datapoints;
            const form = document.createElement("form");
            form.setAttribute("method", "post");
            form.setAttribute("action", "/api/datapoints.json");
            form.setAttribute("target", "_blank");

            const hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "data");
            hiddenField.setAttribute("value", JSON.stringify(data));

            form.appendChild(hiddenField);
            const nextRoot = document.getElementById("__next");
            nextRoot.appendChild(form);

            form.submit();
          }}
          color={buttonsEnabled ? "lightgray" : "#343536"}
          disabled={!buttonsEnabled}
        />
      </View>
    </View>
  );
}
