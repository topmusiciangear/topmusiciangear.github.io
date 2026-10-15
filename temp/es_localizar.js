const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');
if (!guia) { console.log('guia no encontrada'); process.exit(1); }

const FRASES = [
  'Cada montaje deja dinero en la mesa',
  'depende de qué grabes',
  'graba cada explosiva',
  'ningún EQ limpia bien',
  'un segundo te deja microfonear',
  'sin DI ni pelear por las dos entradas',
  'Si grabas fuentes fuertes',
  'arruina el rendimiento',
  'Si sigues con auriculares por la noche',
  'mueve más la sala que cualquier mejora suelta'
];

const json = JSON.stringify(guia, null, 1);
console.log('=== LOCALIZACION EN starter-studio ===\n');
FRASES.forEach(f => {
  const n = (json.match(new RegExp(f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')) || []).length;
  console.log((n ? 'x' + n : '-  ') + '  "' + f + '"');
});

// volcar el contexto de cada una
console.log('\n\n=== CONTEXTO ===\n');
FRASES.forEach(f => {
  let i = json.indexOf(f);
  if (i < 0) i = json.toLowerCase().indexOf(f.toLowerCase());
  if (i < 0) { console.log('\n--- "' + f + '" NO ENCONTRADA ---'); return; }
  const ini = Math.max(0, i - 230), fin = Math.min(json.length, i + f.length + 260);
  console.log('\n--- "' + f + '" ---');
  console.log(json.slice(ini, fin));
});
