import homeserveColors from "@homeservenow/design-tokens/dist/colour/js/colour-light.module";

export const themes: ThemeInterface = {
  homeserve: {
    font: {
      primary: "Bold",
    },
    colors: {
      light: {
        ...homeserveColors,
      },
    },
  },
  checkatrade: {
    font: {
      primary: "Bold", // FIXME: should be open-sans
    },
    colors: {
      light: {
        ...homeserveColors, // because we don't have an entire list of tokens for CAT yet
        TokenColorBrandPrimary: "#0058A2", // FIXME
        TokenColorBrandPrimary80: "#2671B0", // FIXME,
      },
    },
  },
};

export interface ThemeInterface {
  [theme: string]: {
    font: {
      [key: string]: string;
    };
    colors: {
      [mode: string]: {
        [key: string]: string;
      };
    };
  };
}
