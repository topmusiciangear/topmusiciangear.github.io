const fs = require('fs');

(async () => {
  // The form input name is 'query'
  // Let me try GET with query parameter
  const terms = ['Rode NT1-A', 'Shure SM58', 'AKG C414 XLII', 'Sennheiser MD 421', 'Beyerdynamic DT 770 Pro'];
  
  for (const term of terms) {
    try {
      const r = await fetch(`https://www.musik-produktiv.de/suche?query=${encodeURIComponent(term)}`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
        redirect: 'manual'
      });
      // Follow redirects manually
      let url = r.url;
      let status = r.status;
      let text;
      if (status === 301 || status === 302) {
        const location = r.headers.get('location');
        console.log(`${term}: ${status} -> ${location}`);
        // Follow redirect
        const r2 = await fetch(location, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
        });
        text = await r2.text();
        url = r2.url;
        status = r2.status;
      } else {
        text = await r.text();
      }
      console.log(`${term}: ${status} ${url}`);
      console.log(`  Size: ${text.length}`);
      const canonical = text.match(/<link rel="canonical"[^>]*href="([^"]+)"/i);
      if (canonical) console.log(`  Canonical: ${canonical[1]}`);
      // Extract product links - look at link elements in head too
      const allLinks = text.match(/<a[^>]*href="(https:\/\/www\.musik-produktiv\.de\/[a-z][a-z0-9-]+\.html)"[^>]*>/gi) || [];
      const productLinks = [...new Set(allLinks.map(l => l.match(/href="([^"]+)"/)[1]))]
        .filter(l => !l.includes('musikinstrumente') && !l.includes('musikhaus') && !l.includes('/service'));
      if (productLinks.length > 0) {
        console.log(`  Product links: ${productLinks.length}`);
        productLinks.slice(0, 5).forEach(l => console.log(`    ${l}`));
      }
      console.log('');
    } catch(e) {
      console.log(`${term}: Error: ${e.message}`);
    }
  }
})();
