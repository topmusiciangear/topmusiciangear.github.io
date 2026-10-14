const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));

console.log('=== AUDITORIA DIRECTA: pros/cons + veredictos + conclusiones ===\n');

const problemas = [];

// 1. Verificar que pros/cons no tengan specs obviamente imposibles
guides.forEach(g => {
  (g.verdictProsCons || []).forEach(v => {
    (v.pros || []).forEach((p, i) => {
      // Check for specs that are obviously wrong
      if (/(\d+)\s*dB\s*SPL/i.test(p)) {
        const m = p.match(/(\d+)\s*dB\s*SPL/i);
        const spl = parseInt(m[1]);
        if (spl > 200) {
          problemas.push({ guia: g.id, producto: v.name, campo: 'pro[' + i + ']', texto: p, problema: 'SPL > 200dB imposible' });
        }
      }
      // Check for wrong connector types
      if (/USB-C/i.test(g.title) && /USB-B/i.test(p)) {
        problemas.push({ guia: g.id, producto: v.name, campo: 'pro[' + i + ']', texto: p, problema: 'USB-C vs USB-B mismatch' });
      }
    });

    (v.cons || []).forEach((c, i) => {
      if (/(\d+)\s*dB\s*SPL/i.test(c)) {
        const m = c.match(/(\d+)\s*dB\s*SPL/i);
        const spl = parseInt(m[1]);
        if (spl > 200) {
          problemas.push({ guia: g.id, producto: v.name, campo: 'con[' + i + ']', texto: c, problema: 'SPL > 200dB imposible' });
        }
      }
    });
  });
});

// 2. Verificar traducciones ES con calcos conocidos
const calcos = [
  /via Bluetooth/i, /via USB/i, /suena como/i, /punto justo/i,
  /es el mejor para/i, /lo que hace que/i, /vale la pena/i,
  /a un DAW/i
];

guides.forEach(g => {
  const allEs = [];
  (g.sections || []).forEach(s => { if (s.content_es) allEs.push(s.content_es); });
  if (g.verdict_es) allEs.push(g.verdict_es);
  if (g.conclusion_es) allEs.push(g.conclusion_es);
  (g.verdictProsCons || []).forEach(v => {
    (v.pros_es || []).forEach(p => allEs.push(p));
    (v.cons_es || []).forEach(c => allEs.push(c));
  });

  allEs.forEach(texto => {
    calcos.forEach(calco => {
      if (calco.test(texto)) {
        const match = texto.match(calco);
        problemas.push({ guia: g.id, producto: '-', campo: 'ES', texto: texto.slice(0, 100), problema: 'Calco: ' + match[0] });
      }
    });
  });
});

// 3. Verificar contradicciones EN/ES en pros/cons (mismo numero de items)
guides.forEach(g => {
  (g.verdictProsCons || []).forEach(v => {
    if (v.pros && v.pros_es && v.pros.length !== v.pros_es.length) {
      problemas.push({ guia: g.id, producto: v.name, campo: 'pros', texto: 'EN:' + v.pros.length + ' ES:' + v.pros_es.length, problema: 'Mismatch numero de pros' });
    }
    if (v.cons && v.cons_es && v.cons.length !== v.cons_es.length) {
      problemas.push({ guia: g.id, producto: v.name, campo: 'cons', texto: 'EN:' + v.cons.length + ' ES:' + v.cons_es.length, problema: 'Mismatch numero de cons' });
    }
  });
});

console.log('Total problemas encontrados:', problemas.length);
console.log('');

// Group by type
const grouped = {};
problemas.forEach(p => {
  const key = p.problema.split(':')[0];
  if (!grouped[key]) grouped[key] = [];
  grouped[key].push(p);
});

Object.keys(grouped).sort().forEach(tipo => {
  console.log('--- ' + tipo + ' (' + grouped[tipo].length + ') ---');
  grouped[tipo].slice(0, 5).forEach(p => {
    console.log('  ' + p.guia + ' / ' + p.producto + ' [' + p.campo + ']');
    console.log('    ' + p.texto.slice(0, 120));
  });
  if (grouped[tipo].length > 5) console.log('  ... y ' + (grouped[tipo].length - 5) + ' mas');
  console.log('');
});