module.exports = {
  root: true,
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    'block-spacing': ['error', 'never'],
    // 'object-curly-spacing': ['error', 'never', { 'objectsInObjects': true }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'no-undef': 'off',
    'camelcase': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
