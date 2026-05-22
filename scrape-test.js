const fs = require('fs');

(async () => {
  // Test search on a few products to understand HTML structure
  const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

  // Products with MusikProduktiv search URLs
  const musik = products.filter(p =>
    p.stores.musikproduktiv === 'https://www.musik-produktiv.de/search'
  );
  console.log(`Total MusikProduktiv search URLs: ${musik.length}`);

  // Products without Bax Music URLs
  const bax = products.filter(p => !p.stores.baxmusic);
  console.log(`Total without Bax Music URLs: ${bax.length}`);

  // Test with first few products
  for (let i = 0; i < Math.min(3, musik.length); i++) {
    const p = musik[i];
    const url = `https://www.musik-produktiv.de/suche?q=${encodeURIComponent(p.title)}`;
    console.log(`\n--- Testing: ${p.title} ---`);
    console.log(`URL: ${url}`);
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
      });
      const html = await res.text();
      // Find hrefs pointing to .html files
      const linkRegex = /<a[^>]*href="([^"]+\.html)"[^>]*>/gi;
      let match;
      let count = 0;
      while ((match = linkRegex.exec(html)) !== null && count < 10) {
        const href = match[1];
        if (!href.startsWith('http')) continue;
        if (href.includes('/marke/') || href.includes('/kategorie/') || href.includes('/such?')) continue;
        console.log(`  Link: ${href}`);
        count++;
      }
      if (count === 0) console.log('  No product links found');
      // Show HTML snippet
      const snippetStart = Math.max(0, html.toLowerCase().indexOf('product') - 100);
      if (snippetStart > 0) {
        console.log('  HTML snippet around "product":');
        console.log(html.substring(snippetStart, snippetStart + 500));
      }
    } catch (e) {
      console.log(`  Error: ${e.message}`);
    }
  }
})();
