"use strict";

module.exports = {
  presets: [['@babel/preset-env', {
    shippedProposals: true
  }], '@babel/preset-react', '@babel/preset-flow'],
  plugins: ['@babel/plugin-transform-react-jsx']
};