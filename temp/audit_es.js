const fs = require('fs');
const path = require('path');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

const sinTags = s => String(s).replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');

// ---- diccionario de calcos y frases problematicas (ES) ----
const CALCOS = [
  ['techo de graves', 'calco de "bass ceiling"'],
  ['gabinetes', 'calco: en espanol es "cajas" o "altavoces"'],
  ['todoterreno', 'no se usa para monitores'],
  ['features', 'palabra inglesa sin traducir'],
  ['cabezonear', 'calco de "headline"'],
  ['es justamente el punto', '"el punto" es anglicismo'],
  ['de estante fijos', 'calco de "shelf"'],
  ['valor satelite', 'error de traduccion'],
  ['monitores de comprobacion', 'redundante'],
  ['sin discusion', 'falta la tilde'],
  ['lo mas profundo que puedes comprar nueva', 'concordancia: "lo mas profundo"'],
  ['comprar nueva', 'concordancia'],
  ['cajin', ''],
  ['provee de', ''],
  ['disponibilizar', 'anglicismo'],
  ['rendimiento de', ''],
  ['performances', 'anglicismo'],
  ['soporte de la base de datos', ''],
  ['targeting', 'anglicismo'],
  ['review', 'anglicismo'],
  ['hardware', 'anglicismo'],
  ['software', 'anglicismo'],
  ['streaming de', ''],
  ['checklist', 'anglicismo'],
  ['link', 'anglicismo'],
  ['click', 'anglicismo'],
  ['feedback', 'anglicismo'],
  ['setup', 'anglicismo'],
  ['upgrade', 'anglicismo'],
  ['bass trap', 'sin traducir'],
  ['sweet spot', 'anglicismo frequentisimo'],
  ['punto dulce', 'traduccion literal de sweet spot'],
  ['graves y agudos', 'ok pero ver si hay repeticion'],
  ['linea de', '']
];

// ---- frases de IA / ambiguas ----
const IA = [
  ['es importante', 'muleta'],
  ['vale la pena notar', 'muleta'],
  ['en resumen', 'muleta'],
  ['en conclusión', 'muleta'],
  ['no podemos dejar de', 'muleta'],
  ['cabe destacar', 'muleta'],
  ['conviene destacar', 'muleta'],
  ['a lo largo de', 'muleta'],
  ['en este sentido', 'muleta'],
  ['sin lugar a dudas', 'muleta'],
  ['en el mundo actual', 'muleta'],
  ['es Hora de', 'muleta'],
  ['no se trata solo de', 'muleta'],
  ['se trata de', 'muleta'],
  ['lo más importante', 'muleta'],
  ['es esencial', 'muleta']
];

const CJK = /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F\u4E00-\u9FFF\u3040-\u30FF]/;
const PALMAS = ['PreSonus','Mackie','M-Audio','Edifier','Behringer','JBL','Yamaha','Adam','ADAM','Kali','KRK','Celemony','Fender','Shure','Rode','Neumann','Genelec','Focal','Tannoy','IK','Audio-Technica','NUX','IK Multimedia','Superlux','KRK Audio','Soundtoys','iZotope','Telos','SSL','Native Instruments','Arturia','XLN','Positive','Grid','FabFilter','Valhalla','Standard','Spitfire','Plugin','Neato','Output'];

function camposES(g) {
  const out = [];
  const push = (ruta, val) => { if (typeof val === 'string' && val.length > 3) out.push([ruta, val]); };
  push('title_es', g.title_es);
  push('intro_es', g.intro_es);
  push('conclusion_es', g.conclusion_es);
  push('verdict_es', g.verdict_es);
  push('description_es', g.description_es);
  (g.sections || []).forEach((s, i) => {
    push('sections[' + i + '].heading_es', s.heading_es);
    push('sections[' + i + '].content_es', s.content_es);
  });
  (g.verdictProsCons || []).forEach((v, i) => {
    push('verdicts[' + i + '].name_es', v.name_es);
    (v.pros_es || []).forEach((p, j) => push('verdicts[' + i + '].pros_es[' + j + ']', p));
    (v.cons_es || []).forEach((c, j) => push('verdicts[' + i + '].cons_es[' + j + ']', c));
  });
  if (g.productTable) {
    push('tabla.title_es', g.productTable.title_es);
    (g.productTable.columns || []).forEach((c, i) => push('tabla.columns[' + i + ']', c.title_es || c.title));
    (g.productTable.rows || []).forEach((r, i) => {
      push('tabla.rows[' + i + '].label_es', r.label_es);
      (r.values || []).forEach((v, j) => push('tabla.rows[' + i + '].values[' + j + ']', v.value_es));
    });
  }
  (g.faq || []).forEach((f, i) => { push('faq[' + i + '].q_es', f.q_es); push('faq[' + i + '].a_es', f.a_es); });
  return out;
}

