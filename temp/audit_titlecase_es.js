const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

// palabra que empieza por mayuscula y NO es acronimo ni nombre propio conocido
const PROPIOS = new Set(['iZotope', 'Arturia', 'Native', 'Instruments', 'Kilohearts', 'u-he', 'Diva', 'Scaler', 'Celemony', 'Melodyne', 'FabFilter', 'Pro-Q', 'Pro-L', 'Pro-C', 'Pro-MB', 'Synchro', 'Arts', 'VocAlign', 'Revoice', 'RePitch', 'NUGEN', 'Audio', 'iZotope', 'Nectar', 'Ozone', 'RX', 'Acon', 'Sonible', 'smart', 'deess', 'MeldaProduction', 'MeldwayGrand', 'XLN', 'Addictive', 'Keys', 'Noire', 'Augmented', 'GRAND', 'PIANO', 'V', 'Collection', 'Pro', 'Two', 'Notes', 'Universal', 'Studio', 'Sound', 'City', 'Studios', 'UAD', 'Kiive', 'Audio', 'Lunchbox', 'Amp', 'Sim', 'Softube', 'Room', 'Marshall', 'Suite', 'Audiomodern', 'Playbeat', 'Riffer', 'SongWish', 'reMIDI', 'Loop', 'Engine', 'Production', 'W.A.', 'Zynaptiq', 'PitchMap', 'Unveil', 'Reveal', 'Spire', 'Vengeance', 'Sound', 'Pigments', 'Phase', 'Plant', 'Massive', 'Wavetable', 'Essential', 'Advanced', 'Standard', 'Bundle', 'Bundle', 'Limiter', 'Room', 'Soup', 'Consoles', 'I/O', 'AXE', 'TONEX', 'ONE+', 'VST', 'VSTs', 'MIDI', 'DAW', 'DAWs', 'USB', 'UHD', 'XLR', 'TTS', 'DSP', 'EQ', 'FX', 'PA', 'DI', 'DI', 'EQ', 'A', 'E', 'C', 'F', 'S', 'D', 'J', 'K', 'Q', 'R', 'V', 'X', 'Y', 'Z', 'W', 'B', 'H', 'N', 'T', 'P', 'L', 'M', 'O', 'I', 'U', 'G', 'And', 'The', 'For', 'With', 'From', 'In', 'On', 'To', 'Vs', 'and', 'of', 'for', 'to', 'in', 'vs']);

function pareceTitleCase(s) {
  // cuenta palabras que empiezan por mayuscula y no son solosigla (1-3 letras)
  const palabras = s.replace(/<[^>]+>/g, ' ').split(/[\s\-–—:,\/]+/).filter(Boolean);
  let mayus = 0, total = 0;
  palabras.forEach(p => {
    const limpio = p.replace(/^[¿¡"'(\[]/, '');
    if (!limpio) return;
    total++;
    const esSigla = /^[A-Z0-9&]{1,4}(\+|-|\d)*$/.test(limpio);
    if (esSigla) return;
    if (PROPIOS.has(limpio)) return;
    if (/^[A-ZÁÉÍÓÚÑ]/.test(limpio)) mayus++;
  });
  return total >= 3 && mayus / total >= 0.5;
}

const titleCaseES = [];
guides.forEach(g => {
  const campos = [['title_es', g.title_es], ['metaDesc_es', g.metaDesc_es], ['intro_es', g.intro_es]];
  campos.forEach(([k, v]) => {
    if (v && pareceTitleCase(v)) titleCaseES.push({ id: g.id, campo: k, valor: v });
  });
});
console.log('guias: ' + guides.length);
console.log('campos ES con Title Case: ' + titleCaseES.length + '\n');
titleCaseES.forEach(x => console.log(x.id + ' [' + x.campo + ']\n   ' + x.valor.slice(0, 150) + '\n'));