import React from "react";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { ThemeProvider, getFontPaths } from "./src/theming";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import { CURRENT_THEME } from "./src/constants";

export default function App() {
  const fontPaths = getFontPaths(CURRENT_THEME);
  const [fontsLoaded] = useFonts(fontPaths);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider defaultTheme={CURRENT_THEME}>
      <AppNavigator />
    </ThemeProvider>
  );
}
