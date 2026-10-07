const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const g = G.find(x => x.id === 'best-looper-pedals');
function rep1(txt, from, to) {
  const c = txt.split(from).length - 1;
  if (c !== 1) throw new Error('found ' + c + 'x: ' + from.slice(0, 60));
  return txt.split(from).join(to);
}
let t = JSON.stringify(g);
t = rep1(t, 'the Infinity 2 flips parts gaplessly and the Clone shrinks 6 hi-fi minutes into a mini box.',
  'the 1440 multiplies stereo memories and the MXR M303 Clone Looper shrinks 6 hi-fi minutes into a mini box, while the RC-600 tops the pro range.');
t = rep1(t, 'el Infinity 2 alterna partes sin cortes y el Clone miniaturiza 6 minutos hi-fi.',
  'el 1440 multiplica memorias est\u00e9reo y el MXR M303 Clone Looper miniaturiza 6 minutos hi-fi, mientras el RC-600 corona la gama pro.');
t = rep1(t, 'Infinity 2 and MXR M303 Clone Looper scale up to dual tracks, stereo memories and hi-fi overdubs.',
  '1440 and MXR M303 Clone Looper scale up to stereo memories and hi-fi overdubs, with the RC-600 as the pro flagship.');
t = rep1(t, 'el Infinity 2 y el MXR M303 Clone Looper escalan a doble pista, memorias est\u00e9reo y overdubs hi-fi.',
  'el 1440 y el MXR M303 Clone Looper escalan a memorias est\u00e9reo y overdubs hi-fi, con el RC-600 como insignia pro.');
G[G.findIndex(x => x.id === 'best-looper-pedals')] = JSON.parse(t);
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2) + '\n');
console.log('conclusion/verdict updated');
