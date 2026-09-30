const fs = require('fs');

function blockEnd(src, open) {
  let d = 0, q = null;
  for (let i = open; i < src.length; i++) {
    const c = src[i];
    if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{') d++; else if (c === '}') { d--; if (d === 0) return i; }
  }
  throw new Error('llaves sin cerrar desde ' + open);
}
function ser(id, cfg) {
  const sections = [];
  if (cfg.prices) {
    const ks = Object.keys(cfg.prices);
    const L = ['    prices: {'];
    ks.forEach((k, n) => L.push('      ' + k + ': "' + cfg.prices[k] + '"' + (n === ks.length - 1 ? '' : ',')));
    L.push('    }');
    sections.push(L);
  }
  if (cfg.urls) {
    const ks = Object.keys(cfg.urls);
    const L = ['    urls: {'];
    ks.forEach((k, n) => L.push('      ' + k + ': "' + cfg.urls[k] + '"' + (n === ks.length - 1 ? '' : ',')));
    L.push('    }');
    sections.push(L);
  }
  if (cfg.oos) sections.push(['    oos: [' + cfg.oos.map(s => '"' + s + '"').join(', ') + ']']);
  return '  ' + id + ': {\n' + sections.map(s => s.join('\n')).join(',\n') + '\n  }';
}

const CH = {
  267: { prices: { amazon: '$419.99', zzounds: '$989.00', andertons: '£859.00', gear4music: '£875.00', musicstore: '€959.00' } },
  269: { prices: { amazon: '$989.00', zzounds: '$999.00', andertons: '£866.00', gear4music: '£902.00', musicstore: '€1,049.00' } },
};

const f = 'build-guides.js';
let b = fs.readFileSync(f, 'utf8');
for (const [id, cfg] of Object.entries(CH)) {
  const head = '\n  ' + id + ': {';
  const at = b.indexOf(head);
  if (at < 0) { console.log('  !! id ' + id + ' NO encontrado'); continue; }
  const open = at + 1 + ('  ' + id + ': ').length;
  const close = blockEnd(b, open);
  b = b.slice(0, at + 1) + ser(id, cfg) + b.slice(close + 1);
  console.log('id ' + id + ' -> ' + Object.keys(cfg.prices).map(k => k + '=' + cfg.prices[k]).join(' '));
}
fs.writeFileSync(f, b, 'utf8');

// ---- pb_verify_data ----
const pf = 'temp/pb_verify_data.js';
let t = fs.readFileSync(pf, 'utf8');
const anchor = '  // Lote 30/09/2026: Kontrol S61';
if (!t.includes("'267': {")) {
  const block = [
    '  // Shure PSM300 + SE846 Gen2 (30/09/2026).',
    "  '267': {",
    "    'prices.zzounds': ['$419.99', '$989.00'],",
    "    'prices.gear4music': ['\u00a3819.00', '\u00a3875.00'],",
    "    'prices.musicstore': ['\u20ac399.00', '\u20ac959.00']",
    '  },',
    "  '269': {",
    "    'prices.gear4music': ['\u00a3813', '\u00a3902.00']",
    '  },',
    ''
  ].join('\n');
  t = t.replace(anchor, block + anchor);
  fs.writeFileSync(pf, t, 'utf8');
  console.log('pb_verify_data.js: 267 + 269 autorizados');
}
