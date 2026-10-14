const fs = require('fs');
let src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');

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
if (cierra === -1) { console.log('!! no cierre'); process.exit(1); }

let block = src.slice(abre, cierra + 1);
const lines = block.split(/\r?\n/);

let l671s = -1, l671e = -1;
for (let k = 0; k < lines.length; k++) {
  if (lines[k] && lines[k].trim().startsWith('671: {')) { l671s = k; break; }
}
if (l671s > -1) {
  let d = 0, started = false;
  for (let k = l671s; k < lines.length; k++) {
    const line = lines[k];
    if (!line) continue;
    for (const ch of line) {
      if (ch === '{') { d++; started = true; }
      else if (ch === '}') { d--; if (started && d === 0) { l671e = k; break; } }
    }
    if (l671e > -1) break;
  }
}
console.log('671 lineas:', l671s, l671e);

const new671 = `  671: {
    prices: {
      gear4music: "£144.00",
      amazon: "$199.00",
      andertons: "£144.00",
      musicstore: "€169.00"
    },
    oos: [
      "zzounds"
    ],
    urls: {
      gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/Behringer-FLOW-8-8-Channel-Digital-Mixer/3N67",
      amazon: "https://www.amazon.com/dp/B08NDBQM5W",
      zzounds: "https://www.zzounds.com/item--BEHFLOW8",
      andertons: "https://www.andertons.co.uk/behringer-flow-8-8-input-digital-mixer-with-bluetooth-audio-app-contro/",
      musicstore: "https://www.musicstore.com/en_OE/EUR/Behringer-Flow-8/art-PAH0022110-000"
    }
  },`;

if (l671s > -1 && l671e > -1) {
  const newLines = new671.split('\n');
  lines.splice(l671s, l671e - l671s + 1, ...newLines);
  console.log('671 reemplazado con precios verificados');
}

const newBlock = lines.join('\n');
const newSrc = src.slice(0, abre) + newBlock + src.slice(cierra + 1);
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', newSrc);

try { new Function(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8')); console.log('parsea OK'); }
catch (e) { console.log('ROTO:', e.message); process.exit(1); }