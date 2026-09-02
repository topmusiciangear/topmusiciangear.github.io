const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const allProducts = JSON.parse(fs.readFileSync('temp/ms-slugs.json', 'utf8'));
  const batchStart = parseInt(process.argv[2]) || 0;
  const batchEnd = parseInt(process.argv[3]) || allProducts.length;
  const batch = allProducts.slice(batchStart, batchEnd);
  
  console.log(`Scraping products ${batchStart} to ${batchEnd - 1} (${batch.length} products)\n`);

  const browser = await chromium.launch({ headless: false, channel: 'chrome' });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 }
  });
  await context.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => undefined }); });
  const page = await context.newPage();

  console.log('Getting cookies from en_OE homepage...');
  await page.goto('https://www.musicstore.com/en_OE/EUR', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(8000);
  console.log('Cookies obtained.\n');

  async function getProductPrice(slug) {
    const url = 'https://www.musicstore.com/en_OE/EUR/' + slug;
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
      await page.waitForTimeout(3500);
      
      const price = await page.evaluate(() => {
        const text = document.body.innerText;
        const lines = text.split('\n').filter(l => l.trim());
        
        // Strategy 1: Find price with "Add to Cart" or "In den Warenkorb" on NEXT line
        for (let i = 0; i < lines.length - 1; i++) {
          const priceMatch = lines[i].match(/^€\s*([\d,.]+)\s*$/);
          if (priceMatch) {
            const nextLine = lines[i+1].trim();
            if (nextLine === 'Add to Cart' || nextLine === 'In den Warenkorb') {
              return '€ ' + priceMatch[1];
            }
          }
        }
        
        // Strategy 2: Find "Each" line with price before it, "Add to Cart" after
        for (let i = 0; i < lines.length - 2; i++) {
          if (lines[i+1]?.trim() === 'Each' && lines[i+2]?.trim() === 'Add to Cart') {
            const priceMatch = lines[i].match(/€\s*([\d,.]+)/);
            if (priceMatch) return '€ ' + priceMatch[1];
          }
        }
        
        // Strategy 3: Find price followed by "incl. VAT" within 3 lines
        for (let i = 0; i < lines.length; i++) {
          const priceMatch = lines[i].match(/^€\s*([\d,.]+)\s*$/);
          if (priceMatch) {
            for (let j = i+1; j < Math.min(i+4, lines.length); j++) {
              if (lines[j].includes('incl. VAT') || lines[j].includes('inkl. MwSt')) {
                return '€ ' + priceMatch[1];
              }
            }
          }
        }
        
        return null;
      });
      
      return price;
    } catch (e) {
      return 'ERROR';
    }
  }

  const results = [];
  let errors = 0;
  for (let i = 0; i < batch.length; i++) {
    const p = batch[i];
    const price = await getProductPrice(p.slug);
    const status = price === 'ERROR' ? '❌' : (price === null ? '⚠️' : '✅');
    console.log(`${status} [${batchStart + i + 1}/${allProducts.length}] ID:${p.id} | ${price || 'NOT FOUND'}`);
    results.push({ id: p.id, price, slug: p.slug });
    if (price === 'ERROR') errors++;
    
    if (i > 0 && i % 20 === 0) {
      console.log('  ... pausing 2s ...');
      await page.waitForTimeout(2000);
    }
  }

  const outPath = `temp/ms-prices-v2-${batchStart}-${batchEnd}.json`;
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`\nDone. ${results.length} products, ${errors} errors. Saved to ${outPath}`);

  await browser.close();
})();
