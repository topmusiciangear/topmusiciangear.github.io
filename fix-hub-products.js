const fs = require('fs');

const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

// Build product lookup: id -> product
const productMap = {};
products.forEach(p => { productMap[p.id] = p; });

// Build a more flexible lookup: lowercased title -> id, brand+model -> id
const titleToId = {};
products.forEach(p => {
  titleToId[p.title.toLowerCase()] = p.id;
  // Also store just the model part (after brand)
  const model = p.title.replace(p.brand + ' ', '').toLowerCase();
  if (model !== p.title.toLowerCase()) {
    titleToId[model] = p.id;
  }
});

// Hubs to fix - for each, specify product IDs that should appear somewhere
const hubProductIds = {
  'best-monitors': [20, 19, 21],
  'best-headphones': [23, 24, 25, 26, 56],
  'best-headphones-for-mixing': [26],
  'best-interface': [16, 17, 54, 55],
  'best-plugins': [29, 30, 32, 120, 123],
  'guitar-bass-amps': [73, 75],
  'guitar-pedals': [96, 98, 99, 101, 136],
  'live-sound-pa': [105, 108, 152],
  'best-digital-mixers': [332, 138, 335, 148],
  'best-drum-machine': [256],
  'best-samplers-drum-computers': [256],
  'daw-guide': [113, 114, 115],
  'mics-for-creators': [194, 197, 253, 254, 250, 251],
  'best-mic-for-podcasting': [50, 329],
  'best-electric-guitar': [318, 319, 312]
};

const changes = [];

for (const guide of guides) {
  if (!hubProductIds[guide.id]) continue;
  
  for (let si = 0; si < guide.sections.length; si++) {
    const section = guide.sections[si];
    const heading = (section.heading || '').toLowerCase();
    const content = (section.content || '').toLowerCase();
    const headingEs = (section.heading_es || '').toLowerCase();
    const contentEs = (section.content_es || '').toLowerCase();
    const allText = heading + ' ' + content + ' ' + headingEs + ' ' + contentEs;
    
    for (const pid of hubProductIds[guide.id]) {
      const product = productMap[pid];
      if (!product) continue;
      
      // Check if product is mentioned in this section's text
      const titleLower = product.title.toLowerCase();
      const brandLower = product.brand.toLowerCase();
      
      // Extract model name (brand + model without brand prefix)
      const modelParts = product.title.split(' ');
      // For "KRK Rokit 7 G5" -> check "rokit 7 g5", "krk rokit"
      // For "Yamaha HS8" -> check "hs8", "yamaha hs8"
      
      let mentioned = false;
      
      // Check full title
      if (allText.includes(titleLower)) {
        mentioned = true;
      }
      
      // Check brand + model (skip brand prefix)
      if (!mentioned) {
        const model = product.title.replace(brandLower + ' ', '');
        if (allText.includes(model.toLowerCase())) {
          mentioned = true;
        }
      }
      
      // Check just model name (after brand)
      if (!mentioned) {
        const parts = product.title.split(' ');
        // Get everything after the first word (brand)
        const modelOnly = parts.slice(1).join(' ').toLowerCase();
        if (allText.includes(modelOnly)) {
          mentioned = true;
        }
      }
      
      // For specific products, add keyword aliases
      if (!mentioned) {
        const aliases = {
          'MDR-7506': ['mdr-7506', 'mdr 7506'],
          'ATH-M50x': ['ath-m50x', 'ath m50x', 'm50x'],
          'DT 770 Pro': ['dt 770', 'dt-770'],
          'DT 990 Pro': ['dt 990', 'dt-990'],
          'HD 490 Pro': ['hd 490', 'hd-490'],
          'KRK Rokit 7 G5': ['rokit 7', 'rokit 7 g5'],
          'Yamaha HS8': ['hs8', 'hs 8'],
          'Adam Audio A7V': ['a7v', 'adam a7v'],
          'SM58': ['sm58', 'sm 58'],
          'Procaster': ['procaster', 'pro-caster'],
          'TS9': ['ts9', 'ts 9'],
          'TU-3': ['tu-3', 'tu 3'],
          'GCB95': ['gcb95', 'gcb 95'],
          'Small Stone': ['small stone'],
          'MXR Phase 95': ['phase 95'],
          'Vox AC30': ['ac30', 'ac 30'],
          'Ampeg RB-210': ['rb-210', 'rb 210', 'ampeg rb'],
          'EV ZLX-12P-G2': ['zlx-12p', 'zlx 12p', 'zlx-12p-g2'],
          'Yamaha DXR12mkII': ['dxr12', 'dxr12mkii'],
          'Stagepas 1K': ['stagepas 1k', 'stagepas'],
          'Tascam Model 12': ['model 12', 'tascam model'],
          'X32 Compact': ['x32 compact', 'x32'],
          'Korg MW-1608': ['mw-1608', 'mw 1608'],
          'M32R': ['m32r', 'm32 r'],
          'MPC One G2': ['mpc one g2', 'mpc one'],
          'Pro Tools': ['pro tools'],
          'Cubase': ['cubase'],
          'Reason': ['reason'],
          'MV7+': ['mv7+'],
          'PodMic': ['podmic'],
          'QuadCast 2': ['quadcast 2', 'quadcast'],
          'DJI Mic Mini': ['djI mic mini', 'mic mini'],
          'Wireless PRO': ['wireless pro'],
          'Hollyland Lark M2': ['lark m2', 'hollyland lark'],
          'AZ2402': ['az2402'],
          'ESP E-II': ['e-ii', 'eii'],
          'PRS SE': ['prs se'],
          'FabFilter Total': ['fabfilter total'],
          'Ozone 12': ['ozone 12', 'ozone'],
          'Soundtoys 5.5': ['soundtoys 5.5', 'soundtoys'],
          'Melodyne': ['melodyne'],
          'Komplete 26': ['komplete 26', 'komplete'],
          'Apollo Twin X': ['apollo twin x', 'apollo twin'],
          'RME Babyface': ['babyface', 'rme babyface'],
          'MOTU M2': ['motu m2', 'm2'],
          'Volt 2': ['volt 2']
        };
        
        const key = product.title.split(' ').slice(-1)[0]; // last word
        const aliasList = aliases[product.title] || [];
        for (const alias of aliasList) {
          if (allText.includes(alias.toLowerCase())) {
            mentioned = true;
            break;
          }
        }
      }
      
      if (!mentioned) continue;
      
      // Check if product is already in this section's products array
      if (section.products && section.products.includes(pid)) continue;
      
      // Add to this section's products array
      if (!section.products) section.products = [];
      section.products.push(pid);
      changes.push({
        guide: guide.id,
        sectionIndex: si,
        sectionHeading: section.heading.substring(0, 80),
        productId: pid,
        productTitle: product.title
      });
    }
  }
}

// Write back
fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');

console.log(`\nTotal changes: ${changes.length}\n`);
changes.forEach(c => {
  console.log(`[${c.guide}] Section ${c.sectionIndex} "${c.sectionHeading}" → added product ${c.productId} (${c.productTitle})`);
});

// Also verify: check all hubs for products mentioned in text but missing from ALL sections
console.log('\n=== VERIFICATION ===');
for (const guide of guides) {
  if (!hubProductIds[guide.id]) continue;
  
  for (const pid of hubProductIds[guide.id]) {
    const product = productMap[pid];
    if (!product) continue;
    
    const inSomeSection = guide.sections.some(s => s.products && s.products.includes(pid));
    if (!inSomeSection) {
      console.log(`WARNING: ${guide.id} - product ${pid} (${product.title}) NOT in any section!`);
    }
  }
}
