const {
  merge,
} = require('webpack-merge');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const customConfig = require('./webpack.config');

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
    // 移除默认的css-loader
    config.module.rules = config.module.rules.map(rule => {
      if (Array.isArray(rule.oneOf)) {
        rule.oneOf = rule.oneOf.filter(r => {
          return r.test && r.test.toString() !== '/\\.css$/';
        })
      }
      return rule;
    })

    // 移除默认的eslint plugin，防止启动失败
    config.plugins = config.plugins.filter(plugin => {
      return plugin.constructor.name !== 'ESLintWebpackPlugin'
    })

    return merge(config, customConfig);
  }
}