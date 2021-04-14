const lint = require('osdoc-lint');

module.exports = {
  ...lint.prettier,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 80,
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
  ],
};
