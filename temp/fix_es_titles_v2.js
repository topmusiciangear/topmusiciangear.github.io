// Revertir los cambios erroneos del script anterior y aplicar solo los CASOS VALIDOS.
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));

// 1) REVERTIR: rehacer cada titulo desde el valor "antes" que logged el script anterior
const REVERTER = {
  'adam-vs-genelec':              'Adam Audio vs Genelec: tweeter, sonido y valor',
  'blues-junior-vs-ac30':         'Blues Junior vs AC30: ¿mejor combo de válvulas?',
  'pro-live-sound':               'Allen & Heath SQ-5 vs Behringer X32 Compact',
  'beat-making':                  'Mejor Equipo para estudios de Beat-Making',
  'rodecaster-pro2-vs-dlz-creator':'RØDECaster Pro II vs DLZ Creator: ¿cuál gana?',
  'stream-deck-plus-xl-vs-razer': 'Elgato Stream Deck vs Razer Stream Controller',
  'atc-vs-genelec':               'ATC SCM25A Pro Mk2 vs Genelec 8351B: duelo de monitores pro',
  'kh750-vs-7050c':               'Neumann KH 750 DSP vs Genelec 7050C: duelo',
  'best-shotgun-mics':            'Mejores micrófonos Shotgun para cine, vídeo y broadcast',
  'best-wireless-iems':           'Mejores sistemas In-Ear inalámbricos para directo',
  'best-parlor-guitars':          'Mejores guitarras Parlor para blues y fingerstyle',
  'best-in-ear-monitors':         'Los mejores monitores In-Ear (IEM) para directo y estudio',
  'best-multi-effects-pedals':    'Mejores pedales Multi-Efectos para guitarra'
};
Object.keys(REVERTER).forEach(id => {
  const g = guides.find(x => x.id === id);
  if (!g) return;
  ['title_es','titleTag_es'].forEach(c => { if (g[c]) g[c] = REVERTER[id]; });
});

console.log('revertidos ' + Object.keys(REVERTER).length + ' guias a su forma original');

// 2) APLICAR SOLO los casos validos: palabras comunes sueltas, mayuscula -> minuscula
const VALIDOS = {
  'mixing-plugins':      'Mejores plugins de EQ, compresor y mastering',
  'fx-plugins':          'Mejores plugins de efectos para productores',
  'studio-furniture':    'Mejores muebles, escritorios y racks de estudio',
  'best-drum-machine':   'Mejores cajas de ritmos y grooveboxes',
  'fix-clipping-scarlett':'Cómo arreglar el clipping en la Scarlett 2i2',
  'best-mic-for-podcasting':'Mejores micrófonos para podcast',
  'best-headphones-for-mixing':'Mejores auriculares para mezcla y mastering',
  'best-samplers-drum-computers':'Mejores samplers y creación de beats',
  'best-bass-practice-amps':'Mejores amplificadores de bajo para practicar',
  'best-overdrive-distortion':'Mejores pedales de overdrive y distorsión',
  'best-reverb-delay':   'Mejores pedales de reverb y delay',
  'ts9-vs-bd2':          'Ibanez TS9 vs Boss BD-2: duelo de overdrive',
  'best-synthesizers':   'Mejores sintetizadores para producción musical',
  'best-looper-pedals':  'Mejores pedales de loop para guitarra',
  'best-instrument-mics':'Mejores micrófonos para grabar cada instrumento',
  'stage-wedges':        'Mejores cuñas activas de escenario',
  'best-live-subwoofers':'Mejores subwoofers activos para bandas en vivo',
  'streaming-interfaces':'Mejores interfaces para streaming y podcast',
  'best-hardware-samplers':'Mejores samplers de hardware para beatmakers',
  'best-amp-modelers':   'Mejores modeladores de amplificador',
  'ai-tools-plugins':    'Mejores herramientas IA para producción musical',
  'sidechain-modulation-plugins':'Mejores plugins de sidechain y modulación',
  'beatmaker-plugins':   'Mejores plugins para beatmakers'
};
let n = 0;
Object.keys(VALIDOS).forEach(id => {
  const g = guides.find(x => x.id === id);
  if (!g) { console.log('  !! no existe ' + id); return; }
  if (g.titleTag_es !== VALIDOS[id]) {
    console.log('  ' + id + ': "' + g.titleTag_es + '"  ->  "' + VALIDOS[id] + '"');
    g.titleTag_es = VALIDOS[id];
    n++;
  }
});
console.log('\ntitulos ES corregidos: ' + n);

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');

// 3) Verificacion: nenhum nombre de marca quedo en minuscula
const MARCAS_PROHIBIDAS = ['genelec','razer stream controller','dlz creator','in-ear','multi-efectos','beat-making','x32 compact','beat-making'];
console.log('\n--- verificacion de marcas ---');
guides.forEach(g => {
  ['title_es','titleTag_es'].forEach(c => {
    const v = (g[c]||'').toLowerCase();
    MARCAS_PROHIBIDAS.forEach(m => {
      if (v.indexOf(m) > -1) console.log('  !! ' + g.id + ' [' + c + ']: "' + g[c] + '" contiene "' + m + '" en minuscula');
    });
  });
});
const cjk = (JSON.stringify(guides).match(/[\u4e00-\u9fff]/g)||[]);
console.log('CJK: ' + (cjk.length ? [...new Set(cjk)].join('') : 'ninguno'));