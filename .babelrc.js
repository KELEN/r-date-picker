module.exports = {
  presets: [
    ['@babel/preset-env', { shippedProposals: true }],
    '@babel/preset-react',
    '@babel/preset-flow',
  ],
  plugins: [
    '@babel/plugin-transform-react-jsx',
    ['@babel/plugin-proposal-object-rest-spread', { loose: true, useBuiltIns: true }],
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-syntax-dynamic-import',
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }]
  ]
}