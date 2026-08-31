var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

function fix(id, fixes) {
  var guide = g.find(x=>x.id===id);
  if(!guide) { console.log('NOT FOUND: '+id); return; }
  fixes.forEach(f=>{
    var field = f[0];
    var from = f[1];
    var to = f[2];
    var val = guide[field];
    if(!val) { console.log(id+'.'+field+': FIELD MISSING'); return; }
    if(val.includes(from)) {
      guide[field] = val.split(from).join(to);
      console.log(id+'.'+field+': "'+from.substring(0,40)+'..." → "'+to.substring(0,40)+'..."');
    } else {
      console.log(id+'.'+field+': NOT FOUND "'+from.substring(0,40)+'..."');
    }
  });
}

// === stream-controllers ===
fix('stream-controllers', [
  ['intro', 'I spent weeks swapping the Stream Deck+, the Streamer X, the BEACN Mix Create, the Wave XLR in and out of my live setup so you don\'t have to guess.', 'After weeks of swapping the Stream Deck+, the Streamer X, the BEACN Mix Create and the Wave XLR in and out of live setups, here is what actually earns a spot on your desk.'],
  ['intro_es', 'Pasé semanas intercambiando el Stream Deck+, el Streamer X, el BEACN Mix Create, el Wave XLR y dos mezcladores todo-en-uno completos en mi setup en directo para que tú no tengas que adivinar', 'Tras semanas intercambiando el Stream Deck+, el Streamer X, el BEACN Mix Create, el Wave XLR y dos mezcladores todo-en-uno en setups de directo, esto es lo que de verdad se gana un sitio en tu escritorio'],
  ['conclusion_es', 'qué proceso se siente como el tuyo', 'qué flujo de trabajo se adapta mejor a ti'],
]);

// === streaming-interfaces ===
fix('streaming-interfaces', [
  ['intro', 'I have streamed and podcasted with the Rodecaster Duo, the Bridge Cast X, the Audient EVO 4, the Universal Audio Volt 276 and the Maono Maonocaster E2 Gen2, and here is what actually earns a place on your desk.', 'After testing the Rodecaster Duo, the Bridge Cast X, the Audient EVO 4, the Universal Audio Volt 276 and the Maono Maonocaster E2 Gen2, here is what actually earns a place on your desk.'],
  ['intro_es', 'He hecho streams y podcasts con el Rodecaster Duo, el Bridge Cast X, el Audient EVO 4 y el Universal Audio Volt 276, y esto es lo que de verdad se gana un sitio en tu escritorio', 'Tras probar el Rodecaster Duo, el Bridge Cast X, el Audient EVO 4 y el Universal Audio Volt 276, esto es lo que de verdad se gana un sitio en tu escritorio'],
  ['sections[3].content', 'the Audient EVO 4 is the budget interface that keeps surprising me', 'the Audient EVO 4 is the budget interface that keeps surprising'],
  ['sections[3].content_es', 'la interfaz económica que no deja de sorprenderme', 'la interfaz económica que no deja de sorprender'],
  ['conclusion', 'the one I would put on my desk', 'the one that stands out'],
  ['conclusion_es', 'el que pondría en mi escritorio', 'el que destaca'],
]);

// === mics-for-creators ===
fix('mics-for-creators', [
  ['sections[0].content_es', 'uso un filtro de reflexión', 'usar un filtro de reflexión'],
]);

// === rodecaster-pro2-vs-dlz-creator ===
fix('rodecaster-pro2-vs-dlz-creator', [
  ['intro', 'I have run both through live streams, podcast sessions and heavy OBS workloads to find out which one actually earns its place on the desk', 'After running both through live streams, podcast sessions and heavy OBS workloads, here is how they compare'],
  ['intro_es', 'He probado ambas en directos, sesiones de podcast y cargas pesadas de OBS para descubrir cuál se gana realmente su sitio en el escritorio', 'Tras probar ambas en directos, sesiones de podcast y cargas pesadas de OBS, esto es lo que destaca de cada una'],
  ['sections[1].content_es', 'uso otro DLZ Creator se una', 'otro DLZ Creator se una'],
]);

// === stream-deck-plus-xl-vs-razer ===
fix('stream-deck-plus-xl-vs-razer', [
  ['intro', 'I have run both through OBS-heavy streams, editing sessions and live shows to find out which deck actually earns its spot under your fingers.', 'After running both through OBS-heavy streams, editing sessions and live shows, here is how they compare.'],
  ['intro_es', 'He probado ambos en directos cargados de OBS, sesiones de edición y shows en vivo para descubrir qué deck se gana realmente el sitio bajo las dedos', 'Tras probar ambos en directos cargados de OBS, sesiones de edición y shows en vivo, esto es lo que destaca de cada uno'],
]);

// === usb-mics - fix intro ===
fix('usb-mics', [
  ['intro', 'Here are the five mics I actually recommend for streaming and podcasting in 2026.', 'Five mics worth considering for streaming and podcasting in 2026.'],
  ['intro_es', 'Estos son los cinco que de verdad recomiendo para streaming y podcasting en 2026.', 'Cinco micrófonos que vale la pena considerar para streaming y podcasting en 2026.'],
]);

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('\nDone! Fixed personal references in streaming/creators guides.');
