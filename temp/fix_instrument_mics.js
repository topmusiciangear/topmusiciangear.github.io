// best-instrument-mics: add missing Shure Beta 58A product, fix naming
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
const W = (t) => ({ title: t, title_es: t });

const g = G.find(x => x.id === 'best-instrument-mics');

// Add Shure Beta 58A column
g.productTable.columns.push(W('Shure Beta 58A'));

const rows = {};
g.productTable.rows.forEach(r => { rows[r.label] = r; });
const put = (label, arr) => rows[label].values.push(...arr);

// Add Beta 58A values for all rows
put('Best For', [V('Live vocal workhorse', 'Caballo de batalla vocal en vivo')]);
put('Type', [V('Dynamic', 'Dinámico')]);
put('Polar Pattern', [V('Supercardioid', 'Supercardioide')]);
put('Frequency Response', [V('50 Hz–16 kHz', '50 Hz–16 kHz')]);
put('Sensitivity', [V('-51.5 dBV/Pa (2.7 mV)', '-51,5 dBV/Pa (2,7 mV)')]);
put('Self-Noise', [V('N/A (dynamic)', 'N/A (dinámico)')]);
put('Max SPL', [V('>140 dB', '>140 dB')]);
put('Output Impedance', [V('150 Ω', '150 Ω')]);
put('Signal-to-Noise Ratio', [V('N/A (dynamic)', 'N/A (dinámico)')]);
put('Dynamic Range', [V('N/A (dynamic)', 'N/A (dinámico)')]);
put('THD at Max SPL', [V('<1% @ 140 dB', '<1% @ 140 dB')]);
put('Capsule / Diaphragm', [V('Dynamic capsule', 'Cápsula dinámica')]);
put('Pad & High-Pass Filter', [V('None', 'Ninguno')]);
put('Phantom Power', [V('Not required', 'No requerida')]);
put('Dimensions', [V('165 x 51 mm', '165 x 51 mm')]);
put('Weight', [V('298 g', '298 g')]);

// Fix verdict names to match product columns exactly
const vpc = g.verdictProsCons;
const nameMap = {
  'Sennheiser e906': 'Sennheiser e 906',
  'Sennheiser e604': 'Sennheiser e 604'
};
vpc.forEach(v => {
  if (nameMap[v.name]) {
    v.name = nameMap[v.name];
    v.name_es = nameMap[v.name];
  }
});

// Remove the Shure Beta 58A verdict since we added it as a product column
// Actually, we need to ADD a verdict for Shure Beta 58A since it's now a product
const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
g.verdictProsCons.push(
  VD('Shure Beta 58A',
    ['Supercardioid rejects stage bleed better than SM58', 'Hardened grille survives drops and rough handling', 'Tailored midrange cuts through dense mixes', 'Industry standard for live vocals worldwide'],
    ['Less low-end warmth than SM58', 'Proximity effect can boom on close talkers', 'No onboard switch — needs external HPF', 'Handling noise higher than premium condensers'],
    ['Supercardioide rechaza mejor el bleed de escenario que el SM58', 'Rejilla endurecida aguanta golpes y uso rudo', 'Medios adaptados cortan mezclas densas', 'Estándar de la industria para voces en vivo'],
    ['Menos calidez en graves que el SM58', 'Efecto de proximidad puede boomear en cercanos', 'Sin interruptor a bordo — necesita HPF externo', 'Ruido de manejo superior a condensadores premium'])
);

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('best-instrument-mics: cols=' + g.productTable.columns.length + ' verdict=' + g.verdictProsCons.length);
console.log('Products:', g.productTable.columns.map(c => c.title).join(', '));
console.log('Verdicts:', g.verdictProsCons.map(v => v.name).join(', '));