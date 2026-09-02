const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const allProducts = JSON.parse(fs.readFileSync('temp/ms-slugs.json', 'utf8'));
  
  // Support batch start/end from args
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

  // Visit en_OE homepage first to get cookies
  console.log('Getting cookies from en_OE homepage...');
  await page.goto('https://www.musicstore.com/en_OE/EUR', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(8000);
  console.log('Cookies obtained. Starting scrape...\n');

  async function getProductPrice(slug) {
    const url = 'https://www.musicstore.com/en_OE/EUR/' + slug;
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
      await page.waitForTimeout(3000);
      const price = await page.evaluate(() => {
        const text = document.body.innerText;
        const lines = text.split('\n').filter(l => l.trim());
        // Find price with "Add to Cart" or "In den Warenkorb" nearby
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].match(/€\s*[\d,.]+/) && lines[i+1] && (lines[i+1].includes('Add to Cart') || lines[i+1].includes('In den Warenkorb'))) {
            return lines[i].trim();
          }
        }
        // Fallback: find price with "Each" or "Stück"
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].match(/€\s*[\d,.]+/) && (lines[i+1]?.includes('Each') || lines[i+1]?.includes('Stück'))) {
            return lines[i].trim();
          }
        }
        // Last fallback: first EUR price
        for (const line of lines) {
          const m = line.match(/€\s*([\d,.]+)/);
          if (m) return '€ ' + m[1];
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
    const status = price === 'ERROR' ? '❌' : '✅';
    console.log(`${status} [${batchStart + i + 1}/${allProducts.length}] ID:${p.id} | ${p.name} | ${price}`);
    results.push({ id: p.id, name: p.name, price, slug: p.slug });
    if (price === 'ERROR') errors++;
    
    // Small delay to avoid rate limiting
    if (i > 0 && i % 20 === 0) {
      console.log('  ... pausing 2s ...');
      await page.waitForTimeout(2000);
    }
  }

  // Save results
  const outPath = `temp/ms-prices-${batchStart}-${batchEnd}.json`;
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`\nDone. ${results.length} products scraped, ${errors} errors.`);
  console.log(`Saved to ${outPath}`);

  await browser.close();
})();
