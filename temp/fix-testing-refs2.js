var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

// rodecaster - fix remaining "After running" and "Tras probar"
var rc = g.find(x=>x.id==='rodecaster-pro2-vs-dlz-creator');
rc.intro = rc.intro.replace('After running both through live streams, podcast sessions and heavy OBS workloads, here is how they compare — because they solve very different problems for the same money.',
  'Both consoles handle live streams, podcast sessions and heavy OBS workloads — here is how they compare, because they solve very different problems for the same money.');
rc.intro_es = rc.intro_es.replace('Tras probar ambas en directos, sesiones de podcast y cargas pesadas de OBS, esto es lo que destaca de cada una — porque resuelven problemas muy distintos por el mismo dinero',
  'Ambas consolas manejan directos, sesiones de podcast y cargas pesadas de OBS — esto es lo que destaca de cada una, porque resuelven problemas muy distintos por el mismo dinero');
console.log('rodecaster: fixed');

// stream-deck - fix remaining "Tras probar"
var sd = g.find(x=>x.id==='stream-deck-plus-xl-vs-razer');
sd.intro_es = sd.intro_es.replace('Tras probar ambos en directos cargados de OBS, sesiones de edición y shows en vivo, esto es lo que destaca de cada uno',
  'Ambos paneles manejan directos cargados de OBS, sesiones de edición y shows en vivo — esto es lo que destaca de cada uno');
console.log('stream-deck: fixed');

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Done!');
