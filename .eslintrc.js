module.exports = {
  env: {
    es2021: true,
  },
  extends: "airbnb-base",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    quotes: ["error", "double"],
    "no-underscore-dangle": "off",
    "linebreak-style": "off",
    "no-unused-vars": ["error", { args: "none" }],
    "implicit-arrow-linebreak": "off",
    "function-paren-newline": "off",
    "comma-dangle": "off",
    "no-console": "off",
    "operator-linebreak": "off",
  },
};
