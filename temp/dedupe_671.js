const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const F = BASE + 'build-guides.js';
let s = fs.readFileSync(F, 'utf8');

function findBlocks(src, key) {
  const out = [];
  const needle = '\n  ' + key + ': {';
  let i = src.indexOf(needle);
  while (i !== -1) {
    const b = src.indexOf('{', i);
    let depth = 0, k = b;
    while (k < src.length) {
      if (src[k] === '{') depth++;
      else if (src[k] === '}') { depth--; if (depth === 0) break; }
      k++;
    }
    let end = k + 1;
    if (src[end] === ',') end++;
    out.push({ start: i, end: end, text: src.substring(i, end) });
    i = src.indexOf(needle, i + 1);
  }
  return out;
}

const good = `
  671: {
    // Samson G-Track Pro: specs verified on samsontech.com, but not carried by any of
    // the 5 shops (zZounds / Andertons return 404, Gear4Music + Music Store have no
    // product page). No price or URL can be verified, so every store row shows as
    // unavailable rather than showing invented data.
    oos: ["amazon", "zzounds", "andertons", "gear4music", "musicstore"]
  },`;

const blocks = findBlocks(s, '671');
console.log('671 blocks found:', blocks.length);
blocks.forEach((b, i) => console.log('  [' + i + '] len=' + b.text.length + ' first40=' + JSON.stringify(b.text.substr(0, 40))));

// Remove every 671 block, then insert the correct one at the position of the first.
const first = blocks[0];
let out = s.substring(0, first.start) + good;
let cursor = first.end;
blocks.slice(1).forEach(b => {
  out += s.substring(cursor, b.start);
  cursor = b.end;
});
out += s.substring(cursor);

fs.writeFileSync(F, out);

const check = findBlocks(out, '671');
console.log('671 blocks after fix:', check.length);
console.log(check[0].text);

// syntax check
new Function('return 0');
const mod = require('module');
try {
  new (require('vm').Script)(out, { filename: 'build-guides.js' });
  console.log('SYNTAX OK');
} catch (e) {
  console.log('SYNTAX ERROR:', e.message);
}