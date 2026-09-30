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
function patchBtn(map) {
  const f = 'build-guides.js';
  let b = fs.readFileSync(f, 'utf8');
  for (const [id, cfg] of Object.entries(map)) {
    const head = '\n  ' + id + ': {';
    const at = b.indexOf(head);
    if (at < 0) { console.log('  !! id ' + id + ' NO encontrado en TEST_SHOP_BTN'); continue; }
    const close = blockEnd(b, at + 1 + ('  ' + id + ': ').length);
    b = b.slice(0, at + 1) + ser(id, cfg) + b.slice(close + 1);
    console.log('  id ' + id + ' -> ' + Object.keys(cfg.prices).map(k => k + '=' + cfg.prices[k]).join(' '));
  }
  fs.writeFileSync(f, b, 'utf8');
}

// 1) RE-APLICAR Launchkey Mini 25 MK4 (id 324) — se perdio en un git checkout
patchBtn({
  324: { prices: { amazon: '$129.99', zzounds: '$129.99', andertons: '£99.00', gear4music: '£102.00', musicstore: '€99.00' } },
});

// 2) Sennheiser EW IEM G4 Stereo (id 349)
const pf = 'data/products.json';
const orig = fs.readFileSync(pf, 'utf8');
const P = JSON.parse(orig);
if (JSON.stringify(P, null, 2) + '\n' !== orig) { console.log('!! products.json round-trip difiere, abortando'); process.exit(1); }
const p349 = P.find(x => x.id === 349);
p349.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/Sennheiser-ew-IEM-G4-B-Wireless-Monitor-Set/art-PAH0019940-000';
fs.writeFileSync(pf, JSON.stringify(P, null, 2) + '\n', 'utf8');
console.log('  id 349 + stores.musicstore (PAH0019940-000, banda B)');

patchBtn({
  349: { prices: { amazon: '$1,090.00', zzounds: '$1,249.00', andertons: '£899.00', gear4music: '£881.00', musicstore: '€949.00' } },
});

// 3) pb_verify_data
const vf = 'temp/pb_verify_data.js';
let t = fs.readFileSync(vf, 'utf8');
if (!t.includes("'349': {")) {
  const anchor = '  // Lote 30/09/2026: Kontrol S61';
  const block = [
    '  // Sennheiser EW IEM G4 Stereo (30/09/2026) + Launchkey Mini re-aplicado.',
    "  '324': {",
    "    'prices.andertons': ['\u00a389.00', '\u00a399.00'],",
    "    'prices.gear4music': ['\u00a3115.00', '\u00a3102.00'],",
    "    'prices.musicstore': ['\u20ac111.00', '\u20ac99.00']",
    '  },',
    "  '349': {",
    "    'urls.musicstore': [undefined, 'https://www.musicstore.com/en_OE/EUR/Sennheiser-ew-IEM-G4-B-Wireless-Monitor-Set/art-PAH0019940-000'],",
    "    'prices.gear4music': ['\u00a3881', '\u00a3881.00'],",
    "    'prices.musicstore': ['\u20ac599.00', '\u20ac949.00']",
    '  },',
    ''
  ].join('\n');
  t = t.replace(anchor, block + anchor);
  fs.writeFileSync(vf, t, 'utf8');
  console.log('  pb_verify_data: 324 + 349 autorizados');
}
