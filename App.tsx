import React, { useEffect } from "react";
import { registerRootComponent } from "expo";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { ThemeProvider, getFontPaths } from "./src/theming";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import { CURRENT_THEME } from "./src/constants";
import { View, Text } from "react-native";

export default function App() {
  const fontPaths = getFontPaths(CURRENT_THEME);
  const [fontsLoaded] = useFonts(fontPaths);

  if (!fontsLoaded) {
    return (
      <View>
        <Text>hi</Text>
      </View>
    );
  }

  return (
    <ThemeProvider defaultTheme={CURRENT_THEME}>
      <AppNavigator />
    </ThemeProvider>
  );
}

registerRootComponent(App);
