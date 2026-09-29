const fs = require('fs');
const src = fs.readFileSync('build-guides.js', 'utf8');

// Extract the TEST_SHOP_BTN object literal (ends with "\n};")
const start = src.indexOf('const TEST_SHOP_BTN = {');
if (start === -1) throw new Error('TEST_SHOP_BTN not found');
const endMark = src.indexOf('\n};', start);
const block = src.slice(start + 'const TEST_SHOP_BTN ='.length, endMark + 2);
const MAP = eval('(' + block + ')');

const all = [];
for (const [id, cfg] of Object.entries(MAP)) {
  const collect = (obj, kind) => {
    if (!obj || typeof obj !== 'object') return;
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v === 'string' && /[$£€]\s?[\d.,]+/.test(v)) {
        all.push({ id, kind, key: k, raw: v });
      } else if (v && typeof v === 'object') {
        collect(v, kind + '.' + k);
      }
    }
  };
  collect(cfg.prices, 'prices');
  collect(cfg.holly, 'holly');
}

let clean = 0, dec = 0, differ = 0, examples = [];
const diffList = [];
for (const p of all) {
  const m = p.raw.match(/([$£€])\s?([\d.,]+)/);
  if (!m) { continue; }
  const cur = m[1];
  const numStr = m[2];
  const centsStr = (numStr.split('.')[1] || '').replace(/\D/g, '');
  if (!numStr.includes('.')) { clean++; continue; }
  dec++;
  const val = parseFloat(numStr.replace(/,/g, ''));
  if (!isFinite(val)) { console.log('UNPARSED', p.id, p.key, p.raw); continue; }
  const floor = Math.floor(val);
  const round = Math.round(val);
  if (floor !== round) { differ++; diffList.push({ id: p.id, key: p.key, raw: p.raw, floor, round }); }
  if (examples.length < 6) examples.push(p.raw + ' -> floor ' + floor + ' / round ' + round);
}

console.log('TEST_SHOP_BTN entries:', Object.keys(MAP).length);
console.log('price strings found:', all.length);
console.log('  already integer (no decimals):', clean);
console.log('  have decimals to strip:', dec);
console.log('  floor != round (decimals >= .50):', differ);
console.log('\nsamples:');
examples.forEach(e => console.log('  ' + e));
console.log('\nfirst 15 where floor != round:');
diffList.slice(0, 15).forEach(d => console.log(`  id ${d.id} ${d.key}: ${d.raw}  -> floor ${d.floor} vs round ${d.round}`));
