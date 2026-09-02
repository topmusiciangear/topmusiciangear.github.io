const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 }
  });
  
  // Remove webdriver flag
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false });
  });
  
  const page = await context.newPage();
  
  const url = 'https://www.musicstore.com/en_OT/EUR/Products/Studio-Recording/Microphones/Dynamic-Microphones/cat-MICROPHONES?Weed=REC0000211';
  console.log('Fetching:', url);
  
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(5000);
    
    const title = await page.title();
    console.log('Title:', title);
    
    // Get all price-like text
    const bodyText = await page.evaluate(() => document.body.innerText);
    const priceMatches = bodyText.match(/€[\d,.]+/g);
    console.log('Price matches:', priceMatches ? priceMatches.slice(0, 10) : 'none');
    
    // Check for specific price elements
    const priceInfo = await page.evaluate(() => {
      const selectors = [
        '.price', '.product-price', '[data-price]', '.current-price',
        '.price--current', '.price__current', '.pdp-price',
        '[class*="price"]', '[class*="Price"]'
      ];
      const results = {};
      for (const sel of selectors) {
        const els = document.querySelectorAll(sel);
        if (els.length > 0) {
          results[sel] = Array.from(els).map(e => e.textContent.trim()).slice(0, 3);
        }
      }
      return results;
    });
    console.log('Price elements:', JSON.stringify(priceInfo, null, 2));
    
  } catch (e) {
    console.log('Error:', e.message);
  }
  
  await browser.close();
})();
