// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ["babel-preset-expo"],
//     plugins: ["expo-router/babel", "react-native-reanimated/plugin"],
//   };
// };
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["react-native-reanimated/plugin"], // Make sure to keep this plugin if you need it
  };
};
