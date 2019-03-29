const path = require('path')

module.exports = async ({ config, mode }) => {

  config.module.rules.push({
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader'],
    exclude: path.resolve(__dirname, '../node_modules'),
  })

  return config
}