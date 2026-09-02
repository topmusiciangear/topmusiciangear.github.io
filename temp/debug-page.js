const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false, channel: 'chrome' });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 }
  });
  await context.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => undefined }); });
  const page = await context.newPage();

  console.log('Getting cookies...');
  await page.goto('https://www.musicstore.com/en_OE/EUR', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(8000);

  // SM58 page
  console.log('\n=== SM58 PAGE ===');
  await page.goto('https://www.musicstore.com/en_OE/EUR/Shure-SM-58-SE-with-Switch-dynamic-Microphone/art-PAH0000164-000', { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForTimeout(4000);

  const info = await page.evaluate(() => {
    const text = document.body.innerText;
    const lines = text.split('\n').filter(l => l.trim());
    
    // Find "Add to Cart" or "In den Warenkorb" and get the price before it
    const results = [];
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].match(/€\s*[\d,.]+/)) {
        const context = lines.slice(Math.max(0, i-3), i+4).join(' | ');
        results.push({ line: i, price: lines[i].trim(), context });
      }
    }
    
    // Also find the product title
    const title = document.querySelector('h1')?.textContent?.trim();
    
    return { title, priceLines: results.slice(0, 15) };
  });

  console.log('Title:', info.title);
  info.priceLines.forEach(p => {
    console.log(`\nLine ${p.line}: ${p.price}`);
    console.log(`Context: ${p.context}`);
  });

  await browser.close();
})();
