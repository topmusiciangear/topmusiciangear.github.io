// Escaneo de tablas incompletas + intros que empiezan en minuscula
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));

const esVacio = v => v === null || v === undefined || String(v).trim() === '';

// ---------- A) CELDAS VACIAS EN TABLAS ----------
const vacias = [];
const desajustes = [];
const marcadores = [];
guides.forEach(g => {
  if (g.productTable) {
    const nc = g.productTable.columns.length;
    g.productTable.rows.forEach(r => {
      if (!r.values || r.values.length !== nc) desajustes.push(g.id + ' | ' + r.label + ' (' + (r.values?r.values.length:0) + ' vs ' + nc + ')');
      (r.values||[]).forEach((v,i) => {
        const col = g.productTable.columns[i] ? g.productTable.columns[i].title : '?';
        const val = v && typeof v === 'object' ? (v.value || v.value_es || '') : v;
        const valEs = v && typeof v === 'object' ? (v.value_es || '') : '';
        if (esVacio(val)) vacias.push(g.id + ' | ' + r.label + ' | ' + col + ' [EN vacio]');
        else if (esVacio(valEs)) vacias.push(g.id + ' | ' + r.label + ' | ' + col + ' [ES vacio]');
        if (typeof val === 'string' && /^(N\/A|-{1,3}|TBD|NULL)$/i.test(val.trim())) marcadores.push(g.id + ' | ' + r.label + ' | ' + col + ' = "' + val + '"');
      });
    });
  }
  if (g.comparison && g.comparison.rows) {
    const nc = (g.comparison.headers||[]).length;
    g.comparison.rows.forEach(r => {
      if (r.val1 !== undefined && esVacio(r.val1)) vacias.push(g.id + ' | ' + r.label + ' | col1 [EN vacio]');
      if (r.val2 !== undefined && esVacio(r.val2)) vacias.push(g.id + ' | ' + r.label + ' | col2 [EN vacio]');
      // N columnas: val, val2, val3...
      if (nc > 2) for (let i=3;i<=nc;i++){
        const k = 'val'+i;
        if (r[k] !== undefined && esVacio(r[k])) vacias.push(g.id + ' | ' + r.label + ' | col'+i+' [EN vacio]');
      }
    });
  }
});

// ---------- B) INTROS/CONTENIDOS QUE EMPIEZAN EN MINUSCULA ----------
const minusculas = [];
function empiezaMinus(s) {
  if (!s) return null;
  // quitar etiquetas HTML al inicio
  let t = String(s).replace(/<[^>]+>/g,'').trim();
  t = t.replace(/^&nbsp;/,'').trim();
  if (!t) return null;
  const m = t.match(/[A-Za-zÁÉÍÓÚÑÜáéíóúñü]/);
  if (!m) return null;
  return m[0] === m[0].toLowerCase() ? t.slice(0,90) : null;
}
guides.forEach(g => {
  [['intro',g.intro],['intro_es',g.intro_es],['conclusion',g.conclusion],['conclusion_es',g.conclusion_es]].forEach(([campo,val])=>{
    const r = empiezaMinus(val);
    if (r) minusculas.push(g.id + ' | ' + campo + ': "' + r + '..."');
  });
  (g.sections||[]).forEach((s,i)=>{
    ['content','content_es'].forEach(c=>{
      const r = empiezaMinus(s[c]);
      if (r) minusculas.push(g.id + ' | secciones['+i+'].'+c+': "'+r+'..."');
    });
  });
});

// ---------- INFORME ----------
console.log('======================================================================');
console.log('  A) TABLAS CON CELDAS VACIAS');
console.log('======================================================================');
console.log('celdas vacias: ' + vacias.length);
vacias.slice(0,40).forEach(x=>console.log('  - ' + x));
if (vacias.length>40) console.log('  ... y ' + (vacias.length-40) + ' mas');
console.log('\nceldas con marcador N/A o guion: ' + marcadores.length);
marcadores.slice(0,25).forEach(x=>console.log('  - ' + x));
if (marcadores.length>25) console.log('  ... y ' + (marcadores.length-25) + ' mas');
console.log('\nfilas desajustadas: ' + desajustes.length);
desajustes.slice(0,20).forEach(x=>console.log('  - ' + x));

console.log('\n\n======================================================================');
console.log('  B) TEXTOS QUE EMPIEZAN EN MINUSCULA');
console.log('======================================================================');
console.log('total: ' + minusculas.length);
minusculas.forEach(x=>console.log('  - ' + x));