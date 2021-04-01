module.exports = {
  extends: [require.resolve('osdoc-lint/dist/eslint')],
  globals: {
    PRO_VAR: 'readonly',
    NODE_IS_DEV: 'readonly',
    VConsole: 'readonly',
    RELEASE_VERSION: 'readpnly',
  },
  rules: {},
};
