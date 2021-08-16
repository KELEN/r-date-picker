const path = require('path')

module.exports = async ({ config, mode }) => {

  config.module.rules.push({
    test: /\.less$/,
    loaders: ['style-loader', 'css-loader', 'less-loader'],
    exclude: path.resolve(__dirname, '../node_modules'),
  })

  return config
}