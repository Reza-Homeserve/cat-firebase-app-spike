module.exports = function (api) {
  api.cache(true);

  const rootImportOpts = {
    paths: [
      {
        root: __dirname,
        rootPathPrefix: "src/",
        rootPathSuffix: "src",
      },
    ],
  };

  return {
    presets: ["babel-preset-expo", "module:metro-react-native-babel-preset"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: false,
        },
      ],
      ["babel-plugin-root-import", rootImportOpts],
    ],
  };
};
