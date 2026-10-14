const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

// 1. products.json 673: añadir musicstore y andertons
const pj = BASE + 'data/products.json';
const P = JSON.parse(fs.readFileSync(pj, 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const p673 = arr.find(p => p.id === 673);
p673.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/Aston-Microphones-Origin-Black-Bundle/art-REC0014747-000';
p673.stores.andertons = 'https://www.andertons.co.uk/aston-origin-cardioid-condenser-microphone/';
fs.writeFileSync(pj, JSON.stringify(P, null, 2));
console.log('673 stores: ' + Object.keys(p673.stores).join(','));

// 2. TEST_SHOP_BTN 673
const bj = BASE + 'build-guides.js';
let src = fs.readFileSync(bj, 'utf8');
const ini = src.indexOf('const TEST_SHOP_BTN');
const abre = src.indexOf('{', ini);
let depth = 0, i = abre, modo = null, esc = false, cierra = -1;
for (; i < src.length; i++) {
  const c = src[i], n = src[i + 1];
  if (modo === 'linea') { if (c === '\n') modo = null; continue; }
  if (modo === 'bloque') { if (c === '*' && n === '/') { modo = null; i++; } continue; }
  if (modo) {
    if (esc) { esc = false; continue; }
    if (c === '\\') { esc = true; continue; }
    if (c === modo) modo = null;
    continue;
  }
  if (c === '/' && n === '/') { modo = 'linea'; i++; continue; }
  if (c === '/' && n === '*') { modo = 'bloque'; i++; continue; }
  if (c === '"' || c === "'" || c === '`') { modo = c; continue; }
  if (c === '{') depth++;
  else if (c === '}') { depth--; if (depth === 0) { cierra = i; break; } }
}
let block = src.slice(abre, cierra + 1);
const lines = block.split(/\r?\n/);
let s = -1, e = -1;
for (let k = 0; k < lines.length; k++) {
  if (lines[k] && lines[k].trim().startsWith('673: {')) { s = k; break; }
}
if (s === -1) { console.log('!! 673 no encontrado'); process.exit(1); }
{
  let d = 0, started = false;
  for (let k = s; k < lines.length; k++) {
    const line = lines[k];
    if (!line) continue;
    for (const ch of line) {
      if (ch === '{') { d++; started = true; }
      else if (ch === '}') { d--; if (started && d === 0) { e = k; break; } }
    }
    if (e > -1) break;
  }
}
const entry = [
  '  673: {',
  '    prices: {',
  '      gear4music: "£198.25",',
  '      musicstore: "€299.00",',
  '      andertons: "£199.00"',
  '    },',
  '    urls: {',
  '      gear4music: "https://www.gear4music.com/Recording-and-Computers/Aston-Microphones-Origin-Cardioid-Condenser-Microphone/1F3F",',
  '      amazon: "https://www.amazon.com/dp/B019RVU0C0",',
  '      zzounds: "https://www.zzounds.com/item--ASTORIGIN",',
  '      musicstore: "https://www.musicstore.com/en_OE/EUR/Aston-Microphones-Origin-Black-Bundle/art-REC0014747-000",',
  '      andertons: "https://www.andertons.co.uk/aston-origin-cardioid-condenser-microphone/"',
  '    }',
  '  },'
];
lines.splice(s, e - s + 1, ...entry);
fs.writeFileSync(bj, src.slice(0, abre) + lines.join('\n') + src.slice(cierra + 1));
try { new Function(fs.readFileSync(bj, 'utf8')); console.log('673 TEST actualizado + build-guides.js OK'); }
catch (err) { console.log('ROTO:', err.message); process.exit(1); }
