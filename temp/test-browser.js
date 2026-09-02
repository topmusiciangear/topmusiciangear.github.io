const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    channel: 'chrome',
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-web-security'
    ]
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 },
    locale: 'en-US',
    timezoneId: 'Europe/Berlin'
  });
  
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    delete navigator.__proto__.webdriver;
  });
  
  const page = await context.newPage();
  
  // Test with SM57
  const url = 'https://www.musicstore.com/en_OT/EUR/Shure-SM-57-LCE-dynamic-Microphone/art-PAH0000162-000';
  console.log('Fetching:', url);
  
  try {
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    console.log('Status:', response.status());
    
    await page.waitForTimeout(5000);
    
    const title = await page.title();
    console.log('Title:', title);
    
    if (response.status() === 200) {
      // Try to find price
      const priceInfo = await page.evaluate(() => {
        // Try multiple selectors
        const selectors = [
          '.price--current',
          '.price__current', 
          '.product-price',
          '[class*="price"]',
          '.current-price',
          '.price'
        ];
        
        const results = {};
        for (const sel of selectors) {
          const els = document.querySelectorAll(sel);
          if (els.length > 0) {
            results[sel] = Array.from(els).map(e => ({
              text: e.textContent.trim().substring(0, 100),
              class: e.className
            })).slice(0, 5);
          }
        }
        
        // Also get all text with EUR
        const bodyText = document.body.innerText;
        const eurMatches = bodyText.match(/€\s*[\d,.]+/g);
        results.eurMatches = eurMatches ? eurMatches.slice(0, 10) : [];
        
        return results;
      });
      
      console.log('Price info:', JSON.stringify(priceInfo, null, 2));
    }
    
  } catch (e) {
    console.log('Error:', e.message);
  }
  
  await browser.close();
})();
