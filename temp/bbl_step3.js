const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'budget-bass-like-expensive');

// =================== 1. TABLA 6 -> 10 ===================
const ORDER = [
  "Squier Classic Vibe '60s Jazz Bass",
  'Sire Marcus Miller V5 4-String Bass',
  'Sterling by Music Man StingRay Ray4',
  'Yamaha TRBX304',
  'Ibanez SR300E',
  'Schecter Stiletto Stealth 4 Bass',
  'ESP LTD B-204SM Bass Guitar',
  'Fender Player II Precision Bass',
  'Fender Player II Jazz Bass',
  "Epiphone Thunderbird '64 Bass"
];
const NP = 'Not published (varies by unit)';
const NPE = 'No publicado (varía por unidad)';

// valores por COLUMNA nueva (las 4 primeras ya existen en la tabla)
const NEW = {
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
  'Sterling by Music Man StingRay Ray4': null, // ya existe
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

// precios corregidos en columnas que ya existian
const PRICE_FIX = {
  'Schecter Stiletto Stealth 4 Bass': ['~$649', '~$649'],
  'ESP LTD B-204SM Bass Guitar': ['~$599–$649', '~$599–$649']
};

const cols = g.productTable.columns;
const outCols = [];
const outVals = {};
ORDER.forEach(t => {
  const i = cols.findIndex(c => c.title === t);
  if (i > -1) {
    const src = cols[i];
    outCols.push({ title: src.title, title_es: src.title_es || src.title });
    const vals = {};
    g.productTable.rows.forEach(r => { vals[r.label] = r.values[i]; });
    outVals[t] = vals;
  } else {
    if (!NEW[t]) die('columna nueva sin datos: ' + t);
    outCols.push({ title: t, title_es: t });
    outVals[t] = NEW[t];
  }
});
const kept = ORDER.filter(t => cols.some(c => c.title === t)).length;
console.log('columnas conservadas: ' + kept + ' | nuevas: ' + (ORDER.length - kept) + ' | eliminadas: ' + (cols.length - kept));

// aplicar correcciones de precio
Object.keys(PRICE_FIX).forEach(t => { outVals[t]['Estimated Price'] = { value: PRICE_FIX[t][0], value_es: PRICE_FIX[t][1] }; });

g.productTable.columns = outCols;
g.productTable.rows.forEach(r => {
  r.values = ORDER.map(t => {
    const v = outVals[t][r.label];
    if (!v) die('falta valor: ' + t + ' / ' + r.label);
    return { value: v.value, value_es: v.value_es || v.value };
  });
});
console.log('tabla: 6 -> ' + g.productTable.columns.length + ' columnas, ' + g.productTable.rows.length + ' filas');
console.log('filas desalineadas: ' + g.productTable.rows.filter(r => r.values.length !== 10).length);

// =================== 2. VEREDICTOS PROS/CONS ===================
const DROP_NAMES = ['Squier Affinity Series Precision Bass PJ', 'Fender American Professional II Jazz Bass',
  'Fender American Professional II Precision Bass', 'Fender American Ultra II Precision Bass'];
const before = g.verdictProsCons.length;
g.verdictProsCons = g.verdictProsCons.filter(v => !DROP_NAMES.includes(v.name));
console.log('veredictos fuera: ' + (before - g.verdictProsCons.length) + ' (' + DROP_NAMES.join(', ') + ')');

const add = (name, pros, cons, pros_es, cons_es) => g.verdictProsCons.push({ name, name_es: name, pros, cons, pros_es, cons_es });

add('Sire Marcus Miller V5 4-String Bass',
  ['Roasted hard maple neck with Edgeless rolled edges', 'Marcus Vintage-J Revolution set in 70s spacing', 'Marcus Miller Vintage-S bridge and bone nut', 'Genuinely passive — no battery, no EQ menu'],
  ['Fully passive, so no EQ for a bad amp', 'Premium open-gear tuners need regular restringing', 'No case or gig bag in most regions', 'Generic hardware betrays the vintage styling'],
  ['Mástil de maple duro tostado con bordes Edgeless', 'Set Marcus Vintage-J Revolution con separación de los 70', 'Puente Marcus Miller Vintage-S y cejuela de hueso', 'Realmente pasivo: sin batería ni menús'],
  ['Totalmente pasivo: sin EQ para un ampli malo', 'Clavijas open-gear premium piden re-afinar', 'Sin funda ni gig bag en casi ninguna región', 'El hardware genérico traiciona el estilo vintage']);

add('Schecter Stiletto Stealth 4 Bass',
  ['Schecter Diamond P and SuperRock MM pickups, serious output', 'Lightweight basswood body survives long rehearsals', 'Thin C neck with a 16-inch radius plays fast and bendable', 'Blacked-out hardware and 24 X-Jumbo fretwire'],
  ['Only a 2-band active EQ for shaping', 'S-Tek bridge is workmanlike, not exotic', 'No vintage warmth — Motown and jazz want another voice', 'Schecter Direct lists it out of stock'],
  ['Pastillas Diamond P y SuperRock MM con salida seria', 'Cuerpo ligero de tilo aguanta ensayos largos', 'Mástil Thin C con radio 16: rápido y para bending', 'Herrajes ennegrecidos y trastes 24 X-Jumbo'],
  ['Solo EQ activa de 2 bandas para moldear', 'Puente S-Tek funcional, nada exótico', 'Sin calidez vintage: Motown y jazz piden otra voz', 'Schecter Direct lo marca agotado']);

add('ESP LTD B-204SM Bass Guitar',
  ['Spalted maple top over ash looks stage-ready out of the box', 'Passive SB-4 humbuckers plus switchable ABQ-3 3-band EQ', '24 XJ frets and a fast thin-U neck for technical playing', 'Lightweight ash body suits long gigs'],
  ['Deep U profile and 40 mm nut suit experienced hands', 'Switchable electronics mean one more pre-show setting', 'Tone is clear and modern, not eccentric vintage', 'No case included'],
  ['Tapa de arce moteado sobre Fresno, lista para escenario', 'Humbuckers SB-4 pasivas más EQ ABQ-3 de 3 bandas conmutable', '24 trastes XJ y mástil rápido en U fina para lo técnico', 'Cuerpo ligero de fresno paralaimas largas'],
  ['Perfil en U profundo y cejuela de 40 mm piden manos expertas', 'Electrónica conmutable: un ajuste más antes de actuar', 'Tono claro y moderno, no vintage ecléctico', 'Sin funda incluida']);

// reordenar segun la tabla
const ordNames = ORDER.slice();
g.verdictProsCons.sort((a, b) => ordNames.indexOf(a.name) - ordNames.indexOf(b.name));
console.log('veredictos: ' + g.verdictProsCons.length);
const t = g.productTable.columns.map(c => c.title);
const vo = g.verdictProsCons.map(v => v.name);
if (JSON.stringify(t) !== JSON.stringify(vo)) console.log('!! orden distinto tabla/veredictos:\n  tabla: ' + t.join(' | ') + '\n  verd:  ' + vo.join(' | '));
else console.log('orden tabla == veredictos');

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('\nSTEP3 OK');