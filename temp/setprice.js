// Uso: node temp/setprice.js <id> '<json>'
//   { "prices": {"musicstore":"\u20ac1,398.00"}, "addStores": {"musicstore":"URL"},
//     "removeExclude": ["gear4music"], "oos": ["gear4music"] }
// Lee los valores ACTUALES y calcula solo la autorizacion de lo que cambia.
const fs = require('fs');

const id = Number(process.argv[2]);
const arg = JSON.parse(fs.readFileSync(process.argv[3], 'utf8').replace(/^\uFEFF/, ''));

function blockEnd(src, open) {
  let d = 0, q = null;
  for (let i = open; i < src.length; i++) {
    const c = src[i];
    if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{') d++; else if (c === '}') { d--; if (d === 0) return i; }
  }
  throw new Error('llaves sin cerrar');
}
function ser(cfg) {
  const s = [];
  if (cfg.prices) {
    const ks = Object.keys(cfg.prices);
    const L = ['    prices: {'];
    ks.forEach((k, n) => L.push('      ' + k + ': "' + cfg.prices[k] + '"' + (n === ks.length - 1 ? '' : ',')));
    L.push('    }'); s.push(L);
  }
  if (cfg.urls) {
    const ks = Object.keys(cfg.urls);
    const L = ['    urls: {'];
    ks.forEach((k, n) => L.push('      ' + k + ': "' + cfg.urls[k] + '"' + (n === ks.length - 1 ? '' : ',')));
    L.push('    }'); s.push(L);
  }
  if (cfg.oos) s.push(['    oos: [' + cfg.oos.map(x => '"' + x + '"').join(', ') + ']']);
  return '  ' + id + ': {\n' + s.map(x => x.join('\n')).join(',\n') + '\n  }';
}

const bf = 'build-guides.js';
let b = fs.readFileSync(bf, 'utf8');
const head = '\n  ' + id + ': {';
const at = b.indexOf(head);
if (at < 0) { console.log('!! id ' + id + ' no esta en TEST_SHOP_BTN'); process.exit(1); }
const open = at + 1 + ('  ' + id + ': ').length;
const close = blockEnd(b, open);
const oldRaw = b.slice(open, close + 1);
const old = eval('(' + oldRaw + ')');

const next = { prices: Object.assign({}, old.prices || {}) };
for (const [k, v] of Object.entries(arg.prices || {})) next.prices[k] = v;
for (const k of arg.delPrices || []) delete next.prices[k];
if (arg.urls || old.urls) next.urls = Object.assign({}, old.urls || {}, arg.urls || {});
if (arg.oos) next.oos = arg.oos;

b = b.slice(0, at + 1) + ser(next) + b.slice(close + 1);
fs.writeFileSync(bf, b, 'utf8');

const auth = [];
for (const [k, v] of Object.entries(arg.prices || {})) {
  const o = (old.prices || {})[k];
  if (o !== v) auth.push(['prices.' + k, o, v]);
}
for (const k of arg.delPrices || []) {
  const o = (old.prices || {})[k];
  if (o !== undefined) auth.push(['prices.' + k, o, undefined]);
}
for (const [k, v] of Object.entries(arg.urls || {})) {
  const o = (old.urls || {})[k];
  if (o !== v) auth.push(['urls.' + k, o, v]);
}
if (arg.oos) auth.push(['oos', JSON.stringify(old.oos || null), JSON.stringify(arg.oos)]);

console.log('id ' + id + ' -> ' + Object.entries(arg.prices || {}).map(([k, v]) => k + ' ' + ((old.prices || {})[k] || '(nuevo)') + ' => ' + v).join(' | '));
if (arg.oos) console.log('         oos ' + JSON.stringify(old.oos || null) + ' => ' + JSON.stringify(arg.oos));

// ---- products.json ----
if (arg.addStores || arg.removeExclude) {
  const pf = 'data/products.json';
  const o2 = fs.readFileSync(pf, 'utf8');
  const P = JSON.parse(o2);
  if (JSON.stringify(P, null, 2) + '\n' !== o2) { console.log('!! round-trip products.json difiere, abortando'); process.exit(1); }
  const p = P.find(x => x.id === id);
  if (!p) { console.log('!! id ' + id + ' no existe en products.json'); process.exit(1); }
  for (const [k, v] of Object.entries(arg.addStores || {})) {
    const o = p.stores[k];
    if (o !== v) { auth.push(['urls.' + k, o, v]); p.stores[k] = v; }
  }
  if (arg.removeExclude && p.excludeStores) {
    const o = p.excludeStores.join(',');
    p.excludeStores = p.excludeStores.filter(s => !arg.removeExclude.includes(s));
    if (!p.excludeStores.length) delete p.excludeStores;
    auth.push(['excludeStores', o, p.excludeStores ? p.excludeStores.join(',') : undefined]);
  }
  fs.writeFileSync(pf, JSON.stringify(P, null, 2) + '\n', 'utf8');
  console.log('         products.json actualizado');
}

// ---- pb_verify_data ----
if (auth.length) {
  const vf = 'temp/pb_verify_data.js';
  let t = fs.readFileSync(vf, 'utf8');
  const marker = "\n  '" + id + "': {";
  // quitar autorizacion previa de este id para no duplicar
  let clean = t;
  let idx = clean.indexOf(marker);
  if (idx >= 0) {
    const oe = clean.indexOf('\n  },', idx);
    clean = clean.slice(0, idx) + clean.slice(oe + 4);
  }
  const lines = ["  // " + id + " actualizado (sesion en curso).", "  '" + id + "': {"];
  auth.forEach(([k, o, n], i) => {
    const q = (v) => v === undefined ? 'undefined' : "'" + String(v).replace(/'/g, "\\'") + "'";
    lines.push("    '" + k + "': [" + q(o) + ', ' + q(n) + ']' + (i === auth.length - 1 ? '' : ','));
  });
  lines.push('  },');
  const anchor = '  // Lote 30/09/2026: Kontrol S61';
  clean = clean.replace(anchor, lines.join('\n') + '\n' + anchor);
  fs.writeFileSync(vf, clean, 'utf8');
  console.log('         pb_verify: ' + auth.map(a => a[0]).join(', '));
}
