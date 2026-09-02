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

  // Visit DE homepage to get cookies + IVA region
  console.log('Getting cookies from DE homepage...');
  await page.goto('https://www.musicstore.com/de_DE/EUR', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(8000);
  console.log('Cookies obtained.\n');

  async function getProductPrice(url) {
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
      await page.waitForTimeout(3500);
      const info = await page.evaluate(() => {
        const text = document.body.innerText;
        const lines = text.split('\n').filter(l => l.trim());
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].match(/€\s*[\d,.]+/) && lines[i+1] && lines[i+1].includes('In den Warenkorb')) {
            return lines[i].trim();
          }
        }
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].match(/€\s*[\d,.]+/) && (lines[i+1]?.includes('Each') || lines[i+1]?.includes('Stück'))) {
            return lines[i].trim();
          }
        }
        for (const line of lines) {
          const m = line.match(/€\s*([\d,.]+)/);
          if (m) return '€ ' + m[1];
        }
        return null;
      });
      return info;
    } catch (e) {
      return 'ERROR';
    }
  }

  const products = [
    [1, 'SM7B', '/Shure-SM7B/art-REC0000211-000'],
    [5, 'SM57', '/Shure-SM-57-LCE-dynamic-Microphone/art-PAH0000162-000'],
    [6, 'Fender Am Pro II Strat', '/Fender-American-Professional-II-Strat-RW-3-Colour-Sunburst-/art-GIT0054130-000'],
    [7, 'Gibson LP 60s', '/Gibson-Les-Paul-Standard-60s-Unburst/art-GIT0049496-000'],
    [9, 'Ibanez RG550', '/Ibanez-Genesis-RG550-DY-Desert-Sun-Yellow/art-GIT0044595-000'],
    [10, 'PRS McCarty 594', '/PRS-McCarty-594-McCarty-Tobacco-Sunburst/art-GIT0063401-011'],
    [11, 'Nord Stage 4 88', '/Clavia-Nord-Stage-4-88/art-KEY0005756-000'],
    [13, 'Arturia KeyLab 61 Mk3', '/Arturia-KeyLab-Essential-61-Mk3-Black/art-SYN0008709-000'],
    [15, 'Scarlett 2i2', '/Focusrite-Scarlett-2i2-4th-Gen/art-PCM0017719-000'],
    [21, 'Adam A7V', '/Adam-Audio-A7V/art-REC0015972-000'],
    [22, 'Genelec 8040 BMM', '/Genelec-8040-BMM/art-REC0016882-000'],
    [23, 'DT 770 PRO', '/beyerdynamic-DT-770-PRO-80-Ohm-Closed-Studio-Headphones/art-REC0003047-000'],
    [24, 'HD 490 Pro', '/Sennheiser-HD-490-Pro/art-REC0016605-000'],
    [25, 'ATH-M50x', '/Audio-Technica-ATH-M50X/art-REC0011129-000'],
    [26, 'Sony MDR-7506', '/Sony-MDR-7506/art-REC0000388-000'],
    [28, 'Kontakt 8', '/Native-Instruments-Kontakt-8/art-PCM0018134-000'],
    [29, 'FabFilter Total', '/Fabfilter-FabFilter-Total-Bundle/art-PCM0014088-000'],
    [33, 'Roland TR-8S', '/Roland-TR-8S/art-SYN0006408-000'],
    [39, 'Aston Shield GN', '/Aston-Microphones-Shield-GN-Pop-Filter/art-REC0013559-000'],
    [42, 'SSL UF8', '/SSL-Solid-State-Logic-UF8/art-PCM0016763-000'],
    [51, 'MD 421 KOMPAKT', '/Sennheiser-MD-421-KOMPAKT/art-REC0016760-000'],
    [52, 'EV RE20', '/Electro-Voice-RE-20-Black/art-REC0016738-000'],
    [54, 'MOTU M2', '/MOTU-M2/art-PCM0016100-000'],
    [55, 'UA VOLT 2', '/Universal-Audio-VOLT-2/art-PCM0017063-000'],
    [56, 'DT 990 Pro X', '/beyerdynamic-DT-990-Pro-X/art-REC0016961-000'],
    [57, 'AKG K-371', '/AKG-K-371-Studio-Headphones-Black-/art-REC0014403-000'],
    [59, 'K&M 26722', '/Koenig-Meyer-26722-Monitor-stand/art-REC0016508-000'],
    [62, 'FabFilter Pro-Q 4', '/Fabfilter-Pro-Q-4-License-Code/art-PCM0018303-000'],
    [64, 'Fender Ultra II Strat', '/Fender-American-Ultra-II-Stratocaster-EB-Texas-Tea/art-GIT0061889-003'],
    [65, 'Fender Player II JM', '/Fender-Player-II-Jazzmaster-RW-3-Color-Sunburst/art-GIT0061908-001'],
    [66, 'Fender Player II PB', '/Fender-Player-II-Modified-Precision-Bass-RW-Harvest-Green-Metallic/art-BAS0012911-002'],
    [67, 'Fender Player JB', '/Fender-Player-Jazz-Bass-MN-3-Colour-Sunburst-/art-BAS0009834-000'],
    [71, 'Fender Blues Junior IV', '/Fender-Blues-Junior-IV-Black-/art-GIT0044445-000'],
  ];

  for (const [id, name, slug] of products) {
    const price = await getProductPrice('https://www.musicstore.com/de_DE/EUR' + slug);
    console.log(`ID:${id} | ${name} | ${price}`);
  }

  await browser.close();
})();
