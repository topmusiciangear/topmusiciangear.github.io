const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

// Products found on Music Store - add URLs
const urlUpdates = [
  { key: 367, art: 'REC0014524-000', slug: 'Sennheiser-HD-600' },
  { key: 364, art: 'REC0012791-000', slug: 'Sennheiser-HD-280-Pro' },
  { key: 365, art: 'DJE0007915-000', slug: 'Shure-SRH-440A' },
  { key: 366, art: 'REC0013585-000', slug: 'Focal-Listen-Professional' },
  { key: 368, art: 'REC0011924-000', slug: 'Audio-Technica-ATH-R70X' },
  { key: 369, art: 'REC0016031-000', slug: 'Neumann-NDH-30' },
  { key: 372, art: 'REC0017032-000', slug: 'Audio-Technica-ATH-R30x' },
  { key: 370, art: 'REC0016471-000', slug: 'Hifiman-Sundara-Silver' },
  { key: 373, art: 'REC0006958-000', slug: 'Samson-SR850' },
  { key: 313, art: 'REC0014199-000', slug: 'Sennheiser-MKH-50-P48' },
  { key: 356, art: 'REC0016355-000', slug: 'Yamaha-DM3' },
  { key: 305, art: 'GIT0026425-000', slug: 'Gretsch-G9500-Jim-Dandy-Flat-Top-SB-RW-Fingerboard-2-Color-SB' },
  { key: 310, art: 'GIT0041094-000', slug: 'Gretsch-G5021WPE-Rancher-Penguin-Parlor-Acoustic-Electric' },
  { key: 126, art: 'BAS0010280-000', slug: 'Sterling-by-Music-Man-StingRay-Ray34PB-Trans-Black-Satin-' },
  { key: 127, art: 'BAS0003854-000', slug: 'Epiphone-Thunderbird-PRO-IV-Bass-NTO-Natural-Oil' },
  { key: 262, art: 'GIT0060102-000', slug: 'Squier-Sonic-Stratocaster-MN-2-Colour-Sunburst-' },
  { key: 253, art: 'REC0016365-000', slug: 'Kali-Audio-WS-6-2' },
  { key: 246, art: 'GIT0051341-000', slug: 'Yamaha-THR10II' },
  { key: 396, art: 'PAH0017031-000', slug: 'Whirlwind-IMP-2-Passive-Direct-Box' },
];

// 1. Add Music Store URLs to products.json
let urlCount = 0;
for (const u of urlUpdates) {
  const p = products[String(u.key)];
  if (!p) { console.log('SKIP key ' + u.key); continue; }
  if (!p.stores) p.stores = {};
  p.stores.musicstore = `https://www.musicstore.com/en_OE/EUR/${u.slug}/art-${u.art}`;
  urlCount++;
  console.log(`URL: key:${u.key} id:${p.id} | ${(p.title||p.desc||'').substring(0,40)}`);
}
fs.writeFileSync('data/products.json', JSON.stringify(products, null, 2));
console.log(`\n${urlCount} URLs added to products.json\n`);

// 2. Add musicstore prices to TEST_SHOP_BTN in build-guides.js
let bg = fs.readFileSync('build-guides.js', 'utf8');

const priceUpdates = [
  // btnId -> price
  { btn: 422, price: '€304.00' },
  { btn: 419, price: '€74.80' },
  { btn: 420, price: '€98.00' },
  { btn: 421, price: '€180.70' },
  { btn: 423, price: '€285.00' },
  { btn: 424, price: '€458.00' },
  { btn: 427, price: '€83.20' },
  { btn: 425, price: '€335.29' },
  // 428 (Samson SR850) - no price (OOS)
  { btn: 360, price: '€1,368.90' },
  { btn: 411, price: '€1,427.70' },
  { btn: 352, price: '€158.80' },
  { btn: 357, price: '€604.20' },
  // 161 (Sterling StingRay) - no price (OOS)
  // 162 (Epiphone Thunderbird) - no price (OOS)
  { btn: 309, price: '€189.00' },
  { btn: 300, price: '€503.40' },
  { btn: 293, price: '€333.00' },
  // 450 (Whirlwind IMP 2) - no price found
];

let priceCount = 0;
for (const u of priceUpdates) {
  const lineRegex = new RegExp(`^\\s+${u.btn}:\\s*\\{.*\\},?\\s*$`, 'm');
  const match = bg.match(lineRegex);
  
  if (match) {
    const line = match[0];
    if (line.includes('musicstore:')) {
      // Already has musicstore price - skip or update
      console.log(`SKIP BTN:${u.btn} - already has musicstore`);
    } else {
      // Add musicstore price before closing
      const newLine = line.replace(/\}[,]?\s*$/, `,musicstore:"${u.price}"}$1`);
      bg = bg.replace(line, newLine);
      priceCount++;
      console.log(`PRICE: BTN:${u.btn} + musicstore:${u.price}`);
    }
  } else {
    // Entry doesn't exist - add new one
    // Find the end of TEST_SHOP_BTN
    const endMatch = bg.match(/\n\s*\};\s*\n\s*\/\//);
    if (endMatch) {
      const insertPoint = bg.indexOf(endMatch[0]);
      const newEntry = `  ${u.btn}: {prices:{musicstore:"${u.price}"}},\n`;
      bg = bg.substring(0, insertPoint) + '\n' + newEntry + bg.substring(insertPoint);
      priceCount++;
      console.log(`NEW: BTN:${u.btn} musicstore:${u.price}`);
    }
  }
}

fs.writeFileSync('build-guides.js', bg);
console.log(`\n${priceCount} prices added to TEST_SHOP_BTN`);
