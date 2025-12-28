#!/bin/bash
echo "🔧 Fixing Simple Product Shop server..."

# Kill any running processes
killall -9 node 2>/dev/null
killall -9 vite 2>/dev/null

# Recreate JSON files
node -e "
const fs = require('fs');

const packageJson = {
  name: 'simple-product-shop',
  private: true,
  version: '0.0.0',
  type: 'module',
  scripts: {
    dev: 'vite',
    build: 'tsc -b && vite build',
    lint: 'eslint .',
    preview: 'vite preview',
    test: 'vitest',
    'test:run': 'vitest run',
    'test:coverage': 'vitest run --coverage'
  },
  dependencies: {
    'react': '^19.2.3',
    'react-dom': '19.2.3',
    'react-router-dom': '^6.30.2'
  },
  devDependencies: {
    '@eslint/js': '^9.39.1',
    '@testing-library/jest-dom': '^6.9.1',
    '@testing-library/react': '^16.3.1',
    '@testing-library/user-event': '^14.6.1',
    '@types/node': '^24.10.1',
    '@types/react': '^19.2.5',
    '@types/react-dom': '^19.2.3',
    '@vitejs/plugin-react': '^5.1.1',
    '@vitest/coverage-v8': '^4.0.16',
    'autoprefixer': '^10.4.22',
    'eslint': '^9.39.1',
    'eslint-import-resolver-typescript': '^4.4.4',
    'eslint-plugin-import': '^2.32.0',
    'eslint-plugin-react-hooks': '^7.0.1',
    'eslint-plugin-react-refresh': '^0.4.24',
    'globals': '^16.5.0',
    'jsdom': '^27.3.0',
    'postcss': '^8.5.6',
    'tailwindcss': '^3.4.19',
    'typescript': '~5.9.3',
    'typescript-eslint': '^8.46.4',
    'vite': '^7.2.4',
    'vitest': '^4.0.16'
  }
};

const tsconfigJson = {
  files: [],
  references: [
    { path: './tsconfig.app.json' },
    { path: './tsconfig.node.json' }
  ]
};

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
fs.writeFileSync('tsconfig.json', JSON.stringify(tsconfigJson, null, 2));

console.log('✅ JSON files recreated');
"

echo "🚀 Starting server..."
npm run dev
