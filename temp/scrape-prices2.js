const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    channel: 'chrome'
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 }
  });
  
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
  });
  
  const page = await context.newPage();
  
  // Visit homepage first to get cookies
  await page.goto('https://www.musicstore.com/en_OT/EUR', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(8000);
  
  async function getProductPrice(url, name) {
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForTimeout(4000);
      
      const info = await page.evaluate(() => {
        const text = document.body.innerText;
        // Find the first price that looks like the product price
        // Look for "excl. VAT" or "Add to Cart" near a price
        const lines = text.split('\n').filter(l => l.trim());
        const priceLines = [];
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].match(/€\s*[\d,.]+/)) {
            priceLines.push({ line: i, text: lines[i].trim(), context: lines.slice(Math.max(0,i-2), i+3).join(' | ') });
          }
        }
        return priceLines.slice(0, 8);
      });
      
      console.log(`\n${name}:`);
      info.forEach(p => console.log(`  Line ${p.line}: ${p.text}`));
      if (info.length > 0) {
        console.log(`  Context: ${info[0].context}`);
      }
    } catch (e) {
      console.log(`${name}: ERROR - ${e.message}`);
    }
  }
  
  await getProductPrice('https://www.musicstore.com/en_OT/EUR/Shure-SM-57-LCE-dynamic-Microphone/art-PAH0000162-000', 'SM57');
  await getProductPrice('https://www.musicstore.com/en_OT/EUR/Shure-SM7B/art-REC0000211-000', 'SM7B');
  
  await browser.close();
})();
