// AUDIT 1/4: estructura de guias + catalogo (solo lectura)
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const p = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const idsCat = new Set(p.map(x => x.id));
const R = [];
const rep = (sev, donde, msg) => R.push({ sev, donde, msg });

// duplicados de id en catalogo
const vistos = new Set(); const dupIds = [];
p.forEach(x => { if (vistos.has(x.id)) dupIds.push(x.id); vistos.add(x.id); });
if (dupIds.length) rep('ERROR', 'products.json', 'ids duplicados: ' + dupIds.join(','));

// productos sin imagen / sin tiendas / sin precio canonico
p.forEach(x => {
  if (!x.img) rep('ERROR', 'producto ' + x.id, 'sin imagen: ' + x.title);
  if (!x.stores || !Object.keys(x.stores).length) rep('AVISO', 'producto ' + x.id, 'sin tiendas: ' + x.title);
  if (x.price === undefined || x.price === null) rep('AVISO', 'producto ' + x.id, 'sin precio canonico: ' + x.title);
});

// slug duplicados de guias
const slugs = {};
g.forEach(x => { slugs[x.id] = (slugs[x.id] || 0) + 1; });
Object.entries(slugs).filter(([k, v]) => v > 1).forEach(([k, v]) => rep('ERROR', 'guides.json', 'slug duplicado: ' + k));

g.forEach(gg => {
  const tag = 'guia ' + gg.id;
  if (!gg.title || !gg.title_es) rep('ERROR', tag, 'sin titulo EN o ES');
  if (!gg.description || !gg.description_es) rep('AVISO', tag, 'sin descripcion EN o ES');
  const feat = gg.featuredProducts || [];
  const enSec = [...new Set([].concat(...(gg.sections || []).map(s => s.products || [])))];
  // huerfanos dentro de la guia
  feat.filter(id => !enSec.includes(id)).forEach(id => rep('AVISO', tag, 'featured ' + id + ' sin seccion'));
  enSec.filter(id => !feat.includes(id)).forEach(id => rep('AVISO', tag, 'seccion con ' + id + ' no esta en featured'));
  // ids que no existen
  [...new Set([...feat, ...enSec])].filter(id => !idsCat.has(id)).forEach(id => rep('ERROR', tag, 'id ' + id + ' no existe en catalogo'));
  // veredictos
  const vs = gg.verdictProsCons || [];
  vs.forEach((v, i) => {
    if (!v.name) { rep('ERROR', tag, 'veredicto [' + i + '] sin nombre'); return; }
    if ((v.pros || []).length < 4 || (v.cons || []).length < 4) rep('ERROR', tag, 'veredicto ' + v.name + ' con menos de 4+4 EN');
    if ((v.pros_es || []).length < 4 || (v.cons_es || []).length < 4) rep('ERROR', tag, 'veredicto ' + v.name + ' con menos de 4+4 ES');
    if ((v.pros || []).length !== (v.pros_es || []).length) rep('AVISO', tag, 'veredicto ' + v.name + ': pros EN!=ES');
    if ((v.cons || []).length !== (v.cons_es || []).length) rep('AVISO', tag, 'veredicto ' + v.name + ': cons EN!=ES');
    ['pros', 'cons', 'pros_es', 'cons_es'].forEach(k => (v[k] || []).forEach((t, j) => {
      if (!t || !t.trim()) rep('ERROR', tag, 'veredicto ' + v.name + ' ' + k + '[' + j + '] vacio');
      if (/^[\s\-–—]/.test(t)) rep('ERROR', tag, 'veredicto ' + v.name + ' ' + k + '[' + j + '] fragmentado: "' + t.slice(0, 50) + '"');
    }));
    const prod = p.find(y => y.title === v.name);
    if (!prod) rep('AVISO', tag, 'veredicto "' + v.name + '" no casa con ningun titulo de catalogo');
    else if (!feat.includes(prod.id) && !enSec.includes(prod.id)) rep('AVISO', tag, 'veredicto ' + v.name + ' sin tarjeta en la guia');
  });
  // secciones
  const heads = new Set();
  (gg.sections || []).forEach((s2, i) => {
    if (!s2.heading || !s2.heading_es) rep('ERROR', tag, 'seccion [' + i + '] sin heading EN/ES');
    if (!s2.content || !s2.content_es) rep('ERROR', tag, 'seccion [' + i + '] sin contenido EN/ES');
    if (heads.has(s2.heading)) rep('AVISO', tag, 'heading duplicado: "' + s2.heading.slice(0, 50) + '"');
    heads.add(s2.heading);
    if (/\[1\.\d+\]|\[2\.\d+\]/.test(s2.content) || /\[1\.\d+\]|\[2\.\d+\]/.test(s2.content_es)) rep('ERROR', tag, 'seccion [' + i + '] con marcadores de cita [x.y]');
  });
  // tabla
  if (gg.productTable) {
    const t2 = gg.productTable;
    (t2.rows || []).forEach((r, i) => {
      if (!r.label || !r.label_es) rep('ERROR', tag, 'fila tabla [' + i + '] sin label');
      (r.values || []).forEach((v, j) => {
        if (!(v.value || '').trim() || !(v.value_es || '').trim()) rep('ERROR', tag, 'tabla fila ' + i + ' col ' + j + ' vacia');
      });
      if ((r.values || []).length !== (t2.columns || []).length) rep('ERROR', tag, 'tabla fila ' + i + ': ' + (r.values || []).length + ' valores vs ' + (t2.columns || []).length + ' columnas');
    });
  }
  // mojibake en el objeto
  if (/â‚¬|Â£|Â°/.test(JSON.stringify(gg))) rep('ERROR', tag, 'mojibake');
});

// huerfanos globales
const usados = new Set();
g.forEach(gg => { (gg.featuredProducts || []).forEach(id => usados.add(id)); (gg.sections || []).forEach(s2 => (s2.products || []).forEach(id => usados.add(id))); });
const huerf = p.filter(x => !usados.has(x.id));
console.log('huerfanos globales: ' + huerf.length + (huerf.length ? ' -> ' + huerf.map(x => x.id).join(',') : ''));

const err = R.filter(r => r.sev === 'ERROR'), avi = R.filter(r => r.sev === 'AVISO');
console.log('\nERRORES: ' + err.length + '   AVISOS: ' + avi.length + '   (' + g.length + ' guias, ' + p.length + ' productos)');
err.slice(0, 60).forEach(r => console.log('  [ERROR] ' + r.donde + ' :: ' + r.msg));
avi.slice(0, 60).forEach(r => console.log('  [aviso] ' + r.donde + ' :: ' + r.msg));
fs.writeFileSync(B + 'temp/audit_resultados_1.json', JSON.stringify(R, null, 1));
console.log('\n(detalle en temp/audit_resultados_1.json)');
