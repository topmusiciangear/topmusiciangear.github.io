// Anade Boss RC-5 Loop Station (id 200) a la tabla + veredicto de best-reverb-delay
// Specs: boss.info/uk/products/rc-5/specifications (oficial Boss)
// Precios: TEST_SHOP_BTN id 200 (amazon/zzounds/andertons/g4m/musicstore)
const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const guides = JSON.parse(fs.readFileSync(f, 'utf8'));
const g = guides.find(x => x.id === 'best-reverb-delay');

if ((g.productTable.columns.find(c => c.title === 'Boss RC-5 Loop Station') || g.verdictProsCons.find(v => v.name === 'Boss RC-5 Loop Station'))) {
  console.log('ya esta anadido, no hago nada'); process.exit(0);
}

const COLS = [
  { title: 'Boss RC-5 Loop Station', title_es: 'Boss RC-5 Loop Station' },
  { value: 'Compact looper for practice and live',            value_es: 'Looper compacto para práctica y directo' },
  { value: '$204.99–$219.99',                                  value_es: '$204.99–$219.99' },
  { value: 'Looper / Loop Station',                           value_es: 'Looper / Estación de loops' },
  { value: 'Single pedal + volume/menu dial, colour LCD',     value_es: 'Pedal único + dial de volumen/menú, LCD en color' },
  { value: '—',                                               value_es: '—' },
  { value: '9V DC (battery or PSA adaptor)',                  value_es: '9V DC (pila o adaptador PSA)' },
  { value: '170 mA',                                          value_es: '170 mA' },
  { value: '32-bit floating point, 44.1 kHz',                 value_es: 'Coma flotante de 32 bits, 44,1 kHz' },
  { value: '73 x 129 x 56 mm',                                value_es: '73 x 129 x 56 mm' },
  { value: '13 h stereo, 99 memories, 57 rhythms, MIDI I/O',  value_es: '13 h estéreo, 99 memorias, 57 ritmos, MIDI I/O' },
];

// 1) insertar la columna en la posicion 5 (donde estaba el descartado)
const POS = 5;
g.productTable.columns.splice(POS, 0, { title: COLS[0].title, title_es: COLS[0].title_es });
console.log('columna insertada en la posicion ' + POS);

// 2) insertar el valor correspondiente en cada fila
const ETIQUETAS = ['Best For','Estimated Price','Type','Controls','Bypass','Power','Current Draw','DSP / Processing','Size','Standout Feature'];
const ETIQUETAS_ES = ['Ideal para','Precio estimado','Tipo','Controles','Bypass','Alimentación','Consumo de Corriente','DSP / Procesamiento','Tamaño','Característica Destacada'];
ETIQUETAS.forEach((et, i) => {
  const fila = g.productTable.rows.find(r => r.label === et);
  if (!fila) { console.log('!! no encuentro la fila "' + et + '"'); return; }
  fila.values.splice(POS, 0, { value: COLS[i + 1].value, value_es: COLS[i + 1].value_es });
});
console.log('valores insertados en las ' + ETIQUETAS.length + ' filas');

// 3) veredicto 4+4 EN+ES
const POSV = g.verdictProsCons.findIndex(v => v.name === 'Eventide TimeFactor');
const VEREDICTO = {
  name: 'Boss RC-5 Loop Station',
  name_es: 'Boss RC-5 Loop Station',
  pros: [
    '13 hours of stereo recording at 32-bit float — longer than most rack loopers',
    '99 phrase memories that also store the rhythm and kit, so a song reloads ready to play',
    '57 preset rhythms across 7 drum-kit styles with A/B variations',
    'Full MIDI in and out on mini TRS jacks, plus USB WAV import for backing tracks'
  ],
  cons: [
    '170 mA current draw cuts alkaline battery life to about two hours',
    'Around $205–$220 puts it above the plain RC-500-style loopers',
    'Single-track looper — no two-track overdub workflow like the RC-500 or RC-600',
    'Reverse and deep editing need the menu dial, so it is not purely hands-down'
  ],
  pros_es: [
    '13 horas de grabación estéreo en coma flotante de 32 bits, más que la mayoría de loopers de rack',
    '99 memorias de frase que guardan también el ritmo y el kit, así que una canción vuelve lista para tocar',
    '57 ritmos predefinidos en 7 estilos de kit con variaciones A/B',
    'MIDI completo de entrada y salida en jacks mini TRS, más importación WAV por USB para bases'
  ],
  cons_es: [
    'Un consumo de 170 mA deja la pila alcalina en unas dos horas',
    'Entre $205 y $220 lo sitúa por encima de los loopers sencillos tipo RC-500',
    'Looper de una sola pista, sin el overdub de dos pistas del RC-500 o el RC-600',
    'El reverse y la edición profunda piden el dial de menús, así que no es solo pedal'
  ]
};
g.verdictProsCons.splice(POSV > -1 ? POSV : g.verdictProsCons.length, 0, VEREDICTO);
console.log('veredicto anadido (' + VEREDICTO.pros.length + ' pros / ' + VEREDICTO.cons.length + ' contras, EN+ES)');

fs.writeFileSync(f, JSON.stringify(guides, null, 2), 'utf8');

// verificacion
console.log('\n--- verificacion ---');
console.log('columnas: ' + g.productTable.columns.length + ' -> ' + g.productTable.columns.map(c => c.title).join(' | '));
console.log('veredictos: ' + g.verdictProsCons.length);
g.productTable.rows.forEach(r => {
  const largo = r.values.length !== g.productTable.columns.length;
  console.log((largo ? '!! ' : '   ') + r.label.padEnd(20) + r.values.length + ' valores' + (largo ? '  <-- DESAJUSTE' : ''));
});