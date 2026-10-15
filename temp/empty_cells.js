// CELDAS VACIAS en todas las tablas: productTable (columns/values) y comparison (headers/valN)
const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json','utf8'));

const vacias = [];
const nCols = c => c.headers ? c.headers.length : c.columns.length;

// --- esquema comparison ---
guides.forEach(g => {
  if (!g.comparison) return;
  const c = g.comparison;
  if (!c.headers || !c.headers.length) return;
  const n = nCols(c);
  const claves = new Set();
  c.rows.forEach(r => Object.keys(r).forEach(k => { if (/^val\d*$/.test(k)) claves.add(k); }));
  c.rows.forEach((r, i) => {
    for (let j = 1; j <= n; j++) {
      const k = 'val' + (j === 1 ? '' : j);
      const v = r[k];
      if (v === undefined) vacias.push({ gid: g.id, tipo: 'comparison', col: c.headers[j-1], fila: r.label, falta: k });
      else if (String(v).trim() === '') vacias.push({ gid: g.id, tipo: 'comparison', col: c.headers[j-1], fila: r.label, falta: 'vacia' });
    }
  });
  // columnas sueltas (filas que no llegan al final)
  c.rows.forEach(r => {
    ['val','val1'].forEach(k => {});
  });
});

// --- esquema productTable ---
guides.forEach(g => {
  if (!g.productTable) return;
  const t = g.productTable;
  if (!t.columns || !t.columns.length) return;
  t.rows.forEach(r => {
    t.columns.forEach((col, j) => {
      const v = r.values[j];
      if (v === undefined) vacias.push({ gid: g.id, tipo: 'productTable', col: col.title, fila: r.label, falta: 'sin celda' });
      else if (v === null || String(v.value || '').trim() === '') vacias.push({ gid: g.id, tipo: 'productTable', col: col.title, fila: r.label, falta: 'vacia' });
    });
  });
});

console.log('=== CELDAS VACIAS EN TODAS LAS TABLAS DEL SITIO ===');
console.log('total: ' + vacias.length + '\n');
const porGuia = {};
vacias.forEach(v => { const k = v.gid; (porGuia[k] = porGuia[k] || []).push(v); });
Object.keys(porGuia).sort().forEach(gid => {
  const l = porGuia[gid];
  console.log('  ' + gid + '  (' + l.length + ')');
  const cols = [...new Set(l.map(x => x.col))];
  cols.forEach(col => {
    const filas = l.filter(x => x.col === col).map(x => x.fila);
    console.log('      "' + col + '" -> vacia en: ' + filas.join(', '));
  });
});
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/celdas_vacias.txt',
  porGuia && Object.keys(porGuia).map(gid => gid + ' | ' + [...new Set(porGuia[gid].map(x=>x.col))].join(' ; ')).join('\n'));