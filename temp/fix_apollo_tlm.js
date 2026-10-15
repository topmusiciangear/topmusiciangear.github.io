const fs = require('fs');
const p = 'C:/Users/Daniel/projects/topmusiciangear/temp/anyadir_apollo_tlm.js';
let s = fs.readFileSync(p, 'utf8');
const malos = [
  ['un rediseño del circuito Apollo 6110', 'un rediseño del circuito Apollo 6110'],
  ['losGFRJW dear microphones de arriba', 'los micrófonos de arriba']
];
malos.forEach(([v, n]) => {
  if (s.indexOf(v) > -1) { s = s.replace(v, n); console.log('corregido: ' + v.slice(0, 40)); }
});
fs.writeFileSync(p, s, 'utf8');

// buscar restos sospechosos
const raros = [...s.matchAll(/[a-zA-Zà-ú]{2,}[A-ZÀ-Ú]{2,}[a-zA-Zà-ú]{2,}/g)]
  .map(m => m[0])
  .filter(w => !/^(DSP|USB|THUNDERBOLT|Circuitry|Class|Kevlar|Silk|Waveguide|Image|Boundary|Signal|Linkwitz|Riley|Room|Control|Stream|Essentials|Auto|Thunderbolt|Unison|FIRMWARE|NEUMANN|This|The)$/.test(w));
console.log('\npalabras raras restantes: ' + (raros.length ? [...new Set(raros)].join(', ') : 'ninguna'));
try { new Function(s); console.log('sintaxis: OK'); } catch (e) { console.log('SINTAXIS ROTA: ' + e.message); }
