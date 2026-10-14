const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };

// 1. Catalogo 678
const pj = BASE + 'data/products.json';
const P = JSON.parse(fs.readFileSync(pj, 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const p = arr.find(x => x.id === 678);
if (!p) die('678 no existe');
p.stores = {
  musicstore: 'https://www.musicstore.com/en_OE/EUR/Yamaha-URX44V-Black/art-PCM0018734-000',
  gear4music: 'https://www.gear4music.com/PA-DJ-and-Lighting/Yamaha-URX44V-USB-Streaming-Mixer-with-HDMI-Black/7QPI',
  andertons: 'https://www.andertons.co.uk/yamaha-urx44v-b-premium-audio-interface-with-video-thru/',
  zzounds: 'https://www.zzounds.com/item--YAMURX44V?siid=383385'
};
fs.writeFileSync(pj, JSON.stringify(P, null, 2));
console.log('678: 4 tiendas');

// 2. TEST 678
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
  if (lines[k] && lines[k].trim().startsWith('678: {')) { s = k; break; }
}
if (s === -1) die('TEST 678 no encontrado');
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
  '  678: {',
  '    prices: {',
  '      musicstore: "€749.00",',
  '      gear4music: "£587.00",',
  '      andertons: "£587.00",',
  '      zzounds: "$699.00"',
  '    },',
  '    urls: {',
  '      musicstore: "https://www.musicstore.com/en_OE/EUR/Yamaha-URX44V-Black/art-PCM0018734-000",',
  '      gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/Yamaha-URX44V-USB-Streaming-Mixer-with-HDMI-Black/7QPI",',
  '      andertons: "https://www.andertons.co.uk/yamaha-urx44v-b-premium-audio-interface-with-video-thru/",',
  '      zzounds: "https://www.zzounds.com/item--YAMURX44V?siid=383385"',
  '    }',
  '  },'
);
fs.writeFileSync(bj, src.slice(0, abre) + lines.join('\n') + src.slice(cierra + 1));
try { new Function(fs.readFileSync(bj, 'utf8')); console.log('TEST 678: 4 precios + 4 urls OK'); }
catch (err) { die('ROTO: ' + err.message); }
