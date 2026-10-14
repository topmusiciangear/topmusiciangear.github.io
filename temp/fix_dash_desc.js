const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));

// Las dos ultimas descripciones que el recorte automatico dejo terminadas en
// raya suelta ("... Both are heavy —."). Se cierra la frase con la palabra real.
const FIX = {
  'pro-headphones': { description: 'In 2026, I mastered on the LCD-X for years and tested the MX4. The X is the proven pro; the MX4 is the new standard-bearer.' },
  'best-instrument-mics': { description_es: 'Mejores micrófonos para grabar cada instrumento 2026: SM57, condensadores, Cinta y dinámicos para guitarra, bajo, batería, acústica, metales y cuerdas.' }
};

let n = 0;
Object.keys(FIX).forEach(function (id) {
  const g = guides.find(x => x.id === id);
  Object.keys(FIX[id]).forEach(function (k) {
    if (!g[k]) { console.log('[!!] ' + id + ' sin ' + k); return; }
    console.log('[' + id + '] ' + k);
    console.log('   ANTES: ...' + g[k].slice(-60));
    console.log('   AHORA: ...' + FIX[id][k].slice(-60));
    g[k] = FIX[id][k]; n++;
  });
});

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('\ncorregidas: ' + n);