const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
// ---- products.json amazon dp links ----
const pFile = DIR + 'data/products.json';
const P = JSON.parse(fs.readFileSync(pFile, 'utf8'));
const setAmz = (id, asin) => {
  const p = P.find(x => x.id === id);
  if (!p.stores.amazon.startsWith('https://www.amazon.com/s?k=')) throw new Error(id + ' amazon not search link');
  p.stores.amazon = 'https://www.amazon.com/dp/' + asin;
};
setAmz(572, 'B07MH391ZF');
setAmz(565, 'B0B6D3KKMX');
setAmz(567, 'B0H27M8B1T');
fs.writeFileSync(pFile, JSON.stringify(P, null, 2) + '\n');
console.log('amazon dps set: 572, 565, 567');
// ---- guides.json ES + verdict tweaks ----
const gFile = DIR + 'data/guides.json';
const G = JSON.parse(fs.readFileSync(gFile, 'utf8'));
const g = G.find(x => x.id === 'best-digital-pianos');
const rep1 = (txt, from, to) => {
  const c = txt.split(from).length - 1;
  if (c !== 1) throw new Error('found ' + c + 'x: ' + from.slice(0, 50));
  return txt.split(from).join(to);
};
const sec = g.sections.find(s => (s.products || []).includes(565));
sec.content_es = rep1(sec.content_es, 'tapa abatible', 'tapa deslizante');
sec.content_es = rep1(sec.content_es, 'alrededor de la acci\u00f3n de martillo GHS de Yamaha', 'construido sobre la conocida acci\u00f3n de martillo GHS de Yamaha');
sec.content_es = rep1(sec.content_es, 'muestra del CFX con VRM Lite', 'muestreo del CFX con VRM Lite');
sec.content_es = rep1(sec.content_es, 'as\u00ed que grabar pasa por el audio USB', 'as\u00ed que la grabaci\u00f3n externa se realiza directamente a trav\u00e9s de su puerto de audio USB');
console.log('section ES fixed');
const v = g.verdictProsCons.find(x => x.name === 'Yamaha YDP-146');
if (!v) throw new Error('YDP-146 verdict missing');
v.pros[3] = rep1(v.pros[3], '(24-bit)', '(24-bit, 44.1 kHz)');
v.pros_es[3] = rep1(v.pros_es[3], '(24 bits)', '(24 bits, 44,1 kHz)');
v.cons[0] = rep1(v.cons[0], 'a clear step below GrandTouch-E', 'a clear step below the GrandTouch-E in its big brother, the YDP-166');
v.cons_es[0] = rep1(v.cons_es[0], 'un escal\u00f3n claro por debajo del GrandTouch-E', 'un escal\u00f3n claro por debajo del GrandTouch-E de su hermano mayor, el YDP-166');
v.cons_es[3] = rep1(v.cons_es[3], 'Sus 38 kg piden un sitio fijo', 'Sus 38 kg hacen necesario asignarle un sitio fijo');
console.log('verdict tweaked');
fs.writeFileSync(gFile, JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
