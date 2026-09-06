const fs = require('fs');
const path = require('path');

const GUIDES = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const PRODUCTS = 'C:/Users/Daniel/projects/topmusiciangear/data/products.json';
const FIXDIR = 'C:/Users/Daniel/AppData/Local/Temp/opencode/es-fixes';
const DONE = path.join(FIXDIR, 'applied');
fs.mkdirSync(DONE, { recursive: true });

const guides = JSON.parse(fs.readFileSync(GUIDES, 'utf8'));
const products = JSON.parse(fs.readFileSync(PRODUCTS, 'utf8'));

function guideById(id) { return guides.find(g => g.id === id); }

// Collect all _es string values within an object, with a way to set-by-path
function collectEsValues(obj, prefix, out) {
  if (obj === null || obj === undefined) return;
  if (typeof obj === 'string') { if (prefix.endsWith('_es')) out.push({ prefix, value: obj }); return; }
  if (Array.isArray(obj)) { obj.forEach((v, i) => collectEsValues(v, prefix + '[' + i + ']', out)); return; }
  if (typeof obj === 'object') { Object.keys(obj).forEach(k => collectEsValues(obj[k], prefix ? prefix + '.' + k : k, out)); return; }
}

function tokenize(prefix) {
  const tokens = [];
  const re = /([^.\[]+)|\[(\d+)\]/g;
  let m;
  while ((m = re.exec(prefix)) !== null) {
    if (m[1]) tokens.push(m[1]);
    else tokens.push(parseInt(m[2], 10));
  }
  return tokens;
}

let total = 0, applied = 0, failed = 0, multi = 0;
const failures = [];

const fixFiles = fs.readdirSync(FIXDIR).filter(f => f.endsWith('.json'));
for (const ff of fixFiles) {
  const fixes = JSON.parse(fs.readFileSync(path.join(FIXDIR, ff), 'utf8'));
  for (const fx of fixes) {
    const { file, old, new: nw } = fx;
    if (typeof old !== 'string' || typeof nw !== 'string' || !old || old === nw) {
      failures.push({ file: ff, reason: 'invalid entry', fx }); failed++; continue;
    }
    total++;
    let root;
    let label;
    if (file === 'guides.json') {
      const g = guideById(fx.guide);
      if (!g) { failures.push({ file: ff, reason: 'guide not found: ' + fx.guide, old, new: nw }); failed++; continue; }
      root = g; label = 'guide:' + fx.guide;
    } else if (file === 'products.json') {
      const prod = products[fx.prod];
      if (!prod) { failures.push({ file: ff, reason: 'product index not found: ' + fx.prod, old, new: nw }); failed++; continue; }
      root = prod; label = 'prod:' + fx.prod;
    } else {
      failures.push({ file: ff, reason: 'unknown file ' + file, old, new: nw }); failed++; continue;
    }

    // Find matching es values
    const es = [];
    collectEsValues(root, '', es);
    const hits = es.filter(e => e.value.includes(old));
    if (hits.length === 0) {
      failures.push({ file: ff, reason: 'no match in ' + label, old, new: nw });
      failed++; continue;
    }
    for (const h of hits) {
      const tokens = tokenize(h.prefix);
      let cur = root;
      for (let i2 = 0; i2 < tokens.length; i2++) {
        const tok = tokens[i2];
        if (i2 === tokens.length - 1) cur[tok] = h.value.replace(old, nw);
        else cur = cur[tok];
      }
      applied++;
    }
    if (hits.length > 1) { multi++; console.log('MULTI-MATCH in ' + label + ' (' + hits.length + '): ' + old.slice(0, 60)); }
  }
  fs.renameSync(path.join(FIXDIR, ff), path.join(DONE, ff));
}

fs.writeFileSync(GUIDES, JSON.stringify(guides, null, 2), 'utf8');
fs.writeFileSync(PRODUCTS, JSON.stringify(products, null, 2), 'utf8');

console.log('\n=== APPLY DONE ===');
console.log('total fixes:', total, '| applied:', applied, '| failed:', failed, '| multi-match entries:', multi);
if (failures.length) {
  console.log('\n--- FAILURES ---');
  failures.forEach(f => console.log('[' + f.file + '] ' + f.reason + ' :: ' + String(f.old).slice(0, 90)));
}