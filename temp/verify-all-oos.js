const { chromium } = require('playwright');
const products = require('../data/products.json');
const fs = require('fs');

const oosIds = [22,39,57,59,67,100,101,102,104,116,119,125,138,139,145,148,150,154,157,166,201,209,215,216,231,271,303,304,330,354,372,396,402,403];

const targets = products.filter(p => oosIds.includes(p.id) && p.stores?.zzounds);

async function main() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' });
  const page = await ctx.newPage();
  
  const results = [];
  
  for (const p of targets) {
    try {
      const resp = await page.goto(p.stores.zzounds, { waitUntil: 'domcontentloaded', timeout: 20000 });
      const status = resp.status();
      const text = await page.textContent('body');
      const isOOS = /no longer available|out of stock|discontinued/i.test(text);
      const priceMatch = text.match(/\$[\d,]+(?:\.\d{2})?/);
      
      results.push({
        id: p.id,
        name: p.name,
        httpStatus: status,
        oos: isOOS,
        price: priceMatch ? priceMatch[0] : null,
      });
      
      const mark = isOOS ? 'OOS' : (priceMatch ? `IN STOCK ${priceMatch[0]}` : 'UNKNOWN');
      console.log(`ID ${p.id} "${p.name}": ${mark}`);
    } catch (e) {
      results.push({ id: p.id, name: p.name, error: e.message.substring(0, 100) });
      console.log(`ID ${p.id} "${p.name}": ERROR - ${e.message.substring(0, 80)}`);
    }
  }
  
  await browser.close();
  
  fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/oos-verify-all.json', JSON.stringify(results, null, 2));
  
  const inStock = results.filter(r => !r.oos && !r.error && r.price);
  const oos = results.filter(r => r.oos);
  const errors = results.filter(r => r.error);
  
  console.log(`\n=== SUMMARY ===`);
  console.log(`In stock (WRONG OOS flag - need fix): ${inStock.length}`);
  inStock.forEach(r => console.log(`  ID ${r.id} "${r.name}": ${r.price}`));
  console.log(`Confirmed OOS: ${oos.length}`);
  console.log(`Errors (couldn't check): ${errors.length}`);
}

main();
