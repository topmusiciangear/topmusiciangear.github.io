var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

function fix(id, field, from, to) {
  var guide = g.find(x=>x.id===id);
  if(!guide) return;
  if(guide[field] && guide[field].includes(from)) {
    guide[field] = guide[field].split(from).join(to);
    console.log(id+'.'+field+': fixed');
  }
}

// stream-controllers
fix('stream-controllers','intro',
  'After weeks of swapping the Stream Deck+, the Streamer X, the BEACN Mix Create and the Wave XLR in and out of live setups, here is what actually earns a spot on your desk.',
  'The Stream Deck+, the Streamer X, the BEACN Mix Create and the Wave XLR are the top streaming controllers — here is what each one does best.');
fix('stream-controllers','intro_es',
  'Tras semanas intercambiando el Stream Deck+, el Streamer X, el BEACN Mix Create, el Wave XLR y dos mezcladores todo-en-uno en setups de directo, esto es lo que de verdad se gana un sitio en tu escritorio',
  'El Stream Deck+, el Streamer X, el BEACN Mix Create y el Wave XLR son los mejores controladores de streaming — esto es lo que hace cada uno.');

// streaming-interfaces
fix('streaming-interfaces','intro',
  'After testing the Rodecaster Duo, the Bridge Cast X, the Audient EVO 4, the Universal Audio Volt 276 and the Maono Maonocaster E2 Gen2, here is what actually earns a place on your desk.',
  'The Rodecaster Duo, the Bridge Cast X, the Audient EVO 4, the Universal Audio Volt 276 and the Maono Maonocaster E2 Gen2 are the top streaming interfaces — here is how they compare.');
fix('streaming-interfaces','intro_es',
  'Tras probar el Rodecaster Duo, el Bridge Cast X, el Audient EVO 4 y el Universal Audio Volt 276, esto es lo que de verdad se gana un sitio en tu escritorio',
  'El Rodecaster Duo, el Bridge Cast X, el Audient EVO 4 y el Universal Audio Volt 276 son las mejores interfaces de streaming — esto es lo que destaca de cada una.');

// rodecaster-pro2-vs-dlz-creator
fix('rodecaster-pro2-vs-dlz-creator','intro',
  'After running both through live streams, podcast sessions and heavy OBS workloads, here is how they compare.',
  'Both consoles handle live streams, podcast sessions and heavy OBS workloads — here is how they compare.');
fix('rodecaster-pro2-vs-dlz-creator','intro_es',
  'Tras probar ambas en directos, sesiones de podcast y cargas pesadas de OBS, esto es lo que destaca de cada una.',
  'Ambas consolas manejan directos, sesiones de podcast y cargas pesadas de OBS — esto es lo que destaca de cada una.');

// stream-deck-plus-xl-vs-razer
fix('stream-deck-plus-xl-vs-razer','intro',
  'After running both through OBS-heavy streams, editing sessions and live shows, here is how they compare.',
  'Both panels handle OBS-heavy streams, editing sessions and live shows — here is how they compare.');
fix('stream-deck-plus-xl-vs-razer','intro_es',
  'Tras probar ambos en directos cargados de OBS, sesiones de edición y shows en vivo, esto es lo que destaca de cada uno.',
  'Ambos paneles manejan directos cargados de OBS, sesiones de edición y shows en vivo — esto es lo que destaca de cada uno.');

// usb-mics
fix('usb-mics','intro',
  'Five mics worth considering for streaming and podcasting in 2026.',
  'Five solid USB mics for streaming and podcasting in 2026.');
fix('usb-mics','intro_es',
  'Cinco micrófonos que vale la pena considerar para streaming y podcasting en 2026.',
  'Cinco micrófonos USB fiables para streaming y podcasting en 2026.');

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('\nDone! Removed all testing references from streaming/creators guides.');