function auditar(g, soloEste) {
  const fallos = [];
  for (const [ruta, val] of camposES(g)) {
    const t = sinTags(val);
    if (CJK.test(t)) fallos.push(['CARACTER NO LATINO', ruta, t.slice(0, 90)]);
    for (const [m, nota] of CALCOS) {
      if (t.toLowerCase().indexOf(m.toLowerCase()) >= 0 && m.trim()) {
        fallos.push(['CALCO/FUGA', ruta + '  <' + m + '> ' + nota, t.slice(Math.max(0, t.toLowerCase().indexOf(m.toLowerCase()) - 45), t.toLowerCase().indexOf(m.toLowerCase()) + 55)]);
      }
    }
    for (const m of IA) {
      if (t.toLowerCase().indexOf(m) >= 0) fallos.push(['MULETA IA', ruta + '  <' + m + '>', t.slice(Math.max(0, t.toLowerCase().indexOf(m) - 40), t.toLowerCase().indexOf(m) + 50)]);
    }
    // Title Case indebido en headings_es
    if (/heading_es$/.test(ruta) || /\.title_es$/.test(ruta)) {
      const h = t.replace(/^[¿"'(]/, '');
      const palabras = h.split(/\s+/).filter(w => w.length > 3);
      const cap = palabras.filter(w => /^[A-ZÁÉÍÓÚÑ]/.test(w) && !PALMAS.some(p => w.toLowerCase().indexOf(p.toLowerCase()) === 0));
      if (cap.length > 1) fallos.push(['TITLE CASE EN ES', ruta, cap.join(', ')]);
    }
  }
  return fallos;
}

// ---- 실행 ----
const objetivo = process.argv[2] || 'best-home-studio-speakers';
if (objetivo !== 'TODO') {
  const g = guides.find(x => x.id === objetivo);
  if (!g) { console.log('no existe ' + objetivo); process.exit(1); }
  const f = auditar(g);
  console.log('=== AUDITORIA: ' + g.id + ' ===');
  console.log('campos ES revisados: ' + camposES(g).length);
  console.log('problemas: ' + f.length + '\n');
  const porTipo = {};
  f.forEach(x => { porTipo[x[0]] = (porTipo[x[0]] || 0) + 1; });
  Object.entries(porTipo).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log('  ' + String(v).padStart(3) + '  ' + k));
  console.log('\n--- detalle ---');
  f.forEach(x => console.log('\n[' + x[0] + '] ' + x[1] + '\n    "' + x[2] + '"'));
} else {
  let total = 0, guias = 0;
  const porTipo = {};
  const top = [];
  guides.forEach(g => {
    const f = auditar(g);
    if (f.length) { guias++; total += f.length; top.push([g.id, f.length]); }
    f.forEach(x => { porTipo[x[0]] = (porTipo[x[0]] || 0) + 1; });
  });
  console.log('=== AUDITORIA DE TODO EL SITIO ===');
  console.log('guias: ' + guides.length + ' | con problemas: ' + guias + ' | problemas: ' + total);
  console.log('\npor tipo:');
  Object.entries(porTipo).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log('  ' + String(v).padStart(5) + '  ' + k));
  console.log('\nguias mas afectadas:');
  top.sort((a, b) => b[1] - a[1]).slice(0, 15).forEach(([id, n]) => console.log('  ' + String(n).padStart(4) + '  ' + id));
}
