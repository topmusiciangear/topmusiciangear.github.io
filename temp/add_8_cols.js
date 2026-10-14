const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

// 0. Corregir desc Enya 295 (pastillas: oficial HH Alnico II/V)
const pj = BASE + 'data/products.json';
const P = JSON.parse(fs.readFileSync(pj, 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const e295 = arr.find(p => p.id === 295);
console.log('desc295 EN actual:', e295.desc.slice(0, 260));
console.log('desc295 ES actual:', (e295.desc_es || '').slice(0, 260));
if (e295.desc.includes('a single-coil neck and humbucker bridge pickup')) {
  e295.desc = e295.desc.split('a single-coil neck and humbucker bridge pickup').join('an Alnico II neck humbucker and Alnico V bridge humbucker');
  console.log('desc295 EN corregida');
}
fs.writeFileSync(pj, JSON.stringify(P, null, 2));

const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));

function addColumns(guideId, newCols) {
  const g = guides.find(x => x.id === guideId);
  Object.keys(newCols).forEach(title => {
    if (g.productTable.columns.some(c => c.title === title)) {
      console.log(guideId + ': ' + title + ' ya existe, salto');
      return;
    }
    g.productTable.columns.push({ title, title_es: title });
    const vals = newCols[title];
    g.productTable.rows.forEach(r => {
      const v = vals[r.label];
      if (!v) { console.log('!! ' + guideId + '/' + title + ': sin valores para fila ' + r.label); process.exit(1); }
      r.values.push({ value: v[0], value_es: v[1] });
      if (r.values.length !== g.productTable.columns.length) {
        console.log('!! desalineada ' + guideId + '/' + r.label); process.exit(1);
      }
    });
    console.log(guideId + ': columna ' + title + ' anadida');
  });
}

// ---------- beginner-guitar ----------
addColumns('beginner-guitar', {
  'Yamaha C40 Classical (Nylon) Guitar': {
    'Best For': ['Nylon-string classical for beginners', 'Clásica de nailon para principiantes'],
    'Estimated Price': ['~$169.99', '~$169.99'],
    'Body Wood': ['Spruce / meranti', 'Picea / meranti'],
    'Neck': ['Nato, 25.6 in', 'Nato, 25,6"'],
    'Frets & Fretboard': ['19, rosewood', '19, palo rosa'],
    'Pickups': ['None (acoustic)', 'Ninguna (acústica)'],
    'Scale Length': ['25.6 in (650 mm)', '25,6" (650 mm)'],
    'Tuners': ['Chrome', 'Cromados'],
    'Weight': ['—', '—'],
  },
  'Squier Sonic Mustang': {
    'Best For': ['Short-scale electric for small hands', 'Eléctrica de escala corta para manos pequeñas'],
    'Estimated Price': ['~$209', '~$209'],
    'Body Wood': ['Poplar', 'Álamo'],
    'Neck': ['Maple, 22 frets', 'Arce, 22 trastes'],
    'Frets & Fretboard': ['22, maple/laurel', '22, arce/laurel'],
    'Pickups': ['2 single-coils (SS)', '2 single-coils (SS)'],
    'Scale Length': ['24 in (610 mm)', '24" (610 mm)'],
    'Tuners': ['Die-cast sealed', 'Fundidos sellados'],
    'Weight': ['—', '—'],
  },
  'Enya Nova Go Sonic Smart Electric Guitar': {
    'Best For': ['Travel-proof smart electric, no amp', 'Eléctrica inteligente de viaje, sin ampli'],
    'Estimated Price': ['~$369.99', '~$369.99'],
    'Body Wood': ['Carbon fiber', 'Fibra de carbono'],
    'Neck': ['Carbon fiber, asymmetrical', 'Fibra de carbono, asimétrico'],
    'Frets & Fretboard': ['22, carbon fiber', '22, fibra de carbono'],
    'Pickups': ['2 humbuckers (Alnico II/V)', '2 humbuckers (Alnico II/V)'],
    'Scale Length': ['24.75 in (629 mm)', '24,75" (629 mm)'],
    'Tuners': ['—', '—'],
    'Weight': ['6.6 lb (3.0 kg)', '3,0 kg'],
  },
});

// ---------- best-digital-mixers ----------
addColumns('best-digital-mixers', {
  'Soundcraft Ui24R': {
    'Best For': ['Tablet-controlled rack mixer for bands', 'Mesa de rack por tablet para bandas'],
    'Estimated Price': ['~$1,369', '~$1,369'],
    'Type': ['digital rack mixer', 'Mesa digital de rack'],
    'Channels': ['24 (20 preamps)', '24 (20 previos)'],
    'Preamps': ['20 Studer', '20 Studer'],
    'EQ': ['4-band parametric', '4 bandas paramétrico'],
    'Aux Sends': ['8 aux buses', '8 buses aux'],
    'Built-in FX': ['3 Lexicon FX + dbx', '3 FX Lexicon + dbx'],
    'Connectivity': ['Wi-Fi, Ethernet, USB multitrack', 'Wi-Fi, Ethernet, USB multipista'],
    'Weight': ['11.2 lb (5.1 kg)', '5,1 kg'],
  },
  'PreSonus StudioLive 32SC': {
    'Best For': ['32 channels with motorized faders', '32 canales con faders motorizados'],
    'Estimated Price': ['~$1,899', '~$1,899'],
    'Type': ['digital mixing console', 'Consola digital de mezcla'],
    'Channels': ['32 (16 preamps)', '32 (16 previos)'],
    'Preamps': ['16 XMAX-R', '16 XMAX-R'],
    'EQ': ['4-band parametric', '4 bandas paramétrico'],
    'Aux Sends': ['16 FlexMixes', '16 FlexMixes'],
    'Built-in FX': ['4 FLEX FX buses', '4 buses FLEX FX'],
    'Connectivity': ['USB 64x64, AVB, SD', 'USB 64x64, AVB, SD'],
    'Weight': ['23.2 lb (10.5 kg)', '10,5 kg'],
  },
  'Soundcraft Ui16': {
    'Best For': ['Cheapest tablet mixer for small gigs', 'Mesa por tablet más barata para bolos pequeños'],
    'Estimated Price': ['~$559', '~$559'],
    'Type': ['digital rack mixer', 'Mesa digital de rack'],
    'Channels': ['16 (12 preamps)', '16 (12 previos)'],
    'Preamps': ['12 Soundcraft', '12 Soundcraft'],
    'EQ': ['4-band parametric', '4 bandas paramétrico'],
    'Aux Sends': ['4 aux outputs', '4 salidas aux'],
    'Built-in FX': ['4 Lexicon FX', '4 FX Lexicon'],
    'Connectivity': ['Wi-Fi, Ethernet, USB 2-track', 'Wi-Fi, Ethernet, USB 2 pistas'],
    'Weight': ['7.9 lb (3.6 kg)', '3,6 kg'],
  },
  'Yamaha DM3S': {
    'Best For': ['Compact Yamaha console with touchscreen', 'Consola Yamaha compacta con táctil'],
    'Estimated Price': ['~$1,699', '~$1,699'],
    'Type': ['digital mixing console', 'Consola digital de mezcla'],
    'Channels': ['22 (16 preamps)', '22 (16 previos)'],
    'Preamps': ['16 D-PRE', '16 D-PRE'],
    'EQ': ['4-band parametric', '4 bandas paramétrico'],
    'Aux Sends': ['6 Mix buses', '6 buses Mix'],
    'Built-in FX': ['2 FX buses, 18 effects', '2 buses FX, 18 efectos'],
    'Connectivity': ['USB 18x18, network', 'USB 18x18, red'],
    'Weight': ['14.3 lb (6.5 kg)', '6,5 kg'],
  },
  'Behringer WING Compact': {
    'Best For': ['48-channel flagship in compact size', 'Buque insignia de 48 canales en compacto'],
    'Estimated Price': ['~$2,799', '~$2,799'],
    'Type': ['digital mixing console', 'Consola digital de mezcla'],
    'Channels': ['48 (24 preamps)', '48 (24 previos)'],
    'Preamps': ['24 Midas PRO', '24 Midas PRO'],
    'EQ': ['6-band parametric', '6 bandas paramétrico'],
    'Aux Sends': ['16 stereo aux', '16 aux estéreo'],
    'Built-in FX': ['16 stereo engines', '16 motores estéreo'],
    'Connectivity': ['USB 48x48, AES50, SD', 'USB 48x48, AES50, SD'],
    'Weight': ['35.1 lb (15.9 kg)', '15,9 kg'],
  },
});

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));

// Verificacion final
['beginner-guitar', 'best-digital-mixers'].forEach(id => {
  const g = guides.find(x => x.id === id);
  const cols = g.productTable.columns.length;
  const bad = g.productTable.rows.filter(r => r.values.length !== cols);
  console.log(id + ': ' + cols + ' columnas, ' + g.verdictProsCons.length + ' veredictos, filas desalineadas: ' + bad.length);
});