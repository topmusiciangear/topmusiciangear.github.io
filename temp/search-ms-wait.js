const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: false, channel: 'chrome' });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1000 }
  });
  await context.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => undefined }); });
  const page = await context.newPage();

  console.log('Opening Music Store homepage...');
  console.log('SOLVE THE CAPTCHA IN THE BROWSER!');
  console.log('Waiting up to 3 minutes...');
  
  await page.goto('https://www.musicstore.com/en_OE/EUR', { waitUntil: 'domcontentloaded', timeout: 30000 });

  // Wait for Cloudflare - check every 2 seconds
  for (let i = 0; i < 90; i++) {
    await page.waitForTimeout(2000);
    const title = await page.title();
    if (!title.includes('moment') && !title.includes('Security') && title.length > 5) {
      console.log('Captcha solved! Title:', title);
      break;
    }
    if (i % 15 === 0 && i > 0) console.log('  Still waiting... (' + (i*2) + 's)');
  }
  
  await page.waitForTimeout(3000);

  // Verify we're past Cloudflare
  const testUrl = 'https://www.musicstore.com/en_OE/EUR/_search/?q=Sennheiser+HD+600';
  console.log('\nTesting search:', testUrl);
  await page.goto(testUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(3000);
  
  const testCount = await page.evaluate(() => document.querySelectorAll('a[href*="art-"]').length);
  console.log('Found', testCount, 'product links on search page');
  
  if (testCount === 0) {
    console.log('Still blocked. Exiting.');
    await browser.close();
    return;
  }

  // All searches
  const searches = [
    [392, 'D16 Repeater Delay'], [61, 'TDR Kotelnikov GE'], [161, 'Sterling StingRay Ray4'],
    [162, 'Epiphone Thunderbird 60s'], [163, 'Sire Marcus Miller V5'], [164, 'Schecter Stiletto Stealth'],
    [177, 'Audeze LCD-MX4'], [222, 'ATC SCM25A'], [246, 'Elgato Wave XLR'], [251, 'Hollyland Lark M2'],
    [268, 'Sennheiser IE 900'], [277, 'Maono PD200X'], [278, 'FIFINE K688'], [279, 'FIFINE AM8'],
    [286, 'AT2040USB'], [293, 'Yamaha THR10II'], [300, 'Kali WS-6.2'], [309, 'Squier Debut Stratocaster'],
    [317, 'Strandberg Boden Essential'], [326, 'Sire Marcus Miller V3'], [329, 'Rode Procaster'],
    [335, 'Korg SoundLink MW-1608'], [344, 'Deity S-Mic 3'], [350, 'Phenyx Pro PTM-10'],
    [352, 'Gretsch G9500 Jim Dandy'], [357, 'Gretsch Rancher Penguin'], [360, 'Sennheiser MKH 50'],
    [373, 'Oeksound Soothe3'], [374, 'Cableguys ShaperBox 3'], [376, 'Cableguys HalfTime'],
    [378, 'Sonnox VoxDoubler'], [379, 'Brainworx bx_console SSL'], [380, 'Devious Machines Infiltrator 2'],
    [382, 'Plugin Boutique Scaler 3'], [385, 'Mastering The Mix MIXVAULT'], [387, 'Excite Audio Lifeline Expanse'],
    [388, 'Universal Audio Century Tube'], [389, 'Eventide H3000 Band Delays'], [390, 'Arturia Chorus JUN-6'],
    [391, 'Minimal Audio Cluster Delay'], [393, 'QuikQuak Pitchwheel'], [394, 'Excite Audio Motion Harmonic'],
    [411, 'Yamaha DM3 Standard'], [419, 'Sennheiser HD 280 PRO'], [420, 'Shure SRH440A'],
    [421, 'Focal Listen Professional'], [422, 'Sennheiser HD 600'], [423, 'Audio-Technica ATH-R70x'],
    [424, 'Neumann NDH 30'], [425, 'Hifiman Sundara'], [426, 'Sennheiser HD 560S'],
    [427, 'Audio-Technica ATH-R30x'], [428, 'Samson SR850'], [432, 'Elgato Wave DX'],
    [433, 'Samson Q9U'], [436, 'MAONO PD100'], [437, 'FIFINE K669D'], [439, 'HyperX SoloCast'],
    [450, 'Whirlwind IMP 2'],
  ];

  async function search(term) {
    const url = 'https://www.musicstore.com/en_OE/EUR/_search/?q=' + encodeURIComponent(term);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(2500);
    return await page.evaluate(() => {
      const link = document.querySelector('a[href*="art-"]');
      if (!link) return null;
      const href = link.getAttribute('href');
      const m = href.match(/art-([A-Z0-9-]+)/);
      if (!m) return null;
      const item = link.closest('tr, li, div');
      const price = item ? (item.innerText.match(/EUR\s*([\d,.]+)/) || item.innerText.match(/€\s*([\d,.]+)/)) : null;
      return { art: 'art-' + m[1], price: price ? price[1] : null };
    });
  }

  const results = [];
  for (let i = 0; i < searches.length; i++) {
    const [btnId, term] = searches[i];
    try {
      const r = await search(term);
      if (r) {
        console.log('[' + (i+1) + '] BTN:' + btnId + ' | ' + term + ' -> ' + r.art + (r.price ? ' EUR' + r.price : ''));
        results.push({ btnId, art: r.art, price: r.price });
      } else {
        console.log('[' + (i+1) + '] MISS: BTN:' + btnId + ' | ' + term);
      }
    } catch (e) {
      console.log('[' + (i+1) + '] ERR: BTN:' + btnId + ' | ' + e.message.substring(0, 40));
    }
  }

  fs.writeFileSync('temp/ms-search-results.json', JSON.stringify(results, null, 2));
  console.log('\nFound:', results.length, 'of', searches.length);
  await browser.close();
})();
