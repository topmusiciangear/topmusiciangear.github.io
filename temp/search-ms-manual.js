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

  // Visit homepage - wait for Cloudflare
  console.log('Opening Music Store homepage...');
  await page.goto('https://www.musicstore.com/en_OE/EUR', { waitUntil: 'domcontentloaded', timeout: 60000 });
  
  // Wait for Cloudflare challenge to complete
  console.log('Waiting for you to solve the captcha...');
  console.log('(Click the checkbox or solve any challenge in the browser)');
  
  // Wait until the page title changes from "Just a moment..." to the actual site
  try {
    await page.waitForFunction(() => {
      return !document.title.includes('moment') && !document.title.includes('Security');
    }, { timeout: 120000 }); // 2 minutes to solve
    console.log('Captcha solved! Page title:', await page.title());
  } catch (e) {
    console.log('Timeout waiting for captcha. Trying to continue anyway...');
  }
  
  await page.waitForTimeout(3000);

  // Now search for products
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
        // Find product links with art codes
        const links = document.querySelectorAll('a[href*="art-"]');
        for (const link of links) {
          const href = link.getAttribute('href');
          const artMatch = href.match(/art-([A-Z0-9-]+)/);
          if (artMatch) {
            // Find the product item container
            const item = link.closest('.product-item, .search-result-item, .item, li, tr');
            if (item) {
              const text = item.innerText;
              const priceMatch = text.match(/€\s*([\d,.]+)/);
              if (priceMatch) {
                return { 
                  artCode: 'art-' + artMatch[1], 
                  price: priceMatch[1],
                  name: link.textContent.trim().substring(0, 60)
                };
              }
            }
          }
        }
        
        // Fallback: scan all text
        const text = document.body.innerText;
        const lines = text.split('\n').filter(l => l.trim());
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes('art-')) {
            const artMatch = lines[i].match(/art-([A-Z0-9-]+)/);
            if (artMatch) {
              // Look for price nearby
              for (let j = i; j < Math.min(i + 10, lines.length); j++) {
                const pm = lines[j].match(/€\s*([\d,.]+)/);
                if (pm) return { artCode: 'art-' + artMatch[1], price: pm[1], name: '' };
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
      console.log('[' + (i+1) + '/' + searches.length + '] FOUND: BTN:' + btnId + ' | ' + term + ' -> ' + result.artCode + ' | EUR' + result.price);
      results.push({ btnId, term, artCode: result.artCode, price: result.price, name: result.name });
    } else {
      console.log('[' + (i+1) + '/' + searches.length + '] MISS: BTN:' + btnId + ' | ' + term);
    }
    
    // Small delay
    if (i > 0 && i % 10 === 0) await page.waitForTimeout(2000);
  }

  fs.writeFileSync('temp/ms-search-results.json', JSON.stringify(results, null, 2));
  console.log('\n=== SUMMARY ===');
  console.log('Found:', results.length, 'of', searches.length);
  console.log('Results saved to temp/ms-search-results.json');
  
  // Keep browser open for 5 seconds so user can see
  await page.waitForTimeout(5000);
  await browser.close();
})();
