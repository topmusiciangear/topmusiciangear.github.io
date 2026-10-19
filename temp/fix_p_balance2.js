// Segunda pasada: en los campos a los que ya se les antepuso "<p>", el
// ultimo <p> queda sin cerrar. Aqui solo se añade el "</p>" final.
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

function analyze(html) {
  const stack = [];
  const orphanClose = [];
  const unclosed = [];
  const re = /<(\/?)p(\s[^>]*)?>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    if (m[1] === '/') {
      if (stack.length === 0) orphanClose.push(m.index);
      else stack.pop();
    } else stack.push(m.index);
  }
  unclosed.push(...stack);
  return { orphanClose, unclosed };
}

const targets = [];
guides.forEach(g => {
  ['conclusion', 'conclusion_es', 'verdict', 'verdict_es', 'intro', 'intro_es'].forEach(f => targets.push([g, f, null]));
  (g.sections || []).forEach((s, i) => {
    targets.push([g, 'sections[' + i + '].content', s]);
    targets.push([g, 'sections[' + i + '].content_es', s]);
  });
  (g.faq || []).forEach((f, i) => {
    targets.push([g, 'faq[' + i + '].a', f]);
    targets.push([g, 'faq[' + i + '].a_es', f]);
  });
});

let arreglados = 0;
const restantes = [];

targets.forEach(([g, label, holder]) => {
  const key = holder === null ? label : label.split('.').pop();
  const val = holder === null ? g[label] : holder[key];
  if (typeof val !== 'string' || !val.includes('<p')) return;

  const { orphanClose, unclosed } = analyze(val);
  if (!orphanClose.length && !unclosed.length) return;

  // solo el cierre final falta
  if (!orphanClose.length && unclosed.length) {
    const nuevo = val.trimEnd() + '</p>';
    const chk = analyze(nuevo);
    if (chk.orphanClose.length || chk.unclosed.length) restantes.push({ id: g.id, label, motivo: 'sigue roto' });
    else {
      if (holder === null) g[label] = nuevo; else holder[key] = nuevo;
      arreglados++;
    }
    return;
  }

  restantes.push({ id: g.id, label, motivo: 'cierres huerfanos=' + orphanClose.length + ' sin cerrar=' + unclosed.length });
});

console.log('</p> final anadido: ' + arreglados);
console.log('Campos que siguen rotos: ' + restantes.length);
restantes.forEach(r => console.log('   ' + r.id + '.' + r.label + ' -> ' + r.motivo));

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('\ndata/guides.json escrito.');
