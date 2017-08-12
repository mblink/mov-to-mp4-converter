module.exports = {
  extends: 'airbnb/base',
  rules: {
    'comma-dangle': ['error', 'never'],
    'max-len': ['error', 117, 2],
    'no-confusing-arrow': ['error', { allowParens: true }],
    'no-console': 'off',
    'no-return-assign': ['error', 'except-parens']
  },
  globals: { document: true }
};
