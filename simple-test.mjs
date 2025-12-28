console.log('Testing React imports...');
try {
  const React = await import('react');
  const ReactDOM = await import('react-dom/client');
  console.log('✅ React imports successful');
  
  // Test if main.tsx can be parsed
  const fs = await import('fs');
  const mainContent = fs.readFileSync('./src/main.tsx', 'utf8');
  console.log('✅ main.tsx can be read');
  
  console.log('✅ Basic setup working');
} catch (error) {
  console.error('❌ Error:', error.message);
}
