const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();
  
  // Test with one product - ID:1 Shure SM58
  const url = 'https://www.musicstore.com/en_OT/EUR/Products/Studio-Recording/Microphones/Dynamic-Microphones/cat-MICROPHONES?Weed=REC0000211';
  console.log('Fetching:', url);
  
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);
    
    // Try to find price
    const price = await page.evaluate(() => {
      const priceEl = document.querySelector('.price, .product-price, [data-price], .current-price');
      return priceEl ? priceEl.textContent.trim() : 'not found';
    });
    console.log('Price found:', price);
    
    // Get page title
    const title = await page.title();
    console.log('Title:', title);
    
    // Get all text containing EUR or price patterns
    const bodyText = await page.evaluate(() => document.body.innerText);
    const priceMatches = bodyText.match(/€[\d,.]+/g);
    console.log('Price matches:', priceMatches);
    
  } catch (e) {
    console.log('Error:', e.message);
  }
  
  await browser.close();
})();
