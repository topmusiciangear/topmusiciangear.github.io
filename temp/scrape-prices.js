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
  
  // Function to get product price
  async function getProductPrice(url, name) {
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForTimeout(3000);
      
      const priceInfo = await page.evaluate(() => {
        // Get the main product price
        const priceEl = document.querySelector('.price--current, .product__price, .price__current, [itemprop="price"]');
        const mainPrice = priceEl ? priceEl.textContent.trim() : null;
        
        // Get all prices on page
        const allPrices = [];
        document.querySelectorAll('[class*="price"]').forEach(el => {
          const text = el.textContent.trim();
          if (text.includes('€')) allPrices.push(text.substring(0, 50));
        });
        
        // Get structured data
        const jsonLd = document.querySelector('script[type="application/ld+json"]');
        let structuredPrice = null;
        if (jsonLd) {
          try {
            const data = JSON.parse(jsonLd.textContent);
            if (data.offers) structuredPrice = data.offers.price || data.offers[0]?.price;
          } catch(e) {}
        }
        
        return { mainPrice, allPrices: allPrices.slice(0, 5), structuredPrice };
      });
      
      console.log(`${name}: structured=${priceInfo.structuredPrice} | main=${priceInfo.mainPrice}`);
      return priceInfo.structuredPrice || priceInfo.mainPrice;
    } catch (e) {
      console.log(`${name}: ERROR - ${e.message}`);
      return null;
    }
  }
  
  // Test batch of products
  const products = [
    { id: 1, name: 'SM7B', url: 'https://www.musicstore.com/en_OT/EUR/Shure-SM7B/art-REC0000211-000' },
    { id: 5, name: 'SM57', url: 'https://www.musicstore.com/en_OT/EUR/Shure-SM-57-LCE-dynamic-Microphone/art-PAH0000162-000' },
    { id: 6, name: 'Fender Am Pro II Strat', url: 'https://www.musicstore.com/en_OT/EUR/Fender-American-Professional-II-Strat-RW-3-Colour-Sunburst-/art-GIT0054130-000' },
    { id: 7, name: 'Gibson Les Paul 60s', url: 'https://www.musicstore.com/en_OT/EUR/Gibson-Les-Paul-Standard-60s-Unburst/art-GIT0049496-000' },
    { id: 15, name: 'Scarlett 2i2', url: 'https://www.musicstore.com/en_OT/EUR/Focusrite-Scarlett-2i2-4th-Gen/art-PCM0017719-000' },
  ];
  
  for (const p of products) {
    await getProductPrice(p.url, p.name);
  }
  
  await browser.close();
})();
