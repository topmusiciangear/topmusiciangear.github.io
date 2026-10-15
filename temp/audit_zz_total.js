// AUDITORIA EXHAUSTIVA DE zZounds — dos causas del mismo sintoma:
//  A) wrapper con /a--925521 -> cae en la portada (ya arreglado, verificar 0)
//  B) item code muerto en products.json -> 404 o portada (NO verificado)
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

const WRAP = 'https://www.anrdoezrs.net/click-101857888-10439229?url=';

console.log('================================================================');
console.log('  A) WRAPPERS EN LOS FICHEROS GENERADOS');
console.log('================================================================');

const ficheros = [];
fs.readdirSync(BASE + 'guides').forEach(f => { if (f.endsWith('.html')) ficheros.push('guides/' + f); });
['index.html', 'deals.html', 'deals_es.html'].forEach(f => { if (fs.existsSync(BASE + f)) ficheros.push(f); });
fs.readdirSync(BASE + 'js').forEach(f => { if (f.endsWith('.js')) ficheros.push('js/' + f); });

let wrapOk = 0, wrapMal = 0, zzDirecto = 0, zzOtrosDominios = 0;
const malDetalle = [];

ficheros.forEach(f => {
  const d = fs.readFileSync(BASE + f, 'utf8');

  // cualquier variante de comillas para el href
  const hrefs = [...d.matchAll(/href=(["'])(https?:\/\/[^"']*zzounds[^"']*)\1/g)].map(m => m[2]);
  hrefs.forEach(h => {
    const dec = h.replace(/&amp;/g, '&');
    if (dec.indexOf('anrdoezrs.net/click-') >= 0) {
      const destino = decodeURIComponent((dec.match(/[?&]url=([^&]+)/) || [])[1] || '');
      if (/a--925521/.test(destino)) { wrapMal++; malDetalle.push({ f, destino }); }
      else wrapOk++;
    } else if (/zzounds\.com/.test(dec)) zzDirecto++;
    else zzOtrosDominios++;
  });

  // y los que se construyen en JS por concatenacion: buscar '/a--925521/item--' o similar
  const sueltos = [...d.matchAll(/zzounds\.com[^"'`\s]{0,20}a--/g)];
  if (sueltos.length) malDetalle.push({ f, destino: 'ENCONTRADO EN TEXTO: ' + sueltos[0][0] });
});

console.log('  wrappers correctos (llegan al producto): ' + wrapOk);
console.log('  wrappers ROTOS   (portada):               ' + wrapMal);
console.log('  links zzounds sin wrapper:                ' + zzDirecto);
console.log('  otros dominios:                           ' + zzOtrosDominios);
if (malDetalle.length) {
  console.log('\n  DETALLE DE LOS ROTOS:');
  malDetalle.slice(0, 10).forEach(x => console.log('    [' + x.f + '] ' + x.destino));
}

console.log('\n================================================================');
console.log('  B) ITEM CODES EN products.json (causa B, pendiente de verificar)');
console.log('================================================================');

const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;

const formas = { 'item-- (codigo)': [], 'productreview--': [], 'a--ID/item--': [], 'lp/ (landing)': [], 'otra': [] };
list.forEach(p => {
  const u = (p.stores || {}).zzounds;
  if (!u) return;
  let f = 'otra';
  if (/a--\d+\/item--/.test(u)) f = 'a--ID/item--';
  else if (/item--/.test(u)) f = 'item-- (codigo)';
  else if (/productreview--/.test(u)) f = 'productreview--';
  else if (/\/lp\//.test(u)) f = 'lp/ (landing)';
  formas[f].push({ id: p.id, titulo: p.title, url: u });
});

Object.entries(formas).sort((a, b) => b[1].length - a[1].length).forEach(([k, v]) => {
  console.log('  ' + String(v.length).padStart(4) + 'x  ' + k);
  if (v.length) console.log('        ej: ' + v[0].url);
});

// los que NO son pagina de producto real
const sospechosos = [...formas['lp/ (landing)'], ...formas['otra']];
console.log('\n  URLs que NO son pagina de producto (' + sospechosos.length + '):');
sospechosos.forEach(x => console.log('    ' + String(x.id).padStart(4) + '  ' + x.titulo.slice(0, 40).padEnd(42) + x.url));

console.log('\n================================================================');
console.log('  C) PRODUCTOS SIN URL DE zZounds PERO CON PRECIO zZounds EN EL MAPA');
console.log('================================================================');
const src = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
const ini = src.indexOf('const TEST_SHOP_BTN = {');
const bloque = src.slice(ini, src.indexOf('\n};', ini));
const re = /(\d+):\s*\{/g; let m;
const conPrecioZz = {};
while ((m = re.exec(bloque)) !== null) {
  const id = +m[1];
  let d2 = 0, i = m.index + m[0].length - 1;
  for (; i < bloque.length; i++) { if (bloque[i] === '{') d2++; else if (bloque[i] === '}') { d2--; if (!d2) break; } }
  const cuerpo = bloque.slice(m.index + m[0].length, i);
  const pm = cuerpo.match(/prices:\s*\{([\s\S]*?)\}/);
  if (pm && /zzounds:\s*"/.test(pm[1])) conPrecioZz[id] = 1;
}
const byId = {}; list.forEach(p => byId[p.id] = p);
const incoherentes = Object.keys(conPrecioZz).map(Number).filter(id => byId[id] && !(byId[id].stores || {}).zzounds);
console.log('  entradas del mapa con precio zzounds: ' + Object.keys(conPrecioZz).length);
console.log('  SIN url zzounds en products.json:     ' + incoherentes.length);
incoherentes.forEach(id => console.log('    ' + String(id).padStart(4) + '  ' + byId[id].title));
