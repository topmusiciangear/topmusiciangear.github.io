const fs = require('fs');
const { execSync } = require('child_process');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const F = BASE + 'build-guides.js';

const prev = execSync('git show HEAD~2:build-guides.js', { cwd: BASE, maxBuffer: 1 << 28 }).toString();
let s = fs.readFileSync(F, 'utf8');

function extractBlock(src, key) {
  const needle = '\n  ' + key + ': {';
  const i = src.indexOf(needle);
  if (i === -1) throw new Error(key + ' not found');
  const b = src.indexOf('{', i);
  let depth = 0, k = b;
  while (k < src.length) {
    if (src[k] === '{') depth++;
    else if (src[k] === '}') { depth--; if (depth === 0) break; }
    k++;
  }
  let end = k + 1;
  if (s[end] === ',') end++;
  return src.substring(i, end);
}

['666', '667', '668'].forEach(k => {
  if (s.indexOf('\n  ' + k + ': {') !== -1) { console.log(k + ' already present, skip'); return; }
  const blk = extractBlock(prev, k);
  const anchor = s.indexOf('\n  669: {');
  s = s.substring(0, anchor) + blk + s.substring(anchor);
  console.log('restored ' + k);
});

fs.writeFileSync(F, s);
new (require('vm').Script)(s, { filename: 'build-guides.js' });
console.log('SYNTAX OK');

// Final audit: compare key sets
function keys(src) {
  const i = src.indexOf('const TEST_SHOP_BTN = {');
  const j = src.indexOf('\n};', i);
  const m = src.substring(i, j).match(/^\s*(\d+)\s*:\s*\{/gm) || [];
  return m.map(x => parseInt(x.match(/\d+/)[0], 10));
}
const cur = keys(s);
const pv = keys(prev);
console.log('missing:', JSON.stringify(pv.filter(k => cur.indexOf(k) === -1)));
console.log('added:', JSON.stringify(cur.filter(k => pv.indexOf(k) === -1)));
console.log('total:', cur.length);

// Also fix AKG Lyra (669) Music Store URL -> must be en_OE/EUR (site rule)
const before = s;
s = s.replace('https://www.musicstore.com/en_US/USD/AKG-Lyra/art-REC0014609-000',
              'https://www.musicstore.com/en_OE/EUR/AKG-Lyra/art-REC0014609-000');
if (s !== before) { fs.writeFileSync(F, s); console.log('669 musicstore URL normalized to en_OE/EUR'); }

// Global check: any remaining en_US / musicstore.de Music Store URLs
const bad = s.match(/musicstore\.com\/(?!en_OE\/EUR)[a-zA-Z_]+\//g);
console.log('non en_OE/EUR musicstore URLs:', bad ? Array.from(new Set(bad)) : 'none');
const bad2 = s.match(/musicstore\.de/g);
console.log('musicstore.de refs:', bad2 ? bad2.length : 0);