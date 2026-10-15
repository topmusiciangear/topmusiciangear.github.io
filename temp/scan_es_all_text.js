// Escaneo de mayusculas indebidas en TODO el texto espanol, no solo titulos.
// Criterio: una palabra COMUN (no marca, no sigla, no nombre de modelo) capitalizada
// a mitad de frase. Las marcas legitimamente en mayuscula se listan aparte.
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));

// Palabras que en espanol NUNCA van capitalizadas a mitad de frase,
// pero que aparecen en mayuscula por influencia del ingles.
const COMUNES = [
  // efectos / mezclas
  'Overdrive','Distortion','Distorsión','Reverb','Delay','Chorus','Flanger','Phaser',
  'Compressor','Compression','Compresor','Mastering','Masterización','Mixing','Mezcla',
  'EQ','Equalization','Limitador','De-Esser','Saturation','Saturación','Exciter',
  // anglicismos de uso corriente en el sitio
  'Loop','Loops','Groovebox','Grooveboxes','Sampler','Samplers','Beatmaker','Beatmakers',
  'Beat-Making','Beatmaking','Podcast','Streaming','Studio','Session','Sessions',
  'Performance','Live','Playback','Monitoring','Mixbus','Monitor','Cue','Panning',
  // tipos de microfono / altavoz
  'Shotgun','Parlor','Condenser','Dynamic','Headphone','Overhead','Boundary','Ribbon',
  // construccion / espacio
  'Rack','Racks','Stand','Stands','Booth','Baffles','Panel','Panels','Truss','Rig',
  // otros
  'Room','Rooms','Input','Output','Bus','Send','Return','Gain','Level','Meter',
  'Preset','Presets','Bank','Banks','Plugin','Plugins','Bundle','Bundles','Preset',
  'Hardware','Software','Firmware','Driver','Drivers','Workflow','Workflows',
  'Playback','Recording','Tracking','Mixdown','Master','Reference','Extension','Adapter'
];

// Palabras/marcas que SI van en mayuscula legitimamente (excepciones permanentes)
const LEGITIMAS = new Set([
  // Marcas de producto
  'Stratocaster','Stratocasters','Precision','Telecaster','Jazz','Les','Paul','Mustang',
  'Squier','Jaguar','Raptor','Cyclone','Jazzmaster','Jagmaster','P-Bass','J-Bass',
  'Genelec','Razer','Roland','Yamaha','Shure','Neumann','AKG','Sennheiser','Beyerdynamic',
  'Mackie','Behringer','Midas','Allen','Heath','Soundcraft','PreSonus','Presonus','Audeze',
  'Electro','Voice','EV','JBL','QSC','Mooer','Nord','Doepfer','Sequential','Moog',
  'Ashdown','Markbass','Bergantino','Ibanez','Jackson','Fodera','Spector','Warwick',
  'Fender','Gibson','Martin','Taylor','Cole','Clark','Guild','Ovation','Takamine',
  'Boss','Line','Tech','Twenty','Nine','Ibanez','Korg','Casio','Zoom','Tascam','Rupert',
  'Radial','Whirlwind','Tech','Sescom','Mackie','Allen','Heath','Apogee','RME','Grace',
  'Universal','Focusrite','Audient','Arturia','iZotope','Waves','FabFilter','Valhalla',
  'Plugin','Boutique','Chase','Bliss','Strymon','Eventide','Meris','Walrus','DigiTech',
  'MXR','JHS','T-Rex','Boss','Elgato','Logitech','Rode','RØDE','Lewitt','Telefunken',
  'Telefunken','DPA','Sennheiser','Shure','AKG','Audix','Heil','Soundcraft',
  // Siglas y tecnicismos que el sitio ya capitaliza
  'USB','XLR','RCA','TRS','TS','AES','MIDI','DAW','DSP','LCD','SPDIF','S/PDIF','ADAT',
  'TDIF','AES/EBU','BT','WiFi','Bluetooth','VST','AU','AAX','FLAC','WAV','MP3','MP4',
  'EQ','FX','HQ','II','III','IV','VI','MK','MKII','IEM','DLZ','GOXLR','RØDECaster',
  'SPL','SMT','RMS','PWM','A/D','D/A','Dante','AVB','AES50','MADI','Dante','IP',
  'PCIe','Thunderbolt','USB-C','USB-A','XLR-C','M32','X32','M32R','X18','XR18',
  // Palabras que en contexto tecnico español el sitio usa asi
  'Live','PA','DI','DI-Box','VST3','AUv3','MPE','MIDI','OSC','CV','Gate','Expander',
  'Deesser','De-Esser','Multiband','Lookahead','Zero-Latency','Zero','Latency',
  'Look','Ahead','Alpha','Beta','Delta','Sidechain','Mid','Side','Top','Bottom',
  // Formato de titulos publicos ya validados
  'In-Ear','Beat-Making','Multi-Efectos','Multi-Effects','Stream','Controller','Compact',
  'Pro','II','III','Max','Live','Studio','Classic','Vintage','Custom','Signature',
  'Standard','Original','Custom','Limited','Anniversary','Edition','Bundle','Suite',
  'Producer','Producer','All','Plugins','Instrument','Ultimate','Complete','Elements'
]);

function esMayusculaIndebida(txt) {
  const t = String(txt).replace(/<[^>]+>/g,' ');
  // quitar lo que va dentro de <strong> si es el nombre del producto (ya capitalizado legitimamente)
  const hallazgos = [];
  COMUNES.forEach(pal => {
    // buscar la palabra completa, capitalizada, que NO este precedida por otra letra
    const re = new RegExp('(?<![\\w\\u00C0-\\u017F])' + pal.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + '(?![\\w\\u00C0-\\u017F])', 'g');
    let m;
    while ((m = re.exec(t)) !== null) {
      // no contar si es la primera palabra del campo, de un h2, o de un <strong> que abre
      const antes = t.slice(0, m.index);
      const despues = t.slice(m.index + pal.length);
      const esInicio = antes.trim() === '' || /^\s*$/.test(antes);
      // si esta dentro de un strong al inicio, es el nombre del producto: legitimo
      const enStrong = /<strong>\s*$/.test(antes.replace(/\s+$/,''));
      const legitima = LEGITIMAS.has(pal);
      if (!legitima && !esInicio && !enStrong) {
        hallazgos.push({ palabra: pal, ctx: t.slice(Math.max(0,m.index-40), m.index+pal.length+40) });
      }
    }
  });
  return hallazgos;
}

const porZona = {};
const CASOS = [
  ['descripcion meta', g => g.description_es],
  ['titulo ES', g => g.title_es],
  ['intro', g => g.intro_es],
  ['conclusion', g => g.conclusion_es]
];

guides.forEach(g => {
  CASOS.forEach(([zona, fn]) => {
    const v = fn(g);
    if (!v || typeof v !== 'string') return;
    const h = esMayusculaIndebida(v);
    if (h.length) {
      if (!porZona[zona]) porZona[zona] = [];
      porZona[zona].push({ guia: g.id, n: h.length, ejemplos: h.slice(0,3) });
    }
  });
  // secciones
  (g.sections||[]).forEach((s,i) => {
    const v = s.heading_es;
    if (v && typeof v === 'string') {
      const h = esMayusculaIndebida(v);
      if (h.length) {
        if (!porZona['encabezados de seccion ES']) porZona['encabezados de seccion ES'] = [];
        porZona['encabezados de seccion ES'].push({ guia: g.id+' sec['+i+']', n: h.length, ejemplos: h.slice(0,2) });
      }
    }
    const c = s.content_es;
    if (c && typeof c === 'string') {
      const h = esMayusculaIndebida(c);
      if (h.length) {
        if (!porZona['contenido de seccion ES']) porZona['contenido de seccion ES'] = [];
        porZona['contenido de seccion ES'].push({ guia: g.id+' sec['+i+']', n: h.length, ejemplos: h.slice(0,2) });
      }
    }
  });
});

console.log('======================================================================');
console.log('  MAYUSCULAS INDEBIDAS EN TEXTOS ES (excluyendo titulos ya corregidos)');
console.log('======================================================================');
let total = 0;
Object.keys(porZona).forEach(zona => {
  const items = porZona[zona];
  const sum = items.reduce((s,x)=>s+x.n,0);
  total += sum;
  console.log('\n--- ' + zona + ' --- ' + sum + ' ocurrencias en ' + items.length + ' lugares');
  items.slice(0,15).forEach(it => {
    console.log('  ' + it.guia + ' (' + it.n + ')');
    it.ejemplos.forEach(e => console.log('     "' + e.ctx.trim() + '"'));
  });
  if (items.length>15) console.log('  ... y ' + (items.length-15) + ' mas');
});
console.log('\n' + '='.repeat(60));
console.log('TOTAL: ' + total);