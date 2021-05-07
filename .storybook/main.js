const {
  merge,
} = require('webpack-merge');
const customConfig = require('./webpack.config')

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ],
  webpackFinal: async (config, { configType }) => {
    return merge(config, customConfig);
  }
}