const fs = require('fs');
const raw = fs.readFileSync('data/guides.json', 'utf8');
const parts = [
  'Las cuerdas de nylon son más suaves',
  'Las cuerdas de nylon son más suaves para las yemas',
  'y dan un tono cálido y cantable',
  'que funciona para estudios clásicos y práctica nocturna.',
  'Las cuerdas de nylon son más suaves para las yemas y dan un tono cálido y cantable que funciona para estudios clásicos y práctica nocturna.'
];
for (const p of parts) console.log((raw.split(JSON.stringify(p)).length - 1), '|', p);
