const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

// 1. products.json 672: anadir g4m + andertons, quitar de excluidos
const pj = BASE + 'data/products.json';
const P = JSON.parse(fs.readFileSync(pj, 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const p672 = arr.find(p => p.id === 672);
p672.stores.gear4music = 'https://www.gear4music.com/Recording-and-Computers/Lewitt-LCT-240-PRO-Large-Diaphragm-Condenser-Microphone-Black/24PS';
p672.stores.andertons = 'https://www.andertons.co.uk/lewitt-lct-240-pro-bk-ea-condenser-microphone-fet-sound/?search_query=Lewitt%20LCT%20240%20PRO';
p672.excludeStores = ['reverb'];
fs.writeFileSync(pj, JSON.stringify(P, null, 2));
console.log('672 stores: ' + Object.keys(p672.stores).join(','));

// 2. TEST_SHOP_BTN 672
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
  if (lines[k] && lines[k].trim().startsWith('672: {')) { s = k; break; }
}
if (s === -1) { console.log('!! 672 no encontrado'); process.exit(1); }
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
  '  672: {',
  '    prices: {',
  '      zzounds: "$99.00",',
  '      musicstore: "€129.00",',
  '      gear4music: "£82.00",',
  '      andertons: "£82.00"',
  '    },',
  '    urls: {',
  '      amazon: "https://www.amazon.com/dp/B072F5J32C",',
  '      zzounds: "https://www.zzounds.com/item--LEWLCT240PRO",',
  '      musicstore: "https://www.musicstore.com/en_OE/EUR/Lewitt-LCT-240-Pro-Black-/art-REC0013523-000",',
  '      gear4music: "https://www.gear4music.com/Recording-and-Computers/Lewitt-LCT-240-PRO-Large-Diaphragm-Condenser-Microphone-Black/24PS",',
  '      andertons: "https://www.andertons.co.uk/lewitt-lct-240-pro-bk-ea-condenser-microphone-fet-sound/?search_query=Lewitt%20LCT%20240%20PRO"',
  '    }',
  '  },'
];
lines.splice(s, e - s + 1, ...entry);
fs.writeFileSync(bj, src.slice(0, abre) + lines.join('\n') + src.slice(cierra + 1));
try { new Function(fs.readFileSync(bj, 'utf8')); console.log('672 TEST actualizado + build-guides.js OK'); }
catch (err) { console.log('ROTO:', err.message); process.exit(1); }