const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

const st = s => String(s).replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');

// ---- CALCOS Y FUGAS: solo patrones con equivalente claro en español ----
const CALCOS = [
  ['techo de graves', 'calco de "bass ceiling"'],
  ['gabinetes', 'calco: en español es "caja acústica"'],
  ['todoterreno', 'no se usa para monitores'],
  ['cabezonear', 'calco de "headline"'],
  ['valor satélite', 'error de traducción'],
  ['comprobacion de', 'redundante'],
  ['disponibilizar', 'anglicismo'],
  ['performances', 'anglicismo'],
  ['targeting', 'anglicismo'],
  ['checklist', 'anglicismo'],
  ['punto dulce', 'traducción literal de "sweet spot"'],
  ['features-precio', 'calco de "features-for-price"'],
  ['es exactamente el punto', '"el punto" es anglicismo'],
  ['la/tecnología de', ''],
  ['aparece a $', 'calco de "lists at"'],
  ['está sobre $', 'calco de "sits at"'],
  ['lo más parecido a una', 'frase-forzado del inglés'],
  ['los knobs de tono', 'anglicismo'],
  ['knob de', 'anglicismo'],
  ['tone knob', 'anglicismo'],
  ['que traslade', 'calco de "translate"'],
  ['gabinetes', ''],
  ['We measured', 'afirmación no verificable']
];

// ---- CALCOS SOLO EN INGLES ----
const CALCOS_EN = [
  ['mixes that translate', 'jerga deIngEN la不足'],
  ['The closest thing to a bargain', 'frase forzada'],
  ['lists at $', 'calco menor'],
  ['We measured', 'afirmación no verificable'],
  ['play it back on it', 'frase sin sentido'],
  ['the only one here', 'comprobable: revisar si es cierto']
];

// ---- MULETAS DE IA ----
const IA = [
  ['en el mundo actual', 'muleta'],
  ['sin lugar a dudas', 'muleta'],
  ['cabe destacar que', 'muleta'],
  ['conviene destacar que', 'muleta'],
  ['no podemos dejar de', 'muleta'],
  ['vale la pena notar', 'muleta']
];

const CJK = /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F\u4E00-\u9FFF\u3040-\u30FF]/;

function camposES(g) {
  const out = [];
  const p = (r, v) => { if (typeof v === 'string' && v.length > 3) out.push([r, v]); };
  p('intro_es', g.intro_es); p('conclusion_es', g.conclusion_es); p('verdict_es', g.verdict_es);
  p('description_es', g.description_es);
  (g.sections || []).forEach((s, i) => { p('sec[' + i + '].heading_es', s.heading_es); p('sec[' + i + '].content_es', s.content_es); });
  (g.verdictProsCons || []).forEach((v, i) => {
    (v.pros_es || []).forEach((x, j) => p('ver[' + i + '].pros_es[' + j + ']', x));
    (v.cons_es || []).forEach((x, j) => p('ver[' + i + '].cons_es[' + j + ']', x));
  });
  (g.faq || []).forEach((f, i) => { p('faq[' + i + '].q_es', f.q_es); p('faq[' + i + '].a_es', f.a_es); });
  return out;
}
function camposEN(g) {
  const out = [];
  const p = (r, v) => { if (typeof v === 'string' && v.length > 3) out.push([r, v]); };
  p('intro', g.intro); p('conclusion', g.conclusion); p('verdict', g.verdict); p('description', g.description);
  (g.sections || []).forEach((s, i) => { p('sec[' + i + '].heading', s.heading); p('sec[' + i + '].content', s.content); });
  return out;
}

function auditar(g) {
  const f = [];
  for (const [r, v] of camposES(g)) {
    const t = st(v);
    if (CJK.test(t)) f.push(['CARACTER NO LATINO', r, t.slice(0, 80)]);
    const low = t.toLowerCase();
    for (const [m, nota] of CALCOS) {
      const i = low.indexOf(m);
      if (i >= 0 && nota) f.push(['CALCO/FUGA ES <' + m + '>', r + '  ' + nota, t.slice(Math.max(0, i - 45), i + 55)]);
    }
    for (const [m, nota] of IA) {
      const i = low.indexOf(m);
      if (i >= 0) f.push(['MULETA <' + m + '>', r + '  ' + nota, t.slice(Math.max(0, i - 40), i + 50)]);
    }
  }
  for (const [r, v] of camposEN(g)) {
    const t = st(v);
    for (const [m, nota] of CALCOS_EN) {
      const i = t.indexOf(m);
      if (i >= 0) f.push(['CALCO/FUGA EN <' + m + '>', r + '  ' + nota, t.slice(Math.max(0, i - 45), i + 55)]);
    }
  }
  return f;
}

const todos = [];
guides.forEach(g => { const f = auditar(g); if (f.length) todos.push([g.id, f]); });
const total = todos.reduce((a, b) => a + b[1].length, 0);

console.log('=== AUDITORIA DE TODO EL SITIO ===');
console.log('guias: ' + guides.length + ' | afectadas: ' + todos.length + ' | hallazgos: ' + total);
const porTipo = {};
todos.forEach(([, f]) => f.forEach(x => { porTipo[x[0]] = (porTipo[x[0]] || 0) + 1; }));
console.log('');
console.log('por tipo:');
Object.entries(porTipo).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log('  ' + String(v).padStart(4) + '  ' + k));
console.log('');
console.log('guias mas afectadas:');
todos.slice().sort((a, b) => b[1].length - a[1].length).slice(0, 15)
  .forEach(([id, f]) => console.log('  ' + String(f.length).padStart(3) + '  ' + id));