module.exports = {
  env: {
    jest: true,
  },
  parser: 'babel-eslint',
  plugins: ['react'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'airbnb-base'],
  rules: {
    'arrow-body-style': 'warn',
  },
};
