// Anidamiento real de <p> con pila (no regex). Un <p> dentro de otro <p>
// es HTML invalido y el navegador lo cierra solo, partiendo el parrafo.
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

let anidados = 0, huerfanos = 0, sinCerrar = 0;
const ejemplos = [];

guides.forEach(g => {
  const campos = [];
  ['conclusion', 'conclusion_es', 'verdict', 'verdict_es', 'intro', 'intro_es'].forEach(f => campos.push([f, g[f]]));
  (g.sections || []).forEach((s, i) => {
    campos.push(['sections[' + i + '].content', s.content]);
    campos.push(['sections[' + i + '].content_es', s.content_es]);
  });
  (g.faq || []).forEach((f, i) => {
    campos.push(['faq[' + i + '].a', f.a]);
    campos.push(['faq[' + i + '].a_es', f.a_es]);
  });

  campos.forEach(([label, val]) => {
    if (typeof val !== 'string' || !/<p[\s>]|<\/p>/i.test(val)) return;
    let depth = 0, max = 0;
    const re = /<(\/?)p(\s[^>]*)?>/gi;
    let m;
    while ((m = re.exec(val)) !== null) {
      if (m[1] === '/') {
        if (depth === 0) { huerfanos++; ejemplos.push('HUERFANO ' + g.id + '.' + label); }
        else depth--;
      } else {
        depth++;
        if (depth > 1) { anidados++; if (ejemplos.length < 30) ejemplos.push('ANIDADO ' + g.id + '.' + label + ' @' + m.index); }
        max = Math.max(max, depth);
      }
    }
    if (depth > 0) { sinCerrar++; ejemplos.push('SINCERRAR ' + g.id + '.' + label); }
  });
});

console.log('Guias revisadas: ' + guides.length);
console.log('<p> anidados:        ' + anidados);
console.log('</p> huerfanos:      ' + huerfanos);
console.log('<p> sin cerrar:      ' + sinCerrar);
ejemplos.slice(0, 25).forEach(e => console.log('   ' + e));
