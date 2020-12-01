import React, { useState, ReactElement } from "react";

import {
  Text,
  ActivityIndicator,
  View,
  ViewStyle,
  TextStyle,
  StyleSheet,
  Pressable,
} from "react-native";

import {
  TokenColorBrandPrimary,
  TokenColorBrandPrimary80,
  TokenColorSystemDisabled,
  TokenColorSystemWhite,
  TokenColorTextDisabled,
  TokenColorTextInverse,
} from "@homeservenow/design-tokens/dist/colour/js/colour-light.module";

import { TokenComponentButtonTextAlign } from "@homeservenow/design-tokens/dist/components/button/js/components-button.module";

import { useTheme } from "../../../theming";

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  buttonText: {
    fontFamily: "Bold",
    fontSize: 16,
    letterSpacing: 1,
    lineHeight: 20,
    color: TokenColorTextInverse,
    textAlign: TokenComponentButtonTextAlign,
  },
  button: {
    backgroundColor: TokenColorBrandPrimary,
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderRadius: 5,
    textAlign: TokenComponentButtonTextAlign,
    elevation: 2,
    height: 45,
  },
  block: {
    flexDirection: "column",
    flexWrap: "nowrap",
    width: "100%",
    textAlign: TokenComponentButtonTextAlign,
  },
  loadingIcon: {
    top: -1,
    justifyContent: TokenComponentButtonTextAlign,
    color: TokenColorTextInverse,
  },
  disabled: {
    backgroundColor: TokenColorSystemDisabled,
  },
  disabledText: {
    color: TokenColorTextDisabled,
  },
  pressed: {
    backgroundColor: TokenColorBrandPrimary80,
  },
});

/**
 * A React-Native button component.
 *
 * #### Usage:
 *
 * `import { Button } from "@homeservenow/react-native-components"`
 *
 * Use the Button in your app:
 *
 * E.g:
 * `<Button label="Press me!" onPress={() => {})} />`
 */
export function Button({
  label,
  loading,
  onPress,
  disabled = false,
  block = false,
  style,
}: ButtonProps): ReactElement {
  const [pressed, setPressed] = useState(false);
  const { currentTheme, themes, mode } = useTheme();

  const handlePress = (event): void => {
    event.preventDefault();
    if (onPress) {
      onPress();
    }
  };

  const handlePressEnterExit = (): void => {
    setPressed(!pressed);
  };

  /*
   * These overrides are required to make this work
   * with the ThemeProvider component and help white label it.
   *
   * When used outside of a ThemeProvider, it will default to the HSN colours.
   */
  const setThemeOverridesBg = (): OverrideStyles => {
    if (themes && currentTheme && mode) {
      let tokenName = "TokenColorBrandPrimary";

      if (pressed) {
        tokenName = "TokenColorBrandPrimary80";
      }

      if (disabled) {
        tokenName = "TokenColorSystemDisabled";
      }

      return {
        backgroundColor: themes[currentTheme].colors[mode][tokenName],
      };
    }
    return {};
  };

  const setThemeOverridesText = (): OverrideStyles => {
    if (themes && currentTheme) {
      return {
        fontFamily: themes[currentTheme].font.primary,
      };
    }
    return {};
  };

  return (
    <View
      style={[styles.container, block && styles.block]}
      pointerEvents={disabled ? "none" : "auto"}
    >
      <Pressable
        disabled={disabled}
        onPress={handlePress}
        onPressIn={handlePressEnterExit}
        onPressOut={handlePressEnterExit}
      >
        <View
          style={[
            styles.button,
            pressed && styles.pressed,
            disabled && styles.disabled,
            block && styles.block,
            setThemeOverridesBg(),
            style && style,
          ]}
        >
          <View pointerEvents="box-none">
            {!loading && (
              <Text
                style={[
                  styles.buttonText,
                  disabled && styles.disabledText,
                  setThemeOverridesText(),
                ]}
              >
                {label}
              </Text>
            )}
            {loading && (
              <Text
                style={[styles.buttonText, disabled && styles.disabledText]}
              >
                <ActivityIndicator
                  style={styles.loadingIcon}
                  color={TokenColorSystemWhite}
                />
              </Text>
            )}
          </View>
        </View>
      </Pressable>
    </View>
  );
}

interface OverrideStyles {
  backgroundColor?: string;
  color?: string;
  fontFamily?: string;
}

interface Styles {
  container: ViewStyle;
  buttonText: TextStyle;
  button: ViewStyle;
  loadingIcon: ViewStyle;
  block: ViewStyle;
  disabled: ViewStyle;
  disabledText: TextStyle;
  pressed: ViewStyle;
}

export interface ButtonProps {
  /**
   * The text to be shown inside the button
   */
  label: string;
  /**
   * Enable/disable the buttons loading state
   */
  loading?: boolean;
  /**
   * Full width
   */
  block?: boolean;
  /**
   * Disable button
   */
  disabled?: boolean;
  /**
   * Press handler fn
   */
  onPress: () => void;
  /**
   * Style overrides
   */
  style?: ViewStyle;
}
