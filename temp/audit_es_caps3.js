const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

const COMUNES = ['De', 'La', 'El', 'Los', 'Las', 'Un', 'Una', 'Que', 'Con', 'Para', 'En', 'Y', 'Del', 'Al', 'Lo', 'Su', 'Sus', 'Más', 'Menos', 'Sin', 'Sobre', 'Entre', 'Cómo', 'Cuál', 'Esta', 'Este', 'Estos', 'Estas', 'Es', 'Son', 'No', 'Si', 'Ya', 'Se', 'Cada', 'Todo', 'Todos', 'Toda', 'Todas', 'Otro', 'Otros', 'Otra', 'Antes', 'Después', 'Ahora', 'Solo', 'También', 'Dentro', 'Fuera', 'Desde', 'Hasta', 'Cuando', 'Porque', 'Aunque', 'Pero', 'Nunca', 'Siempre', 'Casi', 'Algo', 'Uno', 'Mejor', 'Peor', 'Grande', 'Nuevo', 'Viejo', 'Fácil', 'Difícil', 'Rápido', 'Lento', 'Bueno', 'Perfecto', 'Natural', 'Rápida', 'Único', 'Única', 'Correcta', 'Real', 'Cuatro', 'Tres', 'Cinco', 'Do', 'Re', 'Mi', 'Fa', 'Sol'];
const EN_NOMBRE = ['Les Paul', 'BiG SiX', 'Si grave'];
const ACRO = /^[A-Z0-9&]{1,5}(\+|-|\d)*$/;

// divide en segmentos tras : ? . ; y cuenta palabras comunes capitalizadas (la 1a de cada segmento se ignora)
function analizar(txt) {
  const plano = String(txt || '').replace(/<[^>]+>/g, ' ');
  const segmentos = plano.split(/(?<=[:?!;])\s+|\.\s+/);
  const malas = [];
  segmentos.forEach(seg => {
    const palabras = seg.split(/[\s\-–—,()]+/).filter(Boolean);
    palabras.forEach((p, i) => {
      if (i === 0) return;
      const c = p.replace(/^[¿¡"'«*[]/, '');
      if (ACRO.test(c)) return;
      if (!COMUNES.includes(c)) return;
      const ctx = plano.slice(Math.max(0, plano.indexOf(p) - 12), plano.indexOf(p) + 12);
      if (EN_NOMBRE.some(n => ctx.includes(n))) return;
      malas.push(c);
    });
  });
  return malas;
}

const problemas = [];
const push = (guia, campo, txt) => { const m = analizar(txt); if (m.length >= 2) problemas.push({ guia, campo, txt: String(txt), palabras: m }); };
guides.forEach(g => {
  push(g.id, 'title_es', g.title_es);
  push(g.id, 'metaDesc_es', g.metaDesc_es);
  (g.sections || []).forEach((s, i) => push(g.id, 'section[' + i + '].heading_es', s.heading_es));
  (g.faq || []).forEach((f, i) => push(g.id, 'faq[' + i + '].q_es', f.q_es));
});
console.log('titulos/encabezados ES con Title Case: ' + problemas.length + '\n');
problemas.forEach(p => {
  console.log(p.guia + ' [' + p.campo + '] {' + p.palabras.join(', ') + '}');
  console.log('   ' + p.txt.slice(0, 150).replace(/\s+/g, ' ') + '\n');
});
fs.writeFileSync(B + 'temp/titlecase_problems.json', JSON.stringify(problemas, null, 2), 'utf8');