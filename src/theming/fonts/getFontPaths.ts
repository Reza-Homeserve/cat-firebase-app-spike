export const getFontPaths = (
  theme: string
): {
  Light: string;
  Normal: string;
  Bold: string;
} => {
  switch (theme) {
    default:
      // homeserve
      return {
        Light: require(`../../../assets/themes/homeserve/fonts/light.otf`),
        Normal: require(`../../../assets/themes/homeserve/fonts/normal.otf`),
        Bold: require(`../../../assets/themes/homeserve/fonts/bold.otf`),
      };
    case "checkatrade":
      return {
        Light: require(`../../../assets/themes/checkatrade/fonts/light.ttf`),
        Normal: require(`../../../assets/themes/checkatrade/fonts/normal.ttf`),
        Bold: require(`../../../assets/themes/checkatrade/fonts/bold.ttf`),
      };
  }
};
