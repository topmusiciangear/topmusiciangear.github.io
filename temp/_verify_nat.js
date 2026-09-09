const fs = require('fs');
const orig = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const chunks = [1, 2, 3, 4, 5, 6].map(n => JSON.parse(fs.readFileSync('temp/_nat_chunk' + n + '.json', 'utf8')));
const byId = {};
chunks.forEach(a => a.forEach(g => { if (byId[g.id]) { throw new Error('duplicate id ' + g.id); } byId[g.id] = g; }));

const priceRe = /\$\s?\d[\d,\.]*|€\s?\d[\d,\.]*|£\s?\d[\d,\.]*|\d[\d,\.]*(?:\.\d{2})?\s*(?:USD|EUR|GBP)/g;
const urlRe = /https?:\/\/[^\s"'<>\\]+/g;

function collectTokens(s) {
  const out = { prices: [], urls: [] };
  (s.match(priceRe) || []).forEach(t => out.prices.push(t));
  (s.match(urlRe) || []).forEach(t => out.urls.push(t));
  return out;
}

function cmpTokens(a, b, loc) {
  const errs = [];
  if (JSON.stringify(a.prices) !== JSON.stringify(b.prices)) errs.push(loc + ' PRICES changed: ' + JSON.stringify(a.prices) + ' vs ' + JSON.stringify(b.prices));
  if (JSON.stringify(a.urls) !== JSON.stringify(b.urls)) errs.push(loc + ' URLS changed: ' + JSON.stringify(a.urls) + ' vs ' + JSON.stringify(b.urls));
  return errs;
}

function collect(o) {
  const out = { prices: [], urls: [], keys: [] };
  (function walk(x, p) {
    if (x === null || x === undefined) return;
    if (typeof x === 'string') { const t = collectTokens(x); out.prices = out.prices.concat(t.prices); out.urls = out.urls.concat(t.urls); return; }
    if (Array.isArray(x)) x.forEach((v, i) => walk(v, p + '[' + i + ']'));
    else Object.keys(x).forEach(k => { out.keys.push(p + '.' + k); walk(x[k], p + '.' + k); });
  })(o, '');
  return out;
}

let errs = [];
let idsChecked = 0;
orig.forEach(og => {
  const ng = byId[og.id];
  if (!ng) { errs.push('MISSING in chunks: ' + og.id); return; }
  idsChecked++;
  const a = collect(og); const b = collect(ng);
  errs = errs.concat(cmpTokens(a, b, og.id));
  const aKeys = a.keys.sort(); const bKeys = b.keys.sort();
  if (JSON.stringify(aKeys) !== JSON.stringify(bKeys)) {
    const onlyA = aKeys.filter(k => !bKeys.includes(k));
    const onlyB = bKeys.filter(k => !aKeys.includes(k));
    errs.push(og.id + ' KEY STRUCTURE differs. only-orig:[' + onlyA.join(',') + '] only-new:[' + onlyB.join(',') + ']');
  }
});
console.log('Guides checked:', idsChecked, '/', orig.length);
console.log(errs.length ? 'ERRORS:\n' + errs.join('\n') : 'TOKEN/KEY VERIFICATION: ALL CLEAN');