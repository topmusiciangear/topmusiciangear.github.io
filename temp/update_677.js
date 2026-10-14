const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };

// 1. Catalogo 677
const pj = BASE + 'data/products.json';
const P = JSON.parse(fs.readFileSync(pj, 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const p = arr.find(x => x.id === 677);
if (!p) die('677 no existe');
p.img = 'https://r2.gear4music.com/media/50/501201/1200/preview.jpg';
p.image = 'https://r2.gear4music.com/media/50/501201/1200/preview.jpg';
p.stores = {
  gear4music: 'https://www.gear4music.com/Recording-and-Computers/Antelope-Audio-Orion-Studio-Synergy-Core/33P8',
  zzounds: 'https://www.zzounds.com/item--ANEORNSTDSYNCORE?siid=268656',
  andertons: 'https://www.andertons.co.uk/antelope-audio-orion-studio-synergy-core/?search_query=Antelope%20Orion%20Studio%20Synergy%20Core',
  musicstore: 'https://www.musicstore.com/en_OE/EUR/ANTELOPE-Orion-Studio-Synergy-Core/art-PCM0015924-000'
};
fs.writeFileSync(pj, JSON.stringify(P, null, 2));
console.log('677: imagen G4M + 4 tiendas');

// 2. TEST 677 (G4M sin precio: no disponible)
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
const block = src.slice(abre, cierra + 1);
const lines = block.split(/\r?\n/);
let s = -1, e = -1;
for (let k = 0; k < lines.length; k++) {
  if (lines[k] && lines[k].trim().startsWith('677: {')) { s = k; break; }
}
if (s === -1) die('TEST 677 no encontrado');
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
lines.splice(s, e - s + 1,
  '  677: {',
  '    prices: {',
  '      zzounds: "$2,995.00",',
  '      andertons: "£2,039.00",',
  '      musicstore: "€2,399.00"',
  '    },',
  '    urls: {',
  '      gear4music: "https://www.gear4music.com/Recording-and-Computers/Antelope-Audio-Orion-Studio-Synergy-Core/33P8",',
  '      zzounds: "https://www.zzounds.com/item--ANEORNSTDSYNCORE?siid=268656",',
  '      andertons: "https://www.andertons.co.uk/antelope-audio-orion-studio-synergy-core/?search_query=Antelope%20Orion%20Studio%20Synergy%20Core",',
  '      musicstore: "https://www.musicstore.com/en_OE/EUR/ANTELOPE-Orion-Studio-Synergy-Core/art-PCM0015924-000"',
  '    }',
  '  },'
);
fs.writeFileSync(bj, src.slice(0, abre) + lines.join('\n') + src.slice(cierra + 1));
try { new Function(fs.readFileSync(bj, 'utf8')); console.log('TEST 677: 3 precios + 4 urls OK'); }
catch (err) { die('ROTO: ' + err.message); }
