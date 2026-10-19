// Arregla el patron sistematico de <p> en data/guides.json.
//
// El error de edicion es siempre el mismo: al partir un parrafo se escribio
//   "<strong>Titulo.</strong> primer parrafo.</p><p>segundo parrafo..."
// es decir, se CERRO el primer parrafo sin haberlo abierto nunca. Al anteponer
// el "<p>" inicial el cierre huerfano queda resuelto, pero el ULTIMO <p> queda
// sin cerrar -> hay que anadir tambien el "</p>" final. Por eso los dos
// arreglos van siempre juntos.
//
// No se toca el texto: solo se anaden las etiquetas que faltan.
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
    targets.push([g, 'faq[' + i + '].q', f]);
    targets.push([g, 'faq[' + i + '].a', f]);
    targets.push([g, 'faq[' + i + '].q_es', f]);
    targets.push([g, 'faq[' + i + '].a_es', f]);
  });
  (g.verdictProsCons || []).forEach((v, i) => {
    targets.push([g, 'verdictProsCons[' + i + ']', v]);
  });
});

fs.writeFileSync(B + 'temp/guides.before_pfix.json', JSON.stringify(guides, null, 2), 'utf8');

let abiertos = 0, cerrados = 0, ambos = 0;
const restantes = [];

targets.forEach(([g, label, holder]) => {
  const key = holder === null ? label : label.split('.').pop();
  const val = holder === null ? g[label] : holder[key];
  if (typeof val !== 'string' || !/<p[\s>]|<\/p>/i.test(val)) return;

  const antes = analyze(val);
  if (!antes.orphanClose.length && !antes.unclosed.length) return;

  const empiezaConP = /^\s*<p[\s>]/i.test(val);
  let nuevo = val;

  // el cierre huerfano solo existe porque falta la apertura inicial
  if (antes.orphanClose.length && !empiezaConP) {
    nuevo = '<p>' + nuevo.trim();
    abiertos++; ambos++;
  }

  // el ultimo <p> sin cerrar
  const ahora = analyze(nuevo);
  if (!ahora.orphanClose.length && ahora.unclosed.length) {
    nuevo = nuevo.trimEnd() + '</p>';
    cerrados++; ambos++;
  }

  const chk = analyze(nuevo);
  if (chk.orphanClose.length || chk.unclosed.length) {
    restantes.push({ id: g.id, label, motivo: 'huerfanos=' + chk.orphanClose.length + ' sinCerrar=' + chk.unclosed.length });
    return;
  }

  if (holder === null) g[label] = nuevo; else holder[key] = nuevo;
});

console.log('Campos con "<p>" inicial antepuesto: ' + abiertos);
console.log('Campos con "</p>" final anadido:     ' + cerrados);
console.log('Campos reparados:                   ' + ambos);
console.log('Campos que siguen rotos:            ' + restantes.length);
restantes.forEach(r => console.log('   ' + r.id + '.' + r.label + ' -> ' + r.motivo));

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('\nBackup: temp/guides.before_pfix.json');
