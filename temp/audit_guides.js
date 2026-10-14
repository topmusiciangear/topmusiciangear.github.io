const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const ids = new Set(arr.map(p => p.id));

const report = [];
guides.forEach(g => {
  const issues = [];
  // 1. Paridad ES: campos vacíos
  ['title_es', 'intro_es', 'verdict_es', 'conclusion_es'].forEach(k => {
    if (!g[k] || !String(g[k]).trim()) issues.push('sin ' + k);
  });
  // 2. Secciones sin ES
  (g.sections || []).forEach((s, i) => {
    if (!s) { issues.push('seccion ' + i + ' nula'); return; }
    if (!s.heading_es || !s.content_es) issues.push('seccion[' + i + '] "' + (s.heading || '?').slice(0, 30) + '" sin ES');
  });
  // 3. Veredictos <4 pros/cons o sin ES
  (g.verdictProsCons || []).forEach(v => {
    if (!v) return;
    if ((v.pros || []).length < 4 || (v.cons || []).length < 4) issues.push('veredicto "' + v.name + '" con <4 pros/cons');
    if (((v.pros_es || []).length !== (v.pros || []).length) || ((v.cons_es || []).length !== (v.cons || []).length)) issues.push('veredicto "' + v.name + '" paridad ES rota');
  });
  // 4. Productos inexistentes en catalogo
  const used = new Set();
  (g.featuredProducts || []).forEach(id => used.add(id));
  (g.sections || []).forEach(s => { if (s && s.products) s.products.forEach(id => used.add(id)); });
  used.forEach(id => { if (!ids.has(id)) issues.push('producto ' + id + ' no existe en catalogo'); });
  // 5. Tabla desalineada
  if (g.productTable) {
    const nc = (g.productTable.columns || []).length;
    (g.productTable.rows || []).forEach(r => {
      if ((r.values || []).length !== nc) issues.push('tabla fila "' + r.label + '" desalineada');
    });
    if (!g.productTable.title_es) issues.push('tabla sin title_es');
  }
  // 6. "versión" en EN
  const enTexts = [g.title, g.intro, g.verdict, g.conclusion].join(' ');
  if (/versión|versiones/i.test(enTexts)) issues.push('"versión" en texto EN');
  if (issues.length) report.push({ id: g.id, n: issues.length, issues });
});

console.log('Guias con problemas: ' + report.length + '/' + guides.length);
report.sort((a, b) => b.n - a.n).slice(0, 40).forEach(r => {
  console.log('\n=== ' + r.id + ' (' + r.n + ') ===');
  r.issues.slice(0, 8).forEach(x => console.log('  - ' + x));
});
