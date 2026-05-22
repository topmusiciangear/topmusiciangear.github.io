const fs = require('fs');

(async () => {
  // Check the search form on the homepage
  let res = await fetch('https://www.musik-produktiv.de/', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  });
  let html = await res.text();
  
  // Find the search form
  const formMatch = html.match(/<form[^>]*search[^>]*>([\s\S]*?)<\/form>/i);
  if (formMatch) {
    console.log('Search form found:');
    console.log(formMatch[0].substring(0, 500));
  }
  
  // Find input fields with name attributes
  const inputs = html.match(/<input[^>]*name="[^"]*"[^>]*>/gi);
  if (inputs) {
    inputs.forEach(i => console.log('Input:', i));
  }
  
  // Check for search suggest endpoint
  const scripts = html.match(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [];
  const searchConfigs = html.match(/search|suche|suggest/gi);
  console.log('\nSearch references count:', searchConfigs ? searchConfigs.length : 0);
  
  // Try the search suggest API with POST or different format
  console.log('\n=== Trying search via form submit pattern ===');
  const searchTerms = ['Neumann U 87 Ai', 'Rode NT1-A', 'Shure SM58'];
  
  for (const term of searchTerms) {
    // Try POST to /suche
    try {
      const r = await fetch('https://www.musik-produktiv.de/suche', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        body: `q=${encodeURIComponent(term)}`
      });
      const t = await r.text();
      console.log(`POST /suche for "${term}": ${r.status}, size: ${t.length}`);
      const links = t.match(/https:\/\/www\.musik-produktiv\.de\/[a-z][a-z0-9-]+\.html/g) || [];
      const productLinks = [...new Set(links)].filter(l => !l.includes('musikinstrumente') && !l.includes('musikhaus') && !l.includes('/service'));
      if (productLinks.length > 0) {
        productLinks.slice(0, 3).forEach(l => console.log(`  ${l}`));
      }
    } catch(e) {
      console.log(`Error: ${e.message}`);
    }
  }
  
  // Try the Neumann URL pattern to see if Rode follows a different pattern
  console.log('\n=== Testing alternative Rode URL patterns ===');
  const rodePatterns = [
    'rode-nt1-a.html',
    'rode-nt1a.html',
    'rode-nt1.html',
    'rode-nt1-a-mikrofon.html',
    'rode-mikrofon-nt1-a.html'
  ];
  for (const pattern of rodePatterns) {
    try {
      const r = await fetch(`https://www.musik-produktiv.de/${pattern}`, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      const html2 = await r.text();
      const title2 = html2.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] || 'N/A';
      const isValid = r.status === 200 && !title2.includes('404') && !title2.includes('Not Found');
      console.log(`${pattern}: ${r.status} | ${title2.substring(0, 60)} ${isValid ? '✅' : '❌'}`);
    } catch(e) {
      console.log(`${pattern}: Error`);
    }
  }
})();
