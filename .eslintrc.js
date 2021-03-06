module.exports = {
  extends: [
    'eslint:recommended',
    // Uses the recommended rules from @typescript-eslint/eslint-plugin
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/base.ts
    'plugin:@typescript-eslint/recommended',
    // Uses the recommended rules from @eslint-plugin-react
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/index.js
    'plugin:react/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2019, // Allows for the parsing of modern ECMAScript features
  },
  plugins: ['eslint-plugin-react', 'eslint-plugin-react-hooks'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    // Prettier とバッティングするので off
    'no-extra-semi': 'off',
    // { onClick?(): void } のような props type をうまく判定できないので off
    // 同じことが TS で検知できる
    'react/prop-types': 'off',
    // https://github.com/typescript-eslint/typescript-eslint/blob/cc70e4fbadd0b15fd6af913a2e1e2ddd346fa558/packages/eslint-plugin/docs/rules/no-unused-vars.md
    // note you must disable the base rule as it can report incorrect errors
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '_$' }],
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
}
