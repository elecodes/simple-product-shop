console.log('Testing React imports...');
try {
  const React = require('react');
  const ReactDOM = require('react-dom/client');
  console.log('✅ React imports successful');
  
  // Test if main.tsx can be parsed
  const fs = require('fs');
  const mainContent = fs.readFileSync('./src/main.tsx', 'utf8');
  console.log('✅ main.tsx can be read');
  
  console.log('✅ Basic setup working');
} catch (error) {
  console.error('❌ Error:', error.message);
}
