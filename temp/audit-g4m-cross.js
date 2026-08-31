const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

function decodeAwinUrl(awinUrl) {
  try {
    const parsed = new URL(awinUrl);
    const ued = parsed.searchParams.get('ued');
    if (ued) return decodeURIComponent(ued);
  } catch(e) {}
  return awinUrl;
}

function extractG4MSlug(u) {
  try {
    const parsed = new URL(u);
    const path = parsed.pathname;
    const parts = path.split('/').filter(p => p);
    return parts[parts.length - 1] || '';
  } catch(e) { return ''; }
}

function extractG4MPathName(u) {
  try {
    const parsed = new URL(u);
    const parts = parsed.pathname.split('/').filter(p => p);
    // The product name is usually the second-to-last segment
    return parts.length >= 2 ? parts[parts.length - 2] : '';
  } catch(e) { return ''; }
}

// Category keywords in G4M URLs
const categoryKeywords = {
  'headphones': ['headphone', 'headphones', 'earphone', 'earphones', 'iems', 'in-ear'],
  'microphones': ['microphone', 'microphones', 'mic-', '-mic', 'mic/'],
  'monitors': ['monitor', 'monitors', 'subwoofer', 'subwoofers', 'speaker'],
  'interfaces': ['interface', 'interfaces', 'audio-interface'],
  'guitars': ['guitar', 'guitars', 'stratocaster', 'telecaster', 'les-paul', 'sg-', 'es-335'],
  'bass': ['bass-guitar', 'bass-guitars', 'precision-bass', 'jazz-bass'],
  'keyboards': ['keyboard', 'keyboards', 'synthesizer', 'synthesizers', 'piano', 'pianos', 'midi-controller'],
  'pedals': ['pedal', 'pedals', 'effects-pedal', 'distortion', 'overdrive', 'reverb-pedal', 'delay-pedal', 'loop-pedal'],
  'amps': ['amplifier', 'amplifiers', 'amp-', '-amp', 'combo', 'head-amplifier'],
  'live_sound': ['pa-speaker', 'pa-system', 'mixer', 'mixers', 'monitor', 'stage-monitor', 'subwoofer'],
  'plugins': ['plugin', 'plugins', 'software', 'bundle'],
  'drum-machine': ['drum', 'drums', 'sampler', 'groovebox'],
  'streaming': ['streaming', 'stream-deck', 'capture-card'],
  'accessories': ['cable', 'cables', 'stand', 'stands', 'bag', 'case', 'strap', 'picks', 'strings']
};

