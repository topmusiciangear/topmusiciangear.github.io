const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));

console.log('=== AUDITORIA: Patrones de traduccion artificial ===\n');

const problemas = [];

// Patrones comunes de traduccion artificial / AI-sounding
const patrones = [
  { regex: /a un DAW/g, desc: '"a un DAW" (calco de "to a DAW")' },
  { regex: /via Bluetooth/g, desc: '"via Bluetooth" (calco de "via") -> "por Bluetooth"' },
  { regex: /via USB/g, desc: '"via USB" -> "por USB"' },
  { regex: /es el mejor para/g, desc: '"es el mejor para" -> "es ideal para"' },
  { regex: /punto justo/g, desc: '"punto justo" (calco de "sweet spot") -> "punto ideal"' },
  { regex: /resolver eventos/g, desc: '"resolver eventos" -> "cubrir eventos"' },
  { regex: /atrás/g, desc: '"atrás" (calco de "back/behind")' },
  { regex: /caballos de batalla/g, desc: '"caballos de batalla" (calco de "workhorses")' },
  { regex: /grabacion/g, desc: '"grabacion" sin tilde -> "grabación"' },
  { regex: /tambien/g, desc: '"tambien" sin tilde -> "también"' },
  { regex: /conexion/g, desc: '"conexion" sin tilde -> "conexión"' },
  { regex: /opcion/g, desc: '"opcion" sin tilde -> "opción"' },
  { regex: /informacion/g, desc: '"informacion" sin tilde -> "información"' },
  { regex: /solucion/g, desc: '"solucion" sin tilde -> "solución"' },
  { regex: /condicion/g, desc: '"condicion" sin tilde -> "condición"' },
  { regex: /razon/g, desc: '"razon" sin tilde -> "razón"' },
  { regex: /funcion/g, desc: '"funcion" sin tilde -> "función"' },
  { regex: /aplicacion/g, desc: '"aplicacion" sin tilde -> "aplicación"' },
  { regex: /configuracion/g, desc: '"configuracion" sin tilde -> "configuración"' },
  { regex: /seleccion/g, desc: '"seleccion" sin tilde -> "selección"' },
  { regex: /descripcion/g, desc: '"descripcion" sin tilde -> "descripción"' },
  { regex: /microfono/g, desc: '"microfono" sin tilde -> "micrófono"' },
  { regex: /cancelacion/g, desc: '"cancelacion" sin tilde -> "cancelación"' },
  { regex: /suena como/g, desc: '"suena como" (calco de "sounds like")' },
  { regex: /en terminos de/g, desc: '"en terminos de" sin tilde -> "en términos de"' },
  { regex: /en comparacion con/g, desc: '"en comparacion con" -> "en comparación con"' },
  { regex: /vale la pena/g, desc: '"vale la pena" (calco de "worth it")' },
  { regex: /lo que hace que/g, desc: '"lo que hace que" (calco de "which makes")' },
];

let totalProblemas = 0;
guides.forEach(g => {
  const secciones = [];
  (g.sections || []).forEach(s => {
    if (s.content_es) secciones.push({ id: g.id + ' section "' + (s.heading || '').slice(0,30) + '"', texto: s.content_es });
  });
  if (g.intro_es) secciones.push({ id: g.id + ' intro', texto: g.intro_es });
  if (g.verdict_es) secciones.push({ id: g.id + ' verdict', texto: g.verdict_es });
  if (g.conclusion_es) secciones.push({ id: g.id + ' conclusion', texto: g.conclusion_es });

  (g.verdictProsCons || []).forEach(v => {
    (v.pros_es || []).forEach((p, i) => secciones.push({ id: g.id + ' ' + v.name + ' pro[' + i + ']', texto: p }));
    (v.cons_es || []).forEach((c, i) => secciones.push({ id: g.id + ' ' + v.name + ' con[' + i + ']', texto: c }));
  });

  secciones.forEach(sec => {
    patrones.forEach(pat => {
      if (pat.regex.test(sec.texto)) {
        const match = sec.texto.match(pat.regex);
        problemas.push({
          guia: sec.id,
          patron: pat.desc,
          match: match[0],
          contexto: sec.texto.slice(Math.max(0, sec.texto.indexOf(match[0]) - 50), sec.texto.indexOf(match[0]) + match[0].length + 50)
        });
      }
    });
  });
});

console.log('Total problemas encontrados:', problemas.length);
console.log('');

// Group by pattern
const grouped = {};
problemas.forEach(p => {
  if (!grouped[p.patron]) grouped[p.patron] = [];
  grouped[p.patron].push(p);
});

Object.keys(grouped).sort().forEach(patron => {
  console.log('--- ' + patron + ' (' + grouped[patron].length + ') ---');
  grouped[patron].slice(0, 3).forEach(p => {
    console.log('  ' + p.guia);
    console.log('    ...' + p.contexto.replace(/\n/g, ' ').slice(0, 120) + '...');
  });
  if (grouped[patron].length > 3) console.log('  ... y ' + (grouped[patron].length - 3) + ' mas');
  console.log('');
});