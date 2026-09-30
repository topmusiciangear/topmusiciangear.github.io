const fs = require('fs');
const sb = fs.readFileSync('js/shop-buttons.js', 'utf8');

// extraer bloque de un id del mapa generado
function blk(id) {
  const h = sb.indexOf('\n  ' + id + ': {');
  if (h < 0) return null;
  let d = 0, q = null;
  for (let i = h + 1; i < sb.length; i++) {
    const c = sb[i];
    if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{') d++; else if (c === '}') { d--; if (d === 0) return sb.slice(h, i + 1); }
  }
  return null;
}

let fail = 0;
// id -> [ tokens que DEBEN estar, tokens viejos que NO deben ]
const CHECK = {
  14:   { must: ["£699.00", 'oos', 'andertons'], not: ['£595.00'] },
  143:  { must: ["£1,469.00", '£1,594.00', '€1,679.00'], not: ['£1,525.00', '£1,634.00', '€1,999.00'] },
  324:  { must: ['£99.00', '£102.00', '€99.00'], not: ['£89.00', '£115.00', '€111.00'] },
  370:  { must: ['£315.00', '£319.00', '€349.00'], not: ['£310.00', '£305.00', '€339.00'] },
  475:  { must: ['€319.00', 'oos'], not: ['€289.00'] },
  476:  { must: ['oos'], not: [] },
  477:  { must: ['£1,099.00', '£1,058.00', '€1,299.00'], not: ['£1,199.00', '£1,014.00', '€1,269.00'] },
  478:  { must: ['$1,499.00', '€1,459.00'], not: ['$1,699.99', '€1,499.00'] },
  267:  { must: ['$989.00', '£875.00', '€959.00'], not: ['€399.00'] },
  269:  { must: ['£902.00'], not: ['£813'] },
};

console.log('=== js/shop-buttons.js (fuente de precios) ===');
for (const [id, c] of Object.entries(CHECK)) {
  const b = blk(id);
  if (!b) { console.log('  !! id ' + id + ' AUSENTE del mapa'); fail++; continue; }
  const bad = [];
  for (const m of c.must) if (!b.includes(m)) bad.push('falta ' + m);
  for (const n of c.not) if (b.includes(n)) bad.push('resto ' + n);
  if (bad.length) { fail += bad.length; console.log('  FALLA id ' + id + ': ' + bad.join(' | ')); }
  else console.log('  OK   id ' + id);
}

// comprobar que el JSON del mapa es parseable
const h = sb.indexOf('TEST_SHOP_BTN');
console.log('\n=== cards presentes en las guias correctas ===');
const CARDS = [
  ['guides/midi-keyboards.html', 'Kontrol S61', 14],
  ['guides/best-synthesizers.html', 'Subsequent 37', 143],
  ['guides/best-synthesizers.html', 'MicroFreak', 475],
  ['guides/best-synthesizers.html', 'DeepMind 12', 476],
  ['guides/best-synthesizers.html', 'Hydrasynth', 477],
  ['guides/best-synthesizers.html', 'Take 5', 478],
  ['guides/best-in-ear-monitors.html', 'SE846', 269],
  ['guides/best-wireless-iems.html', 'PSM300', 267],
];
const cache = {};
for (const [pg, needle, id] of CARDS) {
  if (!cache[pg]) {
    try { cache[pg] = fs.readFileSync(pg, 'utf8'); } catch (e) { cache[pg] = '(pagina no existe)'; }
  }
  const ok = cache[pg].includes(needle);
  if (!ok) { fail++; console.log('  FALTA ' + needle + ' en ' + pg); }
  else console.log('  OK   ' + needle + ' en ' + pg);
}

console.log(fail ? '\nFALLOS: ' + fail : '\nTODO CORRECTO');
process.exit(fail ? 1 : 0);
