import React from "react";
import * as R from "ramda";
import { TextInputProps, TextInput as RNTextInput } from "react-native";
import { useCreateStyles } from "../Theme";

type Props = TextInputProps;

export function TextInput(props: Props) {
  const styles = useCreateStyles(({ theme }) => ({
    textInput: theme.forms.textInput(),
  }));

  return (
    <RNTextInput
      autoComplete="off"
      autoCorrect={false}
      {...R.omit(["style"], props)}
      style={[styles.textInput, props.style || {}]}
    />
  );
}
