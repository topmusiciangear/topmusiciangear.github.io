const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };

// ---------- 1. CATALOGO 675: precio + tiendas ----------
const pj = BASE + 'data/products.json';
const P = JSON.parse(fs.readFileSync(pj, 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const p675 = arr.find(p => p.id === 675);
if (!p675) die('675 no existe');
p675.price = 249;
p675.stores.zzounds = 'https://www.zzounds.com/item--SEEX1SSTUDBUN?siid=227155';
p675.stores.andertons = 'https://www.andertons.co.uk/se-electronics-se-x1-r-ribbon-mic/';
fs.writeFileSync(pj, JSON.stringify(P, null, 2));
console.log('675: precio 249 + zzounds/andertons');

// ---------- 2. TEST 675 ----------
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
  if (lines[k] && lines[k].trim().startsWith('675: {')) { s = k; break; }
}
if (s === -1) die('TEST 675 no encontrado');
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
  '  675: {',
  '    prices: {',
  '      zzounds: "$249.00",',
  '      gear4music: "£149.00",',
  '      musicstore: "€229.00",',
  '      andertons: "£149.00"',
  '    },',
  '    urls: {',
  '      musicstore: "https://www.musicstore.com/en_OE/EUR/sE-electronics-X1R-Ribbon-Microphone-/art-REC0009426-000",',
  '      gear4music: "https://www.gear4music.com/Recording-and-Computers/sE-Electronics-sE-X1R-Ribbon-Microphone/I6K",',
  '      zzounds: "https://www.zzounds.com/item--SEEX1SSTUDBUN?siid=227155",',
  '      andertons: "https://www.andertons.co.uk/se-electronics-se-x1-r-ribbon-mic/"',
  '    }',
  '  },'
];
lines.splice(s, e - s + 1, ...entry);
fs.writeFileSync(bj, src.slice(0, abre) + lines.join('\n') + src.slice(cierra + 1));
try { new Function(fs.readFileSync(bj, 'utf8')); console.log('TEST 675: 4 precios + 4 urls OK'); }
catch (err) { die('ROTO: ' + err.message); }

// ---------- 3. GUIA: ~$149 -> ~$249 ----------
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'best-microphone');

// 3a. Tabla Estimated Price
const ci = g.productTable.columns.findIndex(c => c.title === 'sE Electronics X1 R');
if (ci === -1) die('columna X1R no encontrada');
const prow = g.productTable.rows.find(r => r.label === 'Estimated Price');
if (!prow || prow.values[ci].value !== '~$149') die('celda precio tabla no coincide');
prow.values[ci] = { value: '~$249', value_es: '~$249' };

// 3b. Overview ribbon
const rib = g.sections.find(x => x && x.heading === 'Ribbon Microphones: Vintage Warmth for the Modern Studio');
const rEn = 'the sE X1 R at ~$149 gives you genuine ribbon smoothness for harsh voices at a fraction of the boutique price.';
if (!rib.content.includes(rEn)) die('overview EN no coincide');
rib.content = rib.content.split(rEn).join('the sE X1 R at ~$249 gives you genuine ribbon smoothness for harsh voices at a fraction of the boutique price.');
const rEs = 'el sE X1 R por ~$149 te da suavidad de cinta real para voces ásperas a una fracción del precio boutique.';
if (!rib.content_es.includes(rEs)) die('overview ES no coincide');
rib.content_es = rib.content_es.split(rEs).join('el sE X1 R por ~$249 te da suavidad de cinta real para voces ásperas a una fracción del precio boutique.');

// 3c. Seccion dedicada
const sec = g.sections.find(x => x && x.heading === 'sE Electronics X1 R: The Ribbon That Tames Sibilance');
if (!sec) die('seccion X1R no encontrada');
const sEn = 'Around ~$149, it is the shortcut';
if (!sec.content.includes(sEn)) die('seccion EN no coincide');
sec.content = sec.content.split(sEn).join('Around ~$249, it is the shortcut');
const sEs = 'Por ~$149, es el atajo';
if (!sec.content_es.includes(sEs)) die('seccion ES no coincide');
sec.content_es = sec.content_es.split(sEs).join('Por ~$249, es el atajo');

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
const all = JSON.stringify(g);
console.log('~$149 restante en guia:', ((all.match(/~\$149/g) || []).length));
console.log('$149 suelto restante:', ((all.match(/[^0-9~]149/g) || []).length));
