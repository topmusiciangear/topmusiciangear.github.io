// Reusable TEST_SHOP_BTN inspector: node temp/show_btn.js 53 54 ...
// PowerShell-safe (no inline -e with quotes/regex).
const fs = require('fs');

function loadMap(src, head) {
  const h = src.indexOf(head);
  if (h === -1) throw new Error('TEST_SHOP_BTN not found');
  const open = h + head.length;
  let d = 0, q = null, i = open;
  for (; i < src.length; i++) {
    const c = src[i];
    if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{') d++;
    else if (c === '}') { d--; if (d === 0) break; }
  }
  return eval('(' + src.slice(open, i + 1) + ')');
}

const MAP = loadMap(fs.readFileSync('build-guides.js', 'utf8'), 'const TEST_SHOP_BTN = ');
const ids = process.argv.slice(2);
if (!ids.length) {
  console.log('entradas totales: ' + Object.keys(MAP).length);
} else {
  for (const id of ids) {
    const e = MAP[id];
    console.log('--- id ' + id + ' ---');
    if (!e) { console.log('  (no existe)'); continue; }
    console.log('  prices: ' + JSON.stringify(e.prices || {}));
    if (e.pbCur) console.log('  pbCur : ' + JSON.stringify(e.pbCur));
    if (e.urls) console.log('  urls  : ' + JSON.stringify(e.urls, null, 2).split('\n').join('\n          '));
    if (e.oos) console.log('  oos   : ' + JSON.stringify(e.oos));
    if (e.na) console.log('  na    : ' + JSON.stringify(e.na));
    const extra = Object.keys(e).filter(k => !['prices', 'pbCur', 'urls', 'oos', 'na'].includes(k));
    if (extra.length) console.log('  otros : ' + JSON.stringify(Object.fromEntries(extra.map(k => [k, e[k]]))));
  }
}
