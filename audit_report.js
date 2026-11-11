const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
const products = JSON.parse(fs.readFileSync('data/products.json','utf8'));

const productById = new Map(products.map(p => [p.id, p]));
const productByTitle = new Map();
for (const p of products) {
  const key = p.title.toLowerCase();
  productByTitle.set(key, p);
  // also store title_es?
}

function findProductByName(name) {
  const n = name.toLowerCase();
  // exact match
  for (const p of products) {
    if (p.title.toLowerCase() === n) return p;
    if (p.title.toLowerCase().includes(n) || n.includes(p.title.toLowerCase())) {
      // prefer exact contains
      return p;
    }
  }
  return null;
}

function getProductIdsFromSections(guide) {
  const ids = new Set();
  if (!guide.sections) return ids;
  for (const s of guide.sections) {
    if (Array.isArray(s.products)) {
      for (const id of s.products) ids.add(id);
    }
  }
  return ids;
}

function getFeaturedIds(guide) {
  const ids = new Set();
  if (Array.isArray(guide.featuredProducts)) {
    for (const id of guide.featuredProducts) ids.add(id);
  }
  return ids;
}

function getVerdictProsConsIds(guide) {
  const ids = new Set();
  if (Array.isArray(guide.verdictProsCons)) {
    for (const v of guide.verdictProsCons) {
      const p = findProductByName(v.name);
      if (p) ids.add(p.id);
      else {
        // try name_es
        const p2 = findProductByName(v.name_es || '');
        if (p2) ids.add(p2.id);
      }
    }
  }
  // also check verdictSideBySide? maybe
  return ids;
}

function getProductTableIds(guide) {
  const ids = new Set();
  if (!guide.productTable) return ids;
  const cols = guide.productTable.columns || [];
  for (const col of cols) {
    const title = col.title || col.title_es;
    const p = findProductByName(title);
    if (p) ids.add(p.id);
  }
  return ids;
}

function setsEqual(a,b) {
  if (a.size !== b.size) return false;
  for (const v of a) if (!b.has(v)) return false;
  return true;
}

function setDiff(a,b) {
  const diff = new Set();
  for (const v of a) if (!b.has(v)) diff.add(v);
  return diff;
}

const slugs = [
'best-mic-for-podcasting',
'pro-interfaces_es',
'best-overdrive-distortion',
'guitar-bass-amps',
'best-synth-vsts',
'precision-vs-jazz',
'best-daw-for-beginners',
'best-beginner-electric-guitar',
'best-plugins',
'mixing-plugins',
'acoustic-guitars-guide_es',
'beginner-bass-guitars',
'guitar-pedals',
'best-microphone_es',
'best-piano-keyboard-vsts',
'beginner-guitar_es',
'best-microphone',
'best-headphones-for-mixing',
'vocal-plugins',
'best-reverb-delay',
'best-audio-repair-plugins',
'best-samplers-drum-computers',
'fender-guide',
'usb-mics_es',
'monitor-setup',
'best-guitar-plugins',
'best-bass-amps',
'channel-strip-plugins',
'best-headphones_es',
'best-multi-effects-pedals_es',
'best-looper-pedals',
'studio-subwoofers-setup',
'fender-bass-guide',
'guitar-bass-amps_es',
'streaming-interfaces',
'best-electric-guitar_es',
'best-ribbon-mics',
'best-synthesizers',
'best-synth-vsts_es',
'best-electric-guitars-2026_es',
'best-instrument-mics_es',
'best-nylon-guitars-for-beginners',
'di-box',
'kh750-vs-7050c_es',
'pro-daw',
'tuners-bass-guitar',
'open-headphones',
'portable-interfaces_es',
'best-digital-pianos_es'
];

const report = [];
for (const slug of slugs) {
  const guide = guides.find(g => g.id === slug);
  if (!guide) {
    report.push(`GUIDE NOT FOUND: ${slug}\n`);
    continue;
  }
  const sectionsIds = getProductIdsFromSections(guide);
  const featuredIds = getFeaturedIds(guide);
  const verdictIds = getVerdictProsConsIds(guide);
  const tableIds = getProductTableIds(guide);

  const allIds = new Set([...sectionsIds, ...featuredIds, ...verdictIds, ...tableIds]);
  const missingInProducts = [];
  for (const id of allIds) {
    if (!productById.has(id)) missingInProducts.push(id);
  }

  // mismatch counts
  const counts = {
    sections: sectionsIds.size,
    featured: featuredIds.size,
    verdict: verdictIds.size,
    table: tableIds.size
  };
  const distinctTotal = allIds.size;

  // off-topic detection
  const guideCat = (guide.category || '').toLowerCase();
  const offTopic = [];
  for (const id of allIds) {
    const p = productById.get(id);
    if (!p) continue;
    const pCat = (p.category || '').toLowerCase();
    // simple heuristic: category mismatch
    // If guide category is 'guitar' and product category is 'daw' etc.
    // Let's define a set of allowed categories per guide category mapping roughly
    // For now flag if product category is completely different family
    // We'll do a naive check: if guideCat contains 'guitar' and pCat includes 'daw', 'plugin', 'mic' etc.
    // We'll just flag when guideCat and pCat share no common keywords
    const guideKeywords = guideCat.split(/[-_]/);
    const prodKeywords = pCat.split(/[-_]/);
    const intersect = guideKeywords.some(gk => prodKeywords.some(pk => pk.includes(gk) || gk.includes(pk)));
    // also allow 'accessory' generally
    if (!intersect && pCat !== 'accessory' && pCat !== 'cable' && pCat !== 'stand') {
      // check title contains guide topic words? skip for now
      // heuristic: if guideCat is 'daw' and pCat is not 'daw' -> off topic
      // if guideCat is 'guitar' and pCat is 'daw' etc.
      // We'll just flag when categories differ completely
      if (guideCat && pCat && guideCat !== pCat) {
        // allow some overlaps
        const allowedPairs = {
          'guitar': ['guitar','bass','amp','pedal','accessory'],
          'bass': ['guitar','bass','amp','pedal','accessory'],
          'mic': ['mic','microphone','podcast'],
          'headphones': ['headphones','audio'],
          'plugins': ['plugin','vst','daw'],
          'daw': ['daw','plugin'],
          'interfaces': ['interface','audio','mixer'],
          'synth': ['synth','vst','plugin'],
          'amps': ['amp','guitar','bass']
        };
        const allowed = allowedPairs[guideCat] || [];
        if (!allowed.some(a => pCat.includes(a) || a.includes(pCat))) {
          offTopic.push({id, title:p.title, pCat});
        }
      }
    }
  }

  report.push(`=== ${slug} ===`);
  report.push(`Guide name: ${guide.title}`);
  report.push(`Category: ${guideCat}`);
  report.push(`Total distinct products referenced: ${distinctTotal}`);
  report.push(`Product IDs: ${Array.from(allIds).sort((a,b)=>a-b).join(', ')}`);
  report.push(`Counts -> sections:${counts.sections}, featured:${counts.featured}, verdict:${counts.verdict}, table:${counts.table}`);
  const mismatched = [];
  const sets = [
    {name:'sections', set:sectionsIds},
    {name:'featured', set:featuredIds},
    {name:'verdict', set:verdictIds},
    {name:'table', set:tableIds}
  ];
  for (let i=0;i<sets.length;i++) {
    for (let j=i+1;j<sets.length;j++) {
      if (!setsEqual(sets[i].set, sets[j].set)) {
        const diff1 = setDiff(sets[i].set, sets[j].set);
        const diff2 = setDiff(sets[j].set, sets[i].set);
        mismatched.push(`${sets[i].name} vs ${sets[j].name} differ. ${sets[i].name} only: ${Array.from(diff1).join(', ') || 'none'}; ${sets[j].name} only: ${Array.from(diff2).join(', ') || 'none'}`);
      }
    }
  }
  if (mismatched.length===0) report.push(`Mismatched counts: none`);
  else {
    report.push(`Mismatched counts:`);
    report.push(...mismatched);
  }
  if (missingInProducts.length>0) {
    report.push(`Missing products in data/products.json: ${missingInProducts.join(', ')}`);
  } else {
    report.push(`Missing products: none`);
  }
  if (offTopic.length>0) {
    report.push(`Off-topic products (${offTopic.length}):`);
    for (const ot of offTopic) {
      report.push(`  ID ${ot.id} - ${ot.title} [category: ${ot.pCat}]`);
    }
  } else {
    report.push(`Off-topic products: none`);
  }
  report.push('');
}

fs.writeFileSync('audit_report.txt', report.join('\n'));
console.log('Report written');
