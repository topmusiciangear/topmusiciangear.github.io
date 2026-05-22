const fs = require('fs');

(async () => {
  // Try category pages - these might be server-rendered
  const categories = [
    'https://www.musik-produktiv.de/mikrofone/',
    'https://www.musik-produktiv.de/studio-recording/',
    'https://www.musik-produktiv.de/kopfhoerer/',
    'https://www.musik-produktiv.de/e-gitarren/',
    'https://www.musik-produktiv.de/pa-lautsprecher/',
    'https://www.musik-produktiv.de/gitarren-effekte/',
    'https://www.musik-produktiv.de/keyboard-piano/',
    'https://www.musik-produktiv.de/drums-percussion/',
  ];
  
  for (const catUrl of categories) {
    try {
      const r = await fetch(catUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
      });
      const html = await r.text();
      const title = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] || 'N/A';
      console.log(`${catUrl}`);
      console.log(`  Status: ${r.status}, Title: ${title.substring(0, 60)}, Size: ${html.length}`);
      
      // Extract product links
      const linkRegex = /<a[^>]*href="(https:\/\/www\.musik-produktiv\.de\/[a-z][a-z0-9-]+\.html)"[^>]*>/gi;
      const links = new Set();
      let match;
      while ((match = linkRegex.exec(html)) !== null) {
        const href = match[1];
        if (!href.includes('musikinstrumente') && !href.includes('musikhaus') && !href.includes('/service') && !href.includes('/suche')) {
          links.add(href);
        }
      }
      console.log(`  Product links found: ${links.size}`);
      if (links.size > 0) {
        [...links].slice(0, 10).forEach(l => console.log(`    ${l}`));
      }
      console.log('');
    } catch(e) {
      console.log(`${catUrl}: Error: ${e.message}`);
    }
  }
})();
