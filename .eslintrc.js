module.exports = {
  extends: 'airbnb/base',
  env: { mocha: true },
  rules: {
    'comma-dangle': ['error', 'never'],
    'max-len': ['error', 117, 2],
    'no-confusing-arrow': ['error', { allowParens: true }],
    'no-console': 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-return-assign': ['error', 'except-parens']
  },
  globals: {
    document: true,
    expect: true,
    window: true
  }
};