const g4mIssues = [];
products.forEach(p => {
  if (!p.stores || !p.stores.gear4music) return;
  const rawUrl = p.stores.gear4music;
  const decoded = decodeAwinUrl(rawUrl);
  const slug = extractG4MSlug(decoded);
  const pathName = extractG4MPathName(decoded);
  const slugLower = (slug + ' ' + pathName).toLowerCase();
  
  // Determine what the URL is for based on keywords
  const urlCategories = [];
  Object.entries(categoryKeywords).forEach(([cat, keywords]) => {
    if (keywords.some(kw => slugLower.includes(kw))) {
      urlCategories.push(cat);
    }
  });
  
  // Determine what the product actually is
  const productCategory = p.category || '';
  
  // Check for mismatches
  const mismatches = [];
  
  // Headphone URL for non-headphone product
  if (urlCategories.includes('headphones') && productCategory !== 'headphones' && productCategory !== 'in-ear-monitors') {
    mismatches.push(`URL is for headphones but product category is ${productCategory}`);
  }
  
  // Microphone URL for non-microphone product
  if (urlCategories.includes('microphones') && productCategory !== 'microphones' && productCategory !== 'stage-wireless' && productCategory !== 'shotgun' && productCategory !== 'instrument-mics') {
    mismatches.push(`URL is for microphone but product category is ${productCategory}`);
  }
  
  // Guitar URL for non-guitar product
  if (urlCategories.includes('guitars') && productCategory !== 'guitars' && productCategory !== 'acoustic-guitars') {
    mismatches.push(`URL is for guitar but product category is ${productCategory}`);
  }
  
  // Specific model number checks
  const titleLower = p.title.toLowerCase();
  
  // Check for known product swaps
  if (slugLower.includes('ath-m50x') && !titleLower.includes('ath-m50x') && !titleLower.includes('m50x')) {
    mismatches.push('URL contains ATH-M50x but product is different');
  }
  if (slugLower.includes('ath-m40x') && !titleLower.includes('ath-m40x') && !titleLower.includes('m40x')) {
    mismatches.push('URL contains ATH-M40x but product is different');
  }
  if (slugLower.includes('ath-m30x') && !titleLower.includes('ath-m30x') && !titleLower.includes('m30x')) {
    mismatches.push('URL contains ATH-M30x but product is different');
  }
  if (slugLower.includes('ath-m20x') && !titleLower.includes('ath-m20x') && !titleLower.includes('m20x')) {
    mismatches.push('URL contains ATH-M20x but product is different');
  }
  if (slugLower.includes('dt770') && !titleLower.includes('dt 770') && !titleLower.includes('dt770')) {
    mismatches.push('URL contains DT770 but product is different');
  }
  if (slugLower.includes('dt990') && !titleLower.includes('dt 990') && !titleLower.includes('dt990')) {
    mismatches.push('URL contains DT990 but product is different');
  }
  if (slugLower.includes('sm7b') && !titleLower.includes('sm7b')) {
    mismatches.push('URL contains SM7B but product is different');
  }
  if (slugLower.includes('sm58') && !titleLower.includes('sm58')) {
    mismatches.push('URL contains SM58 but product is different');
  }
  if (slugLower.includes('sm57') && !titleLower.includes('sm57')) {
    mismatches.push('URL contains SM57 but product is different');
  }
  if (slugLower.includes('k371') && !titleLower.includes('k371')) {
    mismatches.push('URL contains K371 but product is different');
  }
  if (slugLower.includes('mdr-7506') && !titleLower.includes('mdr-7506') && !titleLower.includes('mdr7506')) {
    mismatches.push('URL contains MDR-7506 but product is different');
  }
  if (slugLower.includes('hs8') && !titleLower.includes('hs8') && !titleLower.includes('hs 8')) {
    mismatches.push('URL contains HS8 but product is different');
  }
  if (slugLower.includes('hs5') && !titleLower.includes('hs5') && !titleLower.includes('hs 5')) {
    mismatches.push('URL contains HS5 but product is different');
  }
  if (slugLower.includes('rokit') && !titleLower.includes('rokit')) {
    mismatches.push('URL contains Rokit but product is different');
  }
  if (slugLower.includes('scarlett') && !titleLower.includes('scarlett')) {
    mismatches.push('URL contains Scarlett but product is different');
  }
  if (slugLower.includes('apollo') && !titleLower.includes('apollo')) {
    mismatches.push('URL contains Apollo but product is different');
  }
  if (slugLower.includes('volt') && !titleLower.includes('volt')) {
    mismatches.push('URL contains Volt but product is different');
  }
  
  if (mismatches.length > 0) {
    g4mIssues.push({
      id: p.id,
      title: p.title,
      brand: p.brand,
      category: productCategory,
      urlCategories,
      decodedUrl: decoded,
      slug,
      pathName,
      mismatches
    });
  }
});

console.log('=== GEAR4MUSIC CROSS-PRODUCT MISMATCHES ===');
console.log('Total issues:', g4mIssues.length);
g4mIssues.forEach(i => {
  console.log(`\nID ${i.id} | ${i.title} (${i.brand}) [${i.category}]`);
  console.log(`  URL path: ${i.pathName}`);
  i.mismatches.forEach(m => console.log(`  -> ${m}`));
});

fs.writeFileSync('temp/g4m-cross-mismatches.json', JSON.stringify(g4mIssues, null, 2));
