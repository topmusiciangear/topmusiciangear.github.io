const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const arr = Array.isArray(P)?P:P.products;

const g = guides.find(x=>x.id==='best-samplers-drum-computers');
const REAL = 'Akai Professional MPC XL';
console.log('nombre real en el catalogo: ' + (arr.find(p=>p.title===REAL) ? 'SI (id ' + arr.find(p=>p.title===REAL).id + ')' : 'NO'));

// donde aparece el nombre corto
let n = 0;
(function w(v, ruta) {
  if (typeof v === 'string') {
    if (v === 'Akai MPC XL') { n++; console.log('  ' + ruta + ': "' + v + '"'); }
  } else if (Array.isArray(v)) v.forEach((x,i)=>w(x, ruta+'['+i+']'));
  else if (v && typeof v === 'object') Object.keys(v).forEach(k=>w(v[k], ruta?ruta+'.'+k:k));
})(g, g.id);
console.log('apariciones del nombre corto: ' + n);
if (!n) { console.log('nada que cambiar'); process.exit(0); }

// aplicar
(function w(v, ruta) {
  if (typeof v === 'string') { if (v === 'Akai MPC XL') return REAL; return v; }
  if (Array.isArray(v)) return v.map((x,i)=>w(x, ruta+'['+i+']'));
  if (v && typeof v === 'object') { const o={}; Object.keys(v).forEach(k=>{o[k]=w(v[k], ruta+'.'+k);}); return o; }
  return v;
});
const nuevo = (function w(v) {
  if (typeof v === 'string') return v === 'Akai MPC XL' ? REAL : v;
  if (Array.isArray(v)) return v.map(w);
  if (v && typeof v === 'object') { const o={}; Object.keys(v).forEach(k=>{o[k]=w(v[k]);}); return o; }
  return v;
})(g);
fs.writeFileSync(gf, JSON.stringify(guides.map(x=>x.id==='best-samplers-drum-computers'?nuevo:x), null, 2), 'utf8');

// verificar
const G2 = JSON.parse(fs.readFileSync(gf,'utf8'));
const g2 = G2.find(x=>x.id==='best-samplers-drum-computers');
let quedan = 0, nuevos = 0;
(function w(v, ruta) {
  if (typeof v === 'string') {
    if (v === 'Akai MPC XL') quedan++;
    if (v === REAL) nuevos++;
  } else if (Array.isArray(v)) v.forEach((x,i)=>w(x, ruta+'['+i+']'));
  else if (v && typeof v === 'object') Object.keys(v).forEach(k=>w(v[k], ruta?ruta+'.'+k:k));
})(g2, '');
console.log('\nnombre corto restante: ' + quedan + ' | nombre correcto presente: ' + nuevos + ' sitio(s)');
console.log('veredictos: ' + g2.verdictProsCons.map(v=>v.name||v.title).join(' | '));

// integridad
let desajuste = 0;
G2.forEach(x=>{ if(x.productTable){const nc=x.productTable.columns.length; x.productTable.rows.forEach(r=>{ if(r.values.length!==nc) desajuste++; });} });
console.log('celdas desajustadas: ' + desajuste);
const cjk=(JSON.stringify(G2).match(/[\u4e00-\u9fff]/g)||[]);
console.log('CJK: ' + (cjk.length?[...new Set(cjk)].join(''):'ninguno'));
console.log('guias.json escrito');