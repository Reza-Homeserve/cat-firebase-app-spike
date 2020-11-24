import React from "react";
import { View, StyleSheet } from "react-native";

export const Container = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
    padding: 40,
  },
});
