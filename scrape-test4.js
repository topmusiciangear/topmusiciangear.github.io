const fs = require('fs');

(async () => {
  // Test the known product URL for Neumann
  let res = await fetch('https://www.musik-produktiv.de/neumann-u-87-ai.html', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  });
  let text = await res.text();
  console.log(`Neumann U 87 Ai: ${res.status}, size: ${text.length}`);
  const title = text.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] || 'N/A';
  console.log(`Title: ${title}`);
  // Check if it's a product page or a category/search page
  const hasPrice = text.includes('€') || text.includes('EUR');
  const hasAddToCart = text.includes('add_to_cart') || text.includes('addToCart') || text.includes('Warenkorb');
  const isProductDetail = text.includes('product-detail') || text.includes('productdetail') || text.includes('ProductDetail');
  console.log(`Has price: ${hasPrice}, Has add to cart: ${hasAddToCart}, Is product detail: ${isProductDetail}`);
  // Search for JSON data
  const jsonLD = text.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i);
  if (jsonLD) {
    try {
      const data = JSON.parse(jsonLD[1]);
      console.log('JSON-LD type:', data['@type']);
      console.log('JSON-LD name:', data.name);
      console.log('JSON-LD url:', data.url);
    } catch(e) {
      console.log('JSON-LD parse error:', e.message);
      console.log('JSON-LD snippet:', jsonLD[1].substring(0, 300));
    }
  }
  
  // Check for product page indicators
  console.log('\n=== Checking known working product pages ===');
  const knownGood = [
    'https://www.musik-produktiv.de/shure-sm7b.html',
    'https://www.musik-produktiv.de/shure-sm57.html',
    'https://www.musik-produktiv.de/focusrite-scarlett-2i2-4th-gen.html',
    'https://www.musik-produktiv.de/yamaha-hs-8.html',
  ];
  for (const url of knownGood) {
    const r = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    const html = await r.text();
    const t = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] || 'N/A';
    const ld = html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i);
    let ldType = 'N/A';
    if (ld) {
      try { ldType = JSON.parse(ld[1])['@type']; } catch(e) {}
    }
    console.log(`${url}: ${r.status} | Title: ${t.substring(0, 60)} | LD: ${ldType}`);
  }

  // Check the Neumann auto-generated URL by comparing to known product
  console.log('\n=== Detailed analysis of neumann-u-87-ai.html ===');
  const neumannRes = await fetch('https://www.musik-produktiv.de/neumann-u-87-ai.html', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  });
  const neumannHtml = await neumannRes.text();
  const neumannTitle = neumannHtml.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] || 'N/A';
  console.log(`Title: ${neumannTitle}`);
  const ld = neumannHtml.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i);
  if (ld) {
    console.log(`JSON-LD: ${ld[1].substring(0, 500)}`);
  }
  // Check if it's actually redirecting somewhere else
  console.log(`Redirected? ${neumannRes.redirected ? 'Yes to ' + neumannRes.url : 'No'}`);
  // Look for canonical URL
  const canonical = neumannHtml.match(/<link rel="canonical"[^>]*href="([^"]+)"/i);
  if (canonical) console.log(`Canonical: ${canonical[1]}`);
})();
