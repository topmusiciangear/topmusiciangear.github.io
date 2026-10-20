// Sustituye en AGENTS.md la seccion de algoritmo/seguridad del recorte por la version rembg.
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'AGENTS.md');
let doc = fs.readFileSync(file, 'utf8');
const replacement = fs.readFileSync(path.join(__dirname, 'agents_block2.md'), 'utf8').trimEnd();

const start = doc.indexOf('### Algoritmo (por qué no deja halo)');
const end = doc.indexOf('### Al añadir un producto o una guía nueva');
if (start < 0 || end < 0 || end < start) {
  console.error('No encontrado el bloque a sustituir');
  process.exit(1);
}
doc = doc.slice(0, start) + replacement + '\n\n' + doc.slice(end);
fs.writeFileSync(file, doc, 'utf8');
console.log('AGENTS.md actualizado');
