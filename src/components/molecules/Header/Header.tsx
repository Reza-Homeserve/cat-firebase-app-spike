import React from "react";
import { Image, View, StyleSheet } from "react-native";
import logo from "../../../../assets/logo.png";

export const Header = () => (
  <View style={styles.container}>
    <Image source={logo} style={styles.logo} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    resizeMode: "contain",
  },
});
