const { chromium } = require('playwright');
const products = require('../data/products.json');

// Get products with oos:["zzounds"] in TEST_SHOP_BTN
const TEST_SHOP_BTN_START = 361;
// We'll read TEST_SHOP_BTN from products.json store URLs instead
const zzOos = [
  1,2,3,11,37,38,39,42,61,62,87,101,104,115,119,130,139,164,200,211
];

// Get actual zzounds URLs
const targets = products
  .filter(p => zzOos.includes(p.id) && p.stores?.zzounds)
  .slice(0, 20);

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const results = [];
  
  for (const p of targets) {
    const url = p.stores.zzounds;
    try {
      const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      const status = resp.status();
      const text = await page.textContent('body');
      const isOOS = /no longer available|out of stock|discontinued/i.test(text);
      const hasPrice = /\$\d/.test(text);
      const priceMatch = text.match(/\$[\d,]+(?:\.\d{2})?/);
      
      results.push({
        id: p.id,
        title: p.name,
        url,
        status,
        oos: isOOS,
        hasPrice,
        price: priceMatch ? priceMatch[0] : null,
      });
      
      console.log(`ID ${p.id} "${p.name}": status=${status} oos=${isOOS} price=${priceMatch ? priceMatch[0] : 'N/A'}`);
    } catch (e) {
      results.push({ id: p.id, title: p.name, url, error: e.message.substring(0, 100) });
      console.log(`ID ${p.id} "${p.name}": ERROR ${e.message.substring(0, 80)}`);
    }
  }
  
  await browser.close();
  
  const fs = require('fs');
  fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/oos-verify.json', JSON.stringify(results, null, 2));
  console.log('Done.');
}

main();
