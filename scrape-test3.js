const fs = require('fs');

(async () => {
  // Try common search API patterns for MusikProduktiv
  const searchTerms = ['Neumann U 87 Ai', 'Shure SM7B', 'Focusrite Scarlett 2i2'];
  const term = encodeURIComponent(searchTerms[0]);

  // Try different API patterns
  const urls = [
    `https://www.musik-produktiv.de/suche?q=${term}`,
    `https://www.musik-produktiv.de/autocomplete?s=${term}`,
    `https://www.musik-produktiv.de/api/search?q=${term}`,
    `https://www.musik-produktiv.de/ajax/search?q=${term}`,
    `https://www.musik-produktiv.de/search/ajax/suggest?query=${term}`,
    `https://www.musik-produktiv.de/suche/?q=${term}`,
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/json, text/html, */*',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      const text = await res.text();
      console.log(`${url}`);
      console.log(`  Status: ${res.status}, Content-Type: ${res.headers.get('content-type')}`);
      console.log(`  Size: ${text.length} bytes`);
      
      // Check if it contains product links
      if (text.includes('.html') && !text.includes('musikinstrumente.html')) {
        const links = text.match(/https:\/\/www\.musik-produktiv\.de\/[a-z0-9-]+\.html/g) || [];
        console.log(`  Product links found: ${links.length}`);
        links.slice(0, 5).forEach(l => console.log(`    ${l}`));
      }
      if (text.startsWith('{') || text.startsWith('[')) {
        console.log(`  JSON response: ${text.substring(0, 300)}`);
      }
    } catch (e) {
      console.log(`${url}: Error: ${e.message}`);
    }
    console.log('');
  }
})();
