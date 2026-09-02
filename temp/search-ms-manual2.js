const { chromium } = require('playwright');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
function ask(q) { return new Promise(r => rl.question(q, r)); }

(async () => {
  const browser = await chromium.launch({ headless: false, channel: 'chrome' });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1000 }
  });
  await context.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => undefined }); });
  const page = await context.newPage();

  console.log('Opening Music Store...');
  await page.goto('https://www.musicstore.com/en_OE/EUR', { waitUntil: 'domcontentloaded', timeout: 30000 });
  
  await ask('\n*** Solve the captcha in the browser, then press ENTER here to continue: ');
  await page.waitForTimeout(2000);
  
  const title = await page.title();
  console.log('Page title:', title);

  // Quick test search
  console.log('\nTesting search...');
  await page.goto('https://www.musicstore.com/en_OE/EUR/_search/?q=Sennheiser+HD+600', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(3000);
  
  const testResult = await page.evaluate(() => {
    const links = [...document.querySelectorAll('a[href*="art-"]')];
    return links.slice(0, 3).map(l => ({
      href: l.getAttribute('href'),
      text: l.textContent.trim().substring(0, 50)
    }));
  });
  console.log('Test search results:', JSON.stringify(testResult, null, 2));
  
  if (testResult.length === 0) {
    // Maybe need to solve another captcha on search page
    const pageText = await page.evaluate(() => document.body.innerText.substring(0, 200));
    console.log('Page text:', pageText);
    await ask('\n*** If there is another captcha, solve it and press ENTER: ');
    await page.waitForTimeout(2000);
  }

  // Now do all searches
  const searches = [
    [392, 'D16 Repeater Delay'],
    [61, 'TDR Kotelnikov GE'],
    [161, 'Sterling StingRay Ray4'],
    [162, 'Epiphone Thunderbird 60s'],
    [163, 'Sire Marcus Miller V5'],
    [164, 'Schecter Stiletto Stealth'],
    [177, 'Audeze LCD-MX4'],
    [222, 'ATC SCM25A'],
    [246, 'Elgato Wave XLR'],
    [251, 'Hollyland Lark M2'],
    [268, 'Sennheiser IE 900'],
    [277, 'Maono PD200X'],
    [278, 'FIFINE K688'],
    [279, 'FIFINE AM8'],
    [286, 'Audio-Technica AT2040USB'],
    [293, 'Yamaha THR10II'],
    [300, 'Kali WS-6.2'],
    [309, 'Squier Debut Stratocaster'],
    [317, 'Strandberg Boden Essential'],
    [326, 'Sire Marcus Miller V3'],
    [329, 'Rode Procaster'],
    [335, 'Korg SoundLink MW-1608'],
    [344, 'Deity S-Mic 3'],
    [350, 'Phenyx Pro PTM-10'],
    [352, 'Gretsch G9500 Jim Dandy'],
    [357, 'Gretsch Rancher Penguin'],
    [360, 'Sennheiser MKH 50'],
    [373, 'Oeksound Soothe3'],
    [374, 'Cableguys ShaperBox 3'],
    [376, 'Cableguys HalfTime'],
    [378, 'Sonnox VoxDoubler'],
    [379, 'Brainworx bx_console SSL 4000'],
    [380, 'Devious Machines Infiltrator 2'],
    [382, 'Plugin Boutique Scaler 3'],
    [385, 'Mastering The Mix MIXVAULT'],
    [387, 'Excite Audio Lifeline Expanse'],
    [388, 'Universal Audio Century Tube'],
    [389, 'Eventide H3000 Band Delays'],
    [390, 'Arturia Chorus JUN-6'],
    [391, 'Minimal Audio Cluster Delay'],
    [393, 'QuikQuak Pitchwheel'],
    [394, 'Excite Audio Motion Harmonic'],
    [411, 'Yamaha DM3 Standard'],
    [419, 'Sennheiser HD 280 PRO'],
    [420, 'Shure SRH440A'],
    [421, 'Focal Listen Professional'],
    [422, 'Sennheiser HD 600'],
    [423, 'Audio-Technica ATH-R70x'],
    [424, 'Neumann NDH 30'],
    [425, 'Hifiman Sundara'],
    [426, 'Sennheiser HD 560S'],
    [427, 'Audio-Technica ATH-R30x'],
    [428, 'Samson SR850'],
    [432, 'Elgato Wave DX'],
    [433, 'Samson Q9U'],
    [436, 'MAONO PD100'],
    [437, 'FIFINE K669D'],
    [439, 'HyperX SoloCast'],
    [450, 'Whirlwind IMP 2'],
  ];

  async function searchProduct(term) {
    try {
      const url = 'https://www.musicstore.com/en_OE/EUR/_search/?q=' + encodeURIComponent(term);
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForTimeout(2500);
      
      return await page.evaluate(() => {
        const links = [...document.querySelectorAll('a[href*="art-"]')];
        if (links.length === 0) return null;
        
        const link = links[0];
        const href = link.getAttribute('href');
        const artMatch = href.match(/art-([A-Z0-9-]+)/);
        if (!artMatch) return null;
        
        // Find price in the same container
        const item = link.closest('tr, li, .product-item, div[class*="product"], div[class*="item"]');
        if (item) {
          const pm = item.innerText.match(/€\s*([\d,.]+)/);
          if (pm) return { artCode: 'art-' + artMatch[1], price: pm[1] };
        }
        
        // Fallback: just return art code
        return { artCode: 'art-' + artMatch[1], price: null };
      });
    } catch (e) {
      return { error: e.message };
    }
  }

  const results = [];
  for (let i = 0; i < searches.length; i++) {
    const [btnId, term] = searches[i];
    const result = await searchProduct(term);
    if (result && result.artCode && !result.error) {
      console.log('[' + (i+1) + '] FOUND: BTN:' + btnId + ' | ' + term + ' -> ' + result.artCode + (result.price ? ' | EUR' + result.price : ' | no price'));
      results.push({ btnId, term, artCode: result.artCode, price: result.price });
    } else {
      console.log('[' + (i+1) + '] MISS: BTN:' + btnId + ' | ' + term);
    }
  }

  fs.writeFileSync('temp/ms-search-results.json', JSON.stringify(results, null, 2));
  console.log('\nFound:', results.length, 'of', searches.length);
  
  await browser.close();
  rl.close();
})();
