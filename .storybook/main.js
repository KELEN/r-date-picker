const {
  merge,
} = require('webpack-merge');
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
    config.module.rules = config.module.rules.map(rule => {
      if (Array.isArray(rule.oneOf)) {
        rule.oneOf = rule.oneOf.filter(r => {
          // console.log(r.test && r.test.toString())
          // if (r.test && r.test.toString() === '/\\.(js|mjs|jsx|ts|tsx)$/') {
          //   console.log(r.include, r);
          // }
          return r.test && r.test.toString() !== '/\\.css$/';
        })
      }
      return rule;
    })

    config.plugins.forEach(plugin => {
      // console.log(plugin)
    })
    
    console.log(config.plugins)

    // console.log(config);
    return merge(config, customConfig);
  }
}