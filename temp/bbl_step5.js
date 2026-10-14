const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'budget-bass-like-expensive');

const NP = 'Not published (varies by unit)';
const NPE = 'No publicado (varía por unidad)';
const DATA = {
  'Sire Marcus Miller V5 4-String Bass': {
    'Best For': ['Best-feeling build at the price', 'La mejor sensación de construcción por precio'],
    'Estimated Price': ['~$599', '~$599'],
    'Body Wood': ['North American alder', 'Aliso norteamericano'],
    'Neck': ['Roasted maple C, 20 frets', 'Maple tostado en C, 20 trastes'],
    'Frets & Fretboard': ['20, roasted maple, rolled edges', '20, maple tostado, bordes redondeados'],
    'Pickups': ['2x Marcus Vintage-J Revolution', '2x Marcus Vintage-J Revolution'],
    'Active/Passive': ['Passive', 'Pasivo'],
    'Scale Length': ['34 in (864 mm)', '34" (864 mm)'],
    'Electronics': ['2x volume, master tone', '2x volumen, tono maestro'],
    'Tuners': ['Premium open-gear', 'Open-gear premium'],
    'Weight': [NP, NPE]
  },
  'Schecter Stiletto Stealth 4 Bass': {
    'Best For': ['Blacked-out metal tone', 'Tono negro para metal'],
    'Estimated Price': ['~$649', '~$649'],
    'Body Wood': ['Basswood', 'Tilo'],
    'Neck': ['Maple Thin C, 6-bolt, 24 frets', 'Maple Thin C, 6 pernos, 24 trastes'],
    'Frets & Fretboard': ['24 X-Jumbo, rosewood, 16" radius', '24 X-Jumbo, palisandro, radio 16"'],
    'Pickups': ['Diamond P + SuperRock MM', 'Diamond P + SuperRock MM'],
    'Active/Passive': ['Active', 'Activo'],
    'Scale Length': ['34 in (864 mm)', '34" (864 mm)'],
    'Electronics': ['Master vol, blend, active 2-band EQ', 'Vol maestro, blend, EQ activa 2 bandas'],
    'Tuners': ['Schecter', 'Schecter'],
    'Weight': [NP, NPE]
  },
  'ESP LTD B-204SM Bass Guitar': {
    'Best For': ['Spalted maple looks, stage volume', 'Aspecto de arce moteado, volumen de escenario'],
    'Estimated Price': ['~$599–$649', '~$599–$649'],
    'Body Wood': ['Ash, spalted maple top', 'Fresno, tapa de arce moteado'],
    'Neck': ['5-pc maple/jatoba thin U, 24 frets', '5 piezas maple/jatoba en U fina, 24 trastes'],
    'Frets & Fretboard': ['24 XJ, rosewood, 40 mm nut', '24 XJ, palisandro, cejuela 40 mm'],
    'Pickups': ['2x ESP SB-4 humbuckers', '2x humbuckers ESP SB-4'],
    'Active/Passive': ['Passive + switchable active EQ', 'Pasivo + EQ activa conmutable'],
    'Scale Length': ['34 in (864 mm)', '34" (864 mm)'],
    'Electronics': ['Vol, balance, ABQ-3 active 3-band', 'Vol, balance, ABQ-3 activa 3 bandas'],
    'Tuners': ['LTD black nickel', 'LTD black nickel'],
    'Weight': [NP, NPE]
  },
  'Fender Player II Precision Bass': {
    'Best For': ['Stage-level P-Bass without the Pro price', 'P-Bass de nivel escenario sin precio Pro'],
    'Estimated Price': ['~$849.99', '~$849.99'],
    'Body Wood': ['Alder', 'Aliso'],
    'Neck': ['Modern C maple, 20 frets', 'Modern C de maple, 20 trastes'],
    'Frets & Fretboard': ['20, maple, 9.5" radius', '20, arce, radio 9,5"'],
    'Pickups': ['Player Series Alnico V split coil', 'Split-coil Alnico V serie Player'],
    'Active/Passive': ['Passive', 'Pasivo'],
    'Scale Length': ['34 in (864 mm)', '34" (864 mm)'],
    'Electronics': ['Volume, tone', 'Volumen, tono'],
    'Tuners': ['Fender', 'Fender'],
    'Weight': ['8.3 lb (3.8 kg)', '3,8 kg']
  },
  'Fender Player II Jazz Bass': {
    'Best For': ['Best-value Fender for funk and R&B', 'El Fender con mejor precio para funk y R&B'],
    'Estimated Price': ['~$849.99', '~$849.99'],
    'Body Wood': ['Alder', 'Aliso'],
    'Neck': ['Modern C maple, 20 frets', 'Modern C de maple, 20 trastes'],
    'Frets & Fretboard': ['20, rosewood or maple', '20, palisandro o arce'],
    'Pickups': ['2x Player Series Alnico V J', '2x J Alnico V serie Player'],
    'Active/Passive': ['Passive', 'Pasivo'],
    'Scale Length': ['34 in (864 mm)', '34" (864 mm)'],
    'Electronics': ['2x volume, tone', '2x volumen, tono'],
    'Tuners': ['Fender', 'Fender'],
    'Weight': ['8.2 lb (3.7 kg)', '3,7 kg']
  }
};
const ti = g.productTable.columns.map(c => c.title);
let filled = 0;
g.productTable.rows.forEach(r => {
  Object.keys(DATA).forEach(t => {
    const i = ti.indexOf(t);
    if (i === -1) die('columna no encontrada: ' + t);
    const pair = DATA[t][r.label];
    if (!pair) die('falta ' + t + ' / ' + r.label);
    r.values[i] = { value: pair[0], value_es: pair[1] };
    filled++;
  });
});
console.log('celdas rellenadas: ' + filled);
const bad = g.productTable.rows.flatMap(r => r.values.map((v, i) => (v && v.value && v.value_es ? null : r.label + '->' + ti[i])).filter(Boolean));
if (bad.length) die('siguen faltando: ' + bad.join(', '));
console.log('tabla completa EN+ES: ' + g.productTable.rows.length + ' filas x ' + ti.length + ' columnas');
g.productTable.rows.forEach(r => console.log('  [' + r.label + '] ' + r.values.map(v => v.value).join(' | ')));
fs.writeFileSync(gj, JSON.stringify(guides, null, 2));