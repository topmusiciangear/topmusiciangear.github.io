const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

// palabras funcionales/comunes que NUNCA van capitalizadas en espanol (salvo la 1a palabra)
const COMUNES = ['De', 'La', 'El', 'Los', 'Las', 'Un', 'Una', 'Unos', 'Una', 'Que', 'Con', 'Para', 'En', 'Y', 'Del', 'Al', 'Lo', 'Su', 'Sus', 'Más', 'Menos', 'Sin', 'Sobre', 'Entre', 'Cómo', 'Cuál', 'Cuál', 'Esta', 'Este', 'Estos', 'Estas', 'Es', 'Son', 'No', 'Si', 'Ya', 'O', 'A', 'E', 'O', 'U', 'Se', 'Le', 'Les', 'Me', 'Te', 'Nos', 'Tu', 'Su', 'Cada', 'Todo', 'Todos', 'Toda', 'Todas', 'Otro', 'Otros', 'Otra', 'Otras', 'Antes', 'Después', 'Ahora', 'Solo', 'También', 'Aún', 'Ya', 'Aún', 'Dentro', 'Fuera', 'Desde', 'Hasta', 'Como', 'Cuando', 'Donde', 'Dónde', 'Porque', 'Aunque', 'Pero', 'Nada', 'Nunca', 'Siempre', 'Casi', 'Algo', 'Nada', 'Uno', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis', 'Siete', 'Ocho', 'Nueve', 'Diez', 'Mejor', 'Peor', 'Grande', 'Pequeño', 'Nuevo', 'Viejo', 'Fácil', 'Difícil', 'Rápido', 'Lento', 'Bueno', 'Malo', 'Perfecto', 'Natural', 'Rápida', 'Lenta', 'Único', 'Única', 'Correcta', 'Correcto', 'Real', 'Latón'];

const ACRO = /^[A-Z0-9&]{1,5}(\+|-|\d)*$/;
function buscar(txt) {
  const out = [];
  const re = /(^|[\s:;,(\-—])([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)/g;
  let m, i = 0;
  const plano = String(txt || '').replace(/<[^>]+>/g, ' ');
  while ((m = re.exec(plano)) !== null) {
    i++;
    const pos = m.index + m[1].length;
    if (i === 1) continue;                       // primera palabra: normal
    const palabra = m[2];
    if (ACRO.test(palabra)) continue;
    if (!COMUNES.includes(palabra)) continue;    // solo palabras comunes
    out.push({ palabra, pos, ctx: plano.slice(Math.max(0, pos - 40), pos + 40).replace(/\s+/g, ' ') });
  }
  return out;
}

const hits = [];
guides.forEach(g => {
  const campos = [['title_es', g.title_es], ['metaDesc_es', g.metaDesc_es]];
  campos.forEach(([k, v]) => { const r = buscar(v); if (r.length) hits.push({ guia: g.id, campo: k, txt: v, r }); });
  (g.sections || []).forEach((s, i) => { const r = buscar(s.heading_es); if (r.length) hits.push({ guia: g.id, campo: 'section[' + i + '].heading_es', txt: s.heading_es, r }); });
  (g.faq || []).forEach((f, i) => { const r = buscar(f.q_es); if (r.length) hits.push({ guia: g.id, campo: 'faq[' + i + '].q_es', txt: f.q_es, r }); });
});
console.log('campos ES con palabras comunes capitalizadas: ' + hits.length + '\n');
hits.forEach(h => {
  console.log(h.guia + ' [' + h.campo + ']');
  console.log('   ' + String(h.txt).slice(0, 130));
  console.log('   -> ' + h.r.map(x => x.palabra).join(', ') + '\n');
});