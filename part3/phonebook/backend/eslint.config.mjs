import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        module: true, 
        require: true, 
        process: true, 
        __dirname: true, 
      },
    },
    plugins: {
      react: pluginReact,
    },
    settings: {
      react: {
        version: "detect", 
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off", 
      "react/prop-types": "warn",
    },
  },
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    ...pluginJs.configs.recommended,
    ...pluginReact.configs.flat.recommended,
  },
];
