import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import'
import tseslint from 'typescript-eslint'

import jsxA11y from 'eslint-plugin-jsx-a11y'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'server*', 'simple*', 'node_modules', 'coverage', '.husky', 'playwright-report']),
  js.configs.recommended,
  ...tseslint.configs.recommended,

  reactRefresh.configs.vite,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      import: importPlugin,
      'jsx-a11y': jsxA11y,
      'react-hooks': reactHooks,
    },

    rules: {
      ...jsxA11y.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
    },
  },
  {
    files: ['src/context/CartContext.tsx'],
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true, allowExportNames: ['CartProvider'] }
      ]
    }
  },
])
