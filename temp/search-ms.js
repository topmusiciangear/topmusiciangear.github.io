const { chromium } = require('playwright');
const fs = require('fs');

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
  console.log('Ready.\n');

  // Products to search (btnId, searchTerm)
  const searches = [
    [392, 'D16 Repeater'],
    [61, 'TDR Kotelnikov'],
    [161, 'Sterling StingRay Ray4'],
    [162, 'Epiphone Thunderbird'],
    [163, 'Sire Marcus Miller V5'],
    [164, 'Schecter Stiletto'],
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
    [374, 'Cableguys ShaperBox'],
    [376, 'Cableguys HalfTime'],
    [378, 'Sonnox VoxDoubler'],
    [379, 'Brainworx bx_console SSL'],
    [380, 'Devious Machines Infiltrator'],
    [382, 'Plugin Boutique Scaler 3'],
    [385, 'Mastering The Mix MIXVAULT'],
    [387, 'Excite Audio Lifeline Expanse'],
    [388, 'Universal Audio Century Tube'],
    [389, 'Eventide H3000 Band Delays'],
    [390, 'Arturia Chorus JUN-6'],
    [391, 'Minimal Audio Cluster Delay'],
    [393, 'QuikQuak Pitchwheel'],
    [394, 'Excite Audio Motion Harmonic'],
    [411, 'Yamaha DM3'],
    [419, 'Sennheiser HD 280 PRO II'],
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
      const searchUrl = 'https://www.musicstore.com/en_OE/EUR/_search/?q=' + encodeURIComponent(term);
      await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForTimeout(3000);
      
      const result = await page.evaluate(() => {
        const text = document.body.innerText;
        const lines = text.split('\n').filter(l => l.trim());
        
        // Find first product with EUR price
        for (let i = 0; i < lines.length; i++) {
          const priceMatch = lines[i].match(/^€\s*([\d,.]+)\s*$/);
          if (priceMatch) {
            // Look backwards for product name and link
            for (let j = i - 1; j >= Math.max(0, i - 5); j--) {
              // Check for art code in nearby text
              const artMatch = lines[j]?.match(/art-[A-Z0-9-]+/);
              if (artMatch) return { price: priceMatch[1], artCode: artMatch[0] };
            }
          }
        }
        
        // Try to find product links
        const links = document.querySelectorAll('a[href*="art-"]');
        for (const link of links) {
          const href = link.getAttribute('href');
          const artMatch = href.match(/art-([A-Z0-9-]+)/);
          if (artMatch) {
            // Find price near this link
            const parent = link.closest('.product-item, .search-result, tr, li, div');
            if (parent) {
              const priceEl = parent.querySelector('[class*="price"]');
              if (priceEl) {
                const pm = priceEl.textContent.match(/€\s*([\d,.]+)/);
                if (pm) return { price: pm[1], artCode: 'art-' + artMatch[1], url: href };
              }
            }
          }
        }
        
        return null;
      });
      
      return result;
    } catch (e) {
      return { error: e.message };
    }
  }

  const results = [];
  for (let i = 0; i < searches.length; i++) {
    const [btnId, term] = searches[i];
    const result = await searchProduct(term);
    if (result && result.artCode && !result.error) {
      console.log('[' + (i+1) + '/' + searches.length + '] BTN:' + btnId + ' | ' + term + ' -> ' + result.artCode + ' | EUR' + result.price);
      results.push({ btnId, term, artCode: result.artCode, price: result.price });
    } else {
      console.log('[' + (i+1) + '/' + searches.length + '] BTN:' + btnId + ' | ' + term + ' -> NOT FOUND');
    }
    
    if (i > 0 && i % 10 === 0) {
      console.log('  ... pausing ...');
      await page.waitForTimeout(2000);
    }
  }

  fs.writeFileSync('temp/ms-search-results.json', JSON.stringify(results, null, 2));
  console.log('\nFound:', results.length, 'of', searches.length);
  await browser.close();
})();
