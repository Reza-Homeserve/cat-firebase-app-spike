import React from "react";
import { TextInput as RNTextInput, StyleSheet } from "react-native";
import { theme } from "../../../theme";

export function TextInput({ value, onChangeText, placeholder, ...rest }) {
  return (
    <RNTextInput
      style={styles.inputBox}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  inputBox: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#707070",
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
  },
});
