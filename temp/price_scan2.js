const fs = require('fs');
const src = fs.readFileSync('build-guides.js', 'utf8');
const start = src.indexOf('const TEST_SHOP_BTN = {');
const end = src.indexOf('\n};', start);
const MAP = eval('(' + src.slice(start + 'const TEST_SHOP_BTN ='.length, end + 2) + ')');

const all = [];
const collect = (obj, path, id) => {
  if (!obj || typeof obj !== 'object') return;
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'string' && /[$£€]/.test(v)) all.push({ id, path, key: k, raw: v });
    else if (v && typeof v === 'object') collect(v, path + '.' + k, id);
  }
};
for (const [id, cfg] of Object.entries(MAP)) { collect(cfg.prices, 'prices', id); collect(cfg.holly, 'holly', id); }

const odd = [];
const counts = {};
for (const p of all) {
  const s = p.raw;
  // anything that is NOT a plain "CUR number" (optionally with thousands commas)
  if (!/^[$£€]\s?\d{1,3}(,\d{3})*(\.\d{1,2})?$/.test(s.trim())) {
    odd.push(p);
  }
  // European style: dot as thousands sep followed by comma decimals
  if (/[$£€]\s?\d{1,3}\.\d{3}/.test(s)) odd.push({ ...p, note: 'EURO-THOUSANDS' });
  if (/[–—\/]|each|approx|from/i.test(s)) odd.push({ ...p, note: 'RANGE/TEXT' });
}
console.log('total price strings:', all.length);
console.log('non-standard format:', odd.length);
const seen = new Set();
for (const o of odd) {
  const k = o.raw;
  if (seen.has(k)) continue;
  seen.add(k);
  if (seen.size <= 40) console.log(`  [${o.note || 'FORMAT'}] id ${o.id} ${o.path}.${o.key} = ${JSON.stringify(o.raw)}`);
}
console.log('\ndistinct odd values:', seen.size);
