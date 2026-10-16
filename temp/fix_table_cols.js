const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

// New columns for mixing-plugins (ids 1037, 1038)
const mixingCols = [
  { title: 'SSL Mastering Bundle', title_es: 'SSL Mastering Bundle' },
  { title: 'NUGEN Audio ISL 2st', title_es: 'NUGEN Audio ISL 2st' }
];
const mixingValues = {
  'Best For': [
    { value: 'Analog console glue and stereo finish', value_es: 'Pegamento de consola analógica y acabado estéreo' },
    { value: 'True-peak limiting for broadcast and streaming', value_es: 'Limitación de picos verdaderos para broadcast y streaming' }
  ],
  'Type': [
    { value: 'Mastering bundle (2 processors)', value_es: 'Bundle de mastering (2 procesadores)' },
    { value: 'True-peak limiter', value_es: 'Limitador de picos verdaderos' }
  ],
  'Format': [
    { value: 'VST2/VST3/AU/AAX', value_es: 'VST2/VST3/AU/AAX' },
    { value: 'VST2/VST3/AU/AAX', value_es: 'VST2/VST3/AU/AAX' }
  ],
  'Platforms': [
    { value: 'macOS & Windows', value_es: 'macOS y Windows' },
    { value: 'macOS & Windows', value_es: 'macOS y Windows' }
  ],
  'Copy Protection': [
    { value: 'iLok', value_es: 'iLok' },
    { value: 'iLok', value_es: 'iLok' }
  ],
  'Latency': [
    { value: 'Low', value_es: 'Baja' },
    { value: 'Low', value_es: 'Baja' }
  ],
  'Standout Feature': [
    { value: 'Official SSL Bus Compressor + Fusion enhancer', value_es: 'Bus Compressor + Fusion oficiales de SSL' },
    { value: 'Inter-sample peak detection', value_es: 'Detección de picos entre muestras' }
  ]
};

// New column for vocal-plugins (id 1039)
const vocalCols = [
  { title: 'RePitch 2 + VocAlign 7 Pro Bundle', title_es: 'Bundle RePitch 2 + VocAlign 7 Pro' }
];
const vocalValues = {
  'Best For': [
    { value: 'Pitch correction + vocal alignment in one', value_es: 'Corrección de tono + alineación vocal en uno' }
  ],
  'Type': [
    { value: 'Vocal production bundle', value_es: 'Bundle de producción vocal' }
  ],
  'Format': [
    { value: 'VST3/AU/AAX', value_es: 'VST3/AU/AAX' }
  ],
  'Platforms': [
    { value: 'macOS & Windows', value_es: 'macOS y Windows' }
  ],
  'Copy Protection': [
    { value: 'iLok', value_es: 'iLok' }
  ],
  'Latency': [
    { value: 'Low', value_es: 'Baja' }
  ],
  'Standout Feature': [
    { value: 'Natural tuning + timing alignment in one package', value_es: 'Afinación natural + alineación de timing en un paquete' }
  ]
};

function addColumns(guide, cols, valuesMap) {
  const t = guide.productTable;
  cols.forEach(c => t.columns.push(c));
  t.rows.forEach(r => {
    const vals = valuesMap[r.label];
    if (!vals) { console.log('WARNING: no values for row ' + r.label); return; }
    vals.forEach(v => r.values.push(v));
  });
  // sanity check
  const bad = t.rows.filter(r => r.values.length !== t.columns.length);
  console.log(guide.id + ': columns=' + t.columns.length + ' featured=' + (guide.featuredProducts||[]).length + (bad.length ? ' STILL BAD: ' + bad.map(r=>r.label).join(',') : ' OK'));
}

addColumns(guides.find(g => g.id === 'mixing-plugins'), mixingCols, mixingValues);
addColumns(guides.find(g => g.id === 'vocal-plugins'), vocalCols, vocalValues);

guides.sort((a, b) => a.id.localeCompare(b.id));
fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('Done');
