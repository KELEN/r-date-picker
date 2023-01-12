module.exports = {
  parser: "@babel/eslint-parser",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  settings: {
    "react": {
      "version": "detect"
    }
  },
  parserOptions: {
    "sourceType": "module",
  },
  env: {
    es6: true,
    browser: true,
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'import/no-unresolved': 'off',
    'max-len': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
  overrides: [
    {
      "files": [
        "**/*.test.js",
        "**/*.test.jsx"
      ],
      "env": {
        "jest": true
      }
    }
  ]
};
