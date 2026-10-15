// Reemplazar TODAS las apariciones de "FL Studio All Plugins Edition" y variantes
// por "FL Studio Producer Edition" en ableton-vs-fl-studio.
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const g = guides.find(x=>x.id==='ableton-vs-fl-studio');

// Variantes a reemplazar (ordenadas de mas larga a menos larga para no solapar)
const MAP = [
  ['FL Studio All Plugins Edition', 'FL Studio Producer Edition'],
  ['All Plugins Edition', 'Producer Edition'],
  ['All Plugins', 'Producer']
];

let total = 0;
function fixStr(s) {
  if (typeof s !== 'string') return s;
  let r = s;
  MAP.forEach(([viejo, nuevo])=>{
    // reemplazar solo cuando aparece como nombre de producto (no suelto en cualquier contexto)
    const re = new RegExp(viejo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const antes = r;
    r = r.replace(re, nuevo);
    if (r !== antes) {
      const n = (antes.split(viejo).length - 1);
      total += n;
    }
  });
  return r;
}
function walk(obj) {
  if (typeof obj === 'string') return fixStr(obj);
  if (Array.isArray(obj)) return obj.map(walk);
  if (obj && typeof obj === 'object') {
    const o = {};
    Object.keys(obj).forEach(k => { o[k] = walk(obj[k]); });
    return o;
  }
  return obj;
}

const fixed = walk(g);
// asignar de vuelta
Object.keys(fixed).forEach(k => { g[k] = fixed[k]; });

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');
console.log('total reemplazos: ' + total);

// verificar
const G = JSON.parse(fs.readFileSync(gf,'utf8'));
const g2 = G.find(x=>x.id==='ableton-vs-fl-studio');
const s = JSON.stringify(g2);
const n = (s.split('All Plugins').length-1);
console.log('restos de "All Plugins": ' + n);
console.log('restos de "All Plugins Edition": ' + (s.split('All Plugins Edition').length-1));
if (n) {
  let idx = s.indexOf('All Plugins');
  while (idx > -1) { console.log('  ...' + s.slice(Math.max(0,idx-50), idx+30) + '...'); idx = s.indexOf('All Plugins', idx+1); }
}
console.log('headers comparison: ' + JSON.stringify(g2.comparison.headers));
console.log('columnas tabla: ' + (g2.productTable ? g2.productTable.columns.map(c=>c.title).join(' | ') : 'sin productTable'));