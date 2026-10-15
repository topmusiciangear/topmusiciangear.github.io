// Escanear titulos ES con mayusculas indebidas (solo la 1a palabra y propios pueden)
// Regla RAE: en español la mayuscula inicial solo va en la primera palabra,
// nombres propios y siglas.
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));

// Palabras que SI pueden ir con mayuscula en medio de un titulo espanol:
// nombres propios de marca, siglas, y palabras，通常 "vs" se acepta.
const PERMITIDAS = new Set([
  // siglas
  'USB','XLR','RCA','TRS','TS','AES','MIDI','DAW','DSP','LCD','USB-C','SPDIF','S/PDIF','ADAT','TDIF','AES/EBU',
  'BT','WiFi','Bluetooth','VST','AU','AAX','FLAC','WAV','MP3','MP4','EQ','FX','HQ','II','III','IV','VI','MK','MKII',
  // marcas / nombres propios
  'Shure','Sennheiser','Neumann','AKG','Audio','Technica','Rode','RØDE','Mackie','Yamaha','Roland','Korg','Nord',
  'Moog','Behringer','Allen','Heath','Soundcraft','Midas','Presonus','PreSonus','Zendrum','Zoom','Tascam','BOSS',
  'Boss','Line','Fender','Gibson','Taylor','Martin','Taylor','Steinberger','Vox','Orange','Marshall','Mesa','Boogie',
  'Bugera','Ampeg','Vox','Ashdown','Markbass','Bergantino','Darkglass','Merry','Goedicke','Warwick','Ibanez',
  'Jackson','Fodera','Spector','Lakland','Squier','Harley','Benton','Harley','Benson','Kinsman','T-Rex','TC','Electronic',
  'Strymon','Eventide','Meris','Chase','Bliss','Walrus','Neumann','Chase','Bliss','Mooer','DigiTech','MXR','JHS',
  'Boss','Electro','Voice','EV','ZLX','PRX','EON','SRT','QSC','Mackie','EV','JBL','EV','Electro','Altavoz','JBL',
  'EV','Electro','Yamaha','DXR','DBR','CBR','STAGEPAS','Stagepas','K12','D12','XR18','X32','M32','CQ','SQ','WING',
  'DLZ','AG08','GOXLR','Helicon','Elgato','Rode','RØDECaster','Stream','Deck','Wave','Bridge','Cast','XLR',
  'Focusrite','Scarlett','Clarett','Audient','iD','EVO','SSL','Universal','Audio','Volt','Apollo','UAD','UAD-2',
  'Arturia','MiniFuse','Motu','M2','M4','Presonus','StudioLive','RME','Babyface','Antipode','Apogee','Grace',
  'Blackface','Avid','Sennheiser','HD','M80','Telefunken','Neumann','KM','U87','U','87','Ai','M49','Colette',
  'Chandler','Telos','Daking','Townshend','Studiologic','Numa','Numa','Nord','Lead','Stage','Nord','C2','C3',
  'Sequential','Prophet','Rev2','OB','Moog','Matriarch','Grandmother','Subsequent','37','Mutable','Plaits',
  'Elektron','Digitakt','Digitakt','II','Model','Samples','MKI','II','Analog','Four','Rytm','Therion','Ableton',
  'Live','Suite','FL','Studio','Producer','Logic','Pro','Cubase','Nuendo','Reaper','Bitwig','Studio','One',
  'Studio','Pro','FL','Studio','Reason','Ableton','Push','Maschine','Native','Instruments','Komplete',
  'Plugin','Boutique','Waves','FabFilter','iZotope','Ozone','Neutron','RX','Vital','Serum','Sylenth',
  'Omnisphere','Massive','Kontakt','Komplete','Oscillator','Pure','Waves','SSL','Channel','Strip',
  'Voxengo','Valhalla','Saturation','UAD','Studer','1176','LA','2A','3A','Empirical','Labs',
  'TLM','Rode','NT1','NT1-A','SM7B','SM58','SM57','Beta','58A','e935','e945','ND86','D5','OM7','M80',
  'Dante','AVB','AES50','Dante','MADI','Dante','Studio','Pro'
]);

function tieneMayusculaInnecesaria(titulo) {
  if (!titulo) return [];
  // quitar etiquetas HTML
  const t = String(titulo).replace(/<[^>]+>/g,'');
  // tokenizar palabras (con apostrof y guiones internos)
  const palabras = t.match(/[\wÀ-ÿØ-öø-ÿ'’-]+/g) || [];
  const hallazgos = [];
  palabras.forEach((w, i) => {
    if (i === 0) return; // la primera puede ser mayuscula
    if (!/^[A-Z]/.test(w)) return; // no empieza por mayuscula = ok
    // "vs" y "Vs" suelen ir en minuscula en español
    if (/^(vs|Vs)$/.test(w)) {
      hallazgos.push({ palabra: w, razon: 'vs en un titulo espanol va en minuscula' });
      return;
    }
    if (PERMITIDAS.has(w)) return; // marca, sigla o nombre propio
    // Heuristica: si es una palabra muy corta (1-2 letras) probablemente sigla
    if (w.length <= 2 && /^[A-Z]+$/.test(w)) return;
    hallazgos.push({ palabra: w, razon: 'posible mayuscula indebida' });
  });
  return hallazgos;
}

// Revisar titleTag_es, title_es, h1 de cada guia
const problemas = [];
guides.forEach(g => {
  const campos = [
    ['title_es', g.title_es],
    ['titleTag_es', g.titleTag_es]
  ];
  campos.forEach(([campo, valor]) => {
    if (!valor) return;
    const h = tieneMayusculaInnecesaria(valor);
    if (h.length) {
      problemas.push({ guia: g.id, campo, valor, hallazgos: h });
    }
  });
});

console.log('Guias con posibles mayusculas indebidas en titulos ES: ' + problemas.length);
console.log('='.repeat(70));
problemas.forEach(p => {
  const hs = p.hallazgos.map(h => h.palabra + ' (' + h.razon + ')').join(', ');
  console.log(p.guia + ' | ' + p.campo + ': "' + p.valor + '"');
  console.log('   -> ' + hs);
});