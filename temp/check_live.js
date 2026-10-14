const https = require('https');
https.get('https://topmusiciangear.com/index.html', (res) => {
  let data = ''; res.on('data', c => data += c); res.on('end', () => {
    // Check what's in the page
    console.log('Home size:', data.length);
    
    // Check if guideGrid div exists
    const gridIdx = data.indexOf('id="guideGrid"');
    console.log('guideGrid div:', gridIdx > -1);
    
    // Check for any error messages
    const errorIdx = data.indexOf('no-results');
    console.log('no-results present:', errorIdx > -1);
    
    // Check the script that initializes the page
    const scripts = data.match(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [];
    console.log('Scripts inline:', scripts.length);
    
    // Find the main init script
    const mainScript = data.indexOf('DOMContentLoaded');
    console.log('DOMContentLoaded:', mainScript > -1);
    
    // Check what the page looks like around guideGrid
    if (gridIdx > -1) {
      console.log('\nAround guideGrid:', data.slice(gridIdx - 100, gridIdx + 500));
    }
    
    // Check if there's a JS error by looking at the last part of the page
    console.log('\nLast 2000 chars:', data.slice(-2000));
  });
}).on('error', e => console.log('Error:', e.message));