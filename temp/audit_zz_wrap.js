// Auditar los wrappers de afiliado de zZounds: formats y dominios
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

function variants(url) {
  const out = {};
  if (!url) return out;
  if (/anrdoezrs\.net/.test(url)) out.anrdoezrs = (out.anrdoezrs || 0) + 1;
  if (/awin1\.com/.test(url)) out.awin = (out.awin || 0) + 1;
  if (/pxf\.io/.test(url)) out.pxf = (out.pxf || 0) + 1;
  if (/zzounds\.com/.test(url)) out.directo = (out.directo || 0) + 1;
  return out;
}

const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;

const tot = {};
const ids = {};
const ejemplos = {};

list.forEach(p => {
  const u = (p.stores || {}).zzounds;
  if (!u) return;
  const v = variants(u);
  Object.keys(v).forEach(k => tot[k] = (tot[k] || 0) + v[k]);
  // ids de click distintos
  const m = u.match(/anrdoezrs\.net\/click-([\d-]+)\?/);
  if (m) ids[m[1]] = (ids[m[1]] || 0) + 1;
  // forma del parametro url
  const forma = u.match(/\?url=/) ? '?url=' : (u.match(/\?u=/) ? '?u=' : (u.includes('?') ? 'otro' : 'sin-param'));
  const clave = (m ? 'anrdoezrs ' : 'otro ') + forma;
  if (!ejemplos[clave]) ejemplos[clave] = u;
});

console.log('=== TIPOS DE LINK zZounds (453 productos) ===');
Object.entries(tot).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log('  ' + String(v).padStart(4) + 'x  ' + k));

console.log('\n=== IDS DE CLICK DISTINTOS en anrdoezrs ===');
Object.entries(ids).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log('  ' + String(v).padStart(4) + 'x  click-' + k));

console.log('\n=== FORMAS DEL PARAMETRO ===');
Object.entries(ejemplos).forEach(([k, v]) => console.log('  ' + k + '\n      ' + v));

// ¿hay algún otro dominio de afiliado de zZounds en el repo?
console.log('\n=== TODOS LOS DOMINIOS DE AFILIADO EN products.json ===');
const dom = {};
list.forEach(p => Object.entries(p.stores || {}).forEach(([k, v]) => {
  if (!v) return;
  const m = v.match(/https?:\/\/([^/?]+)/);
  if (m) {
    const d = m[1];
    if (!/amazon|andertons|gear4music|musicstore|zzounds\.com/.test(d)) {
      dom[k] = dom[k] || {};
      dom[k][d] = (dom[k][d] || 0) + 1;
    }
  }
}));
Object.entries(dom).forEach(([k, v]) => {
  console.log('  ' + k + ':');
  Object.entries(v).sort((a, b) => b[1] - a[1]).forEach(([d, n]) => console.log('    ' + String(n).padStart(4) + 'x  ' + d));
});
