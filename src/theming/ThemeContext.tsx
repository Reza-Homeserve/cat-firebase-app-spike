import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { themes as allThemes, ThemeInterface } from "./theme";

const defaultMode = "light";
const baseTheme = "homeserve"; // FIXME: pull from @homeservenow/design-tokens eventually

type ContextValues = {
  currentTheme: string;
  allThemes: ThemeInterface;
  defaultMode: string;
  setCurrentTheme: Function;
};

const ThemeContext = createContext<Partial<ContextValues>>({});

type ThemeProviderProps = {
  defaultTheme: string;
  children: ReactNode;
};

type ThemeHookReturn = {
  currentTheme: string;
  themes: ThemeInterface;
  mode: string;
  setTheme: Function;
};

export const isValidTheme = (theme): boolean =>
  Object.keys(allThemes).includes(theme);

export function ThemeProvider({
  defaultTheme,
  children,
}: ThemeProviderProps): ReactElement {
  if (defaultTheme === undefined || !isValidTheme(baseTheme)) {
    console.error(
      "Error: Please set a valid default theme in your ThemeProvider"
    );
  }
  const [currentTheme, setCurrentTheme] = useState<string>(defaultTheme);

  useLayoutEffect(() => {
    if (defaultTheme) {
      setCurrentTheme(defaultTheme);
    }
  }, [defaultTheme]);

  return (
    <ThemeContext.Provider
      value={{ currentTheme, allThemes, defaultMode, setCurrentTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook for returning theme information, when used in conjuction with the ThemeProvider.
 *
 * @returns {Object} theme Hook result object
 * @returns {string} theme.currentTheme The name of the current active theme
 * @returns {Object} theme.themes Map of all themes currently available
 * @returns {string} theme.mode The name of the current active colour mode. E.g. light, dark etc..
 * @returns {function} theme.setTheme Set a new theme in the ThemeProvider
 */
export function useTheme(): Partial<ThemeHookReturn> {
  const {
    currentTheme,
    allThemes: themes,
    defaultMode: mode,
    setCurrentTheme: setTheme,
  } = useContext(ThemeContext);
  if (currentTheme === undefined) {
    throw new Error("ThemeProvider is missing");
  }

  return {
    currentTheme,
    themes,
    mode,
    setTheme,
  };
}
