// Chequeo ESTRUCTURAL de <p>: recorre el texto con una pila, en vez de contar.
// asi detecta el caso "un </p> huerfano al principio compensado por un <p>
// sin cerrar al final", que un simple recuento no ve.
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

function check(html) {
  if (typeof html !== 'string') return null;
  const stack = [];
  const problems = [];
  const re = /<(\/?)p(\s[^>]*)?>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    if (m[1] === '/') {
      if (stack.length === 0) problems.push('cierre huerfano en ' + m.index);
      else stack.pop();
    } else {
      stack.push(m.index);
    }
  }
  stack.forEach(i => problems.push('apertura sin cerrar en ' + i));
  return problems;
}

const fields = [];
guides.forEach(g => {
  ['conclusion', 'conclusion_es', 'verdict', 'verdict_es', 'intro', 'intro_es', 'description', 'description_es']
    .forEach(f => fields.push([g.id, f, g[f]]));
  (g.sections || []).forEach((s, i) => {
    fields.push([g.id, 'sections[' + i + '].content', s.content]);
    fields.push([g.id, 'sections[' + i + '].content_es', s.content_es]);
    fields.push([g.id, 'sections[' + i + '].heading', s.heading]);
    fields.push([g.id, 'sections[' + i + '].heading_es', s.heading_es]);
  });
  (g.faq || []).forEach((f, i) => {
    fields.push([g.id, 'faq[' + i + '].q', f.q]);
    fields.push([g.id, 'faq[' + i + '].a', f.a]);
    fields.push([g.id, 'faq[' + i + '].a_es', f.a_es]);
  });
});

const bad = [];
fields.forEach(([id, path, val]) => {
  const p = check(val);
  if (p && p.length) bad.push({ id, path, p, val });
});

console.log('Guias: ' + guides.length + ' | campos revisados: ' + fields.length);
console.log('Campos con HTML estructuralmente roto: ' + bad.length);
bad.forEach(b => {
  console.log('\n' + b.id + '.' + b.path);
  b.p.forEach(x => console.log('    ' + x));
  // contexto del primer problema
  const i = parseInt((b.p[0].match(/\d+/) || [0])[0], 10);
  console.log('    ctx: ...' + b.val.slice(Math.max(0, i - 60), i + 60) + '...');
});
