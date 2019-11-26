module.exports = {
    extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
    parserOptions: {
      ecmaVersion: 9,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true
      }
    },
    plugins: ["react", "prettier"],
    rules: {
      "prettier/prettier": "error"
    },
    env: {
      browser: true,
      node: true
    }
  };