module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ts", ".tsx", ".jsx", ".js", ".json"],
          alias: {
            "@screens": "./src/screens",
            "@components": "./src/components",
            "@navigation": "./src/navigation",
            "@store": "./src/store",
            "@utils": "./src/shared/utils",
            "@constants": "./src/shared/constants",
            "@interfaces": "./src/shared/interfaces",
            "@services": "./src/shared/services",
            "@textComponents": "./src/components/TextComponents",
          },
        },
      ],
    ],
  };
};
