const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

const COMUNES = ['De', 'La', 'El', 'Los', 'Las', 'Un', 'Una', 'Que', 'Con', 'Para', 'En', 'Y', 'Del', 'Al', 'Lo', 'Su', 'Sus', 'Más', 'Menos', 'Sin', 'Sobre', 'Entre', 'Cómo', 'Cuál', 'Esta', 'Este', 'Estos', 'Estas', 'Es', 'Son', 'No', 'Si', 'Ya', 'Se', 'Cada', 'Todo', 'Todos', 'Toda', 'Todas', 'Otro', 'Otros', 'Otra', 'Antes', 'Después', 'Ahora', 'Solo', 'También', 'Dentro', 'Fuera', 'Desde', 'Hasta', 'Cuando', 'Porque', 'Aunque', 'Pero', 'Nunca', 'Siempre', 'Casi', 'Algo', 'Uno', 'Mejor', 'Peor', 'Grande', 'Nuevo', 'Viejo', 'Fácil', 'Difícil', 'Rápido', 'Lento', 'Bueno', 'Perfecto', 'Natural', 'Rápida', 'Único', 'Única', 'Correcta', 'Real', 'Cuatro', 'Tres', 'Cinco', 'Do', 'Re', 'Mi', 'Fa', 'Sol'];
const EN_NOMBRE = ['Les Paul', 'Paul', 'BiG SiX', 'Si grave', 'SSL BiG'];
const ACRO = /^[A-Z0-9&]{1,5}(\+|-|\d)*$/;

function analizar(txt) {
  const plano = String(txt || '').replace(/<[^>]+>/g, ' ');
  const re = /(^|[\s:;,(\-—])([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)/g;
  let m, i = 0;
  const graves = [];
  while ((m = re.exec(plano)) !== null) {
    i++;
    const pos = m.index + m[1].length;
    if (i === 1) continue;
    const prev = m[1].trim();
    const palabra = m[2];
    if (ACRO.test(palabra)) continue;
    if (!COMUNES.includes(palabra)) continue;
    const ctx = plano.slice(Math.max(0, pos - 12), pos + 12);
    if (EN_NOMBRE.some(n => ctx.includes(n))) continue;
    if (prev === ':' || prev === '?') continue;
    graves.push(palabra);
  }
  return graves;
}

const problemas = [];
const push = (guia, campo, txt) => { const g = analizar(txt); if (g.length) problemas.push({ guia, campo, txt: String(txt), palabras: g }); };

guides.forEach(g => {
  push(g.id, 'title_es', g.title_es);
  push(g.id, 'metaDesc_es', g.metaDesc_es);
  (g.sections || []).forEach((s, i) => push(g.id, 'section[' + i + '].heading_es', s.heading_es));
  (g.faq || []).forEach((f, i) => push(g.id, 'faq[' + i + '].q_es', f.q_es));
  (g.verdictProsCons || []).forEach((v, i) => {
    push(g.id, 'vpc[' + i + '].pros_es[' + (v.name_es || v.name) + ']', (v.pros_es || []).join(' '));
    push(g.id, 'vpc[' + i + '].cons_es[' + (v.name_es || v.name) + ']', (v.cons_es || []).join(' '));
  });
  push(g.id, 'conclusion_es', g.conclusion_es);
  push(g.id, 'verdict_es', g.verdict_es);
});

console.log('campos ES con Title Case: ' + problemas.length + '\n');
problemas.forEach(p => {
  console.log(p.guia + ' [' + p.campo + '] {' + p.palabras.join(', ') + '}');
  console.log('   ' + p.txt.slice(0, 150).replace(/\s+/g, ' ') + '\n');
});
fs.writeFileSync(B + 'temp/titlecase_problems.json', JSON.stringify(problemas, null, 2), 'utf8');