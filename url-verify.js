const fs = require('fs');

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

(async () => {
  const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

  // Test what a product page vs 404 looks like
  const testUrls = [
    { url: 'https://www.musik-produktiv.de/shure-sm7b.html', desc: 'known product page' },
    { url: 'https://www.musik-produktiv.de/this-does-not-exist-12345.html', desc: 'known 404' },
  ];

  for (const { url, desc } of testUrls) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
        redirect: 'manual'
      });
      const text = await res.text();
      console.log(`${desc}: ${url}`);
      console.log(`  Status: ${res.status}`);
      console.log(`  Size: ${text.length}`);
      const hasProduct = text.includes('product') || text.includes('Preis') || text.includes('Auf Lager');
      console.log(`  Has product content: ${hasProduct}`);
      const is404 = text.includes('404') || text.includes('Seite nicht gefunden');
      console.log(`  Is 404: ${is404}`);
      console.log(`  Title snippet: ${text.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] || 'N/A'}`);
      console.log('');
    } catch (e) {
      console.log(`${desc}: Error: ${e.message}`);
    }
  }

  // Now generate candidate URLs for MusikProduktiv products
  console.log('\n=== Testing generated MusikProduktiv URLs ===\n');
  const musikProducts = products.filter(p =>
    p.stores.musikproduktiv === 'https://www.musik-produktiv.de/search'
  );
  
  // Test a sample
  const samples = musikProducts.slice(0, 10);
  for (const p of samples) {
    const slug = slugify(p.title);
    const url = `https://www.musik-produktiv.de/${slug}.html`;
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
        redirect: 'manual'
      });
      const text = await res.text();
      const isProductPage = !text.includes('Seite nicht gefunden') && !text.includes('404') && res.status === 200;
      console.log(`${p.title}`);
      console.log(`  ${url} => ${res.status} ${isProductPage ? '✅' : '❌'}`);
      if (isProductPage) {
        const titleMatch = text.match(/<title[^>]*>([^<]+)<\/title>/i);
        console.log(`  Page title: ${titleMatch?.[1] || 'N/A'}`);
      }
    } catch (e) {
      console.log(`${p.title}: Error: ${e.message}`);
    }
  }

  // Also test Bax Music product URL generation
  console.log('\n=== Testing Bax Music URLs ===\n');
  const baxProducts = products.filter(p => !p.stores.baxmusic);
  const baxSamples = baxProducts.slice(0, 5);
  for (const p of baxSamples) {
    // Bax Shop URL pattern: https://www.bax-shop.co.uk/<category>/<slug>
    const slug = slugify(p.title);
    const url = `https://www.bax-shop.co.uk/${slug}`;
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
        redirect: 'manual'
      });
      const text = await res.text();
      const isProduct = res.status === 200 && text.length > 1000;
      console.log(`${p.title}`);
      console.log(`  ${url} => ${res.status} ${isProduct ? '✅' : '❌'}`);
      if (res.status === 200) {
        console.log(`  Size: ${text.length}`);
      }
    } catch (e) {
      console.log(`${p.title}: Error: ${e.message}`);
    }
  }
})();
