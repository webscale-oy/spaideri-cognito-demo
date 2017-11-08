
module.exports = {
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  plugins: [
    'html'
  ],
  rules: {
    "no-console": "off",
    "semi": "off",
    "comma-dangle": "off",
    "no-use-before-define": ["error", { "functions": false, "classes": true, "variables": false }],
    'no-param-reassign': ["error", { 'props': false }]
  }
}
