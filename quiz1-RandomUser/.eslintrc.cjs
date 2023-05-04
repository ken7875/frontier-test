/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  rules: {
    'vue/multi-word-component-names': 0,
    'prettier/prettier': [
      'error',
      {
        printWidth: 130, // 看公司給的螢幕多大
        tabWidth: 2 // 建議tab都是2個空格寬
      }
    ]
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
