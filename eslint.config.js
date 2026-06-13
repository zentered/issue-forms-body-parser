import js from '@eslint/js'
import n from 'eslint-plugin-n'
import json from '@eslint/json'
import globals from 'globals'

export default [
  {
    ignores: [
      'dist/**',
      'action/**',
      'pkg/**',
      'coverage/**',
      'test/**',
      'package-lock.json',
      'eslint.config.js'
    ]
  },
  {
    files: ['**/*.js'],
    plugins: {
      ...n.configs['flat/recommended'].plugins
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      ...n.configs['flat/recommended'].rules
    }
  },
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    rules: json.configs.recommended.rules
  }
]
