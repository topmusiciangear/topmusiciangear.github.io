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
  
  // First visit homepage to get cookies
  console.log('Visiting homepage first...');
  try {
    await page.goto('https://www.musicstore.com/en_OT/EUR', { waitUntil: 'domcontentloaded', timeout: 30000 });
    console.log('Homepage status:', page.url());
    await page.waitForTimeout(8000);
    
    // Check if we passed cloudflare
    const title = await page.title();
    console.log('Homepage title:', title);
    
    if (!title.includes('moment') && !title.includes('403')) {
      // Now visit product page
      console.log('Visiting SM57 page...');
      await page.goto('https://www.musicstore.com/en_OT/EUR/Shure-SM-57-LCE-dynamic-Microphone/art-PAH0000162-000', { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(5000);
      
      const productTitle = await page.title();
      console.log('Product title:', productTitle);
      
      const bodyText = await page.evaluate(() => document.body.innerText);
      const eurMatches = bodyText.match(/€\s*[\d,.]+/g);
      console.log('EUR prices found:', eurMatches ? eurMatches.slice(0, 10) : 'none');
    } else {
      console.log('Still blocked by Cloudflare');
    }
    
  } catch (e) {
    console.log('Error:', e.message);
  }
  
  await browser.close();
})();
