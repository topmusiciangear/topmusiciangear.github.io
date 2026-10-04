const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
function* walk(o, path) {
  if (typeof o === 'string') { yield [path, o]; return; }
  if (Array.isArray(o)) { for (let i = 0; i < o.length; i++) yield* walk(o[i], path + '[' + i + ']'); return; }
  if (o && typeof o === 'object') { for (const k of Object.keys(o)) yield* walk(o[k], path ? path + '.' + k : k); }
}
const queries = [
  ['portable-interfaces', 'verdaderamente móviles'],
  ['midi-keyboards', 'sin usar el mouse'],
  ['usb-mics', 'buen rechazo feedback'],
  ['best-5-string-basses', 'escala más setup:'],
  ['pro-daw', 'producción creativa y performance'],
  ['pro-basses', 'con tocabilidad moderna'],
  ['ew-iem-g4-twin-vs-psm300', 'receptores de bolsillo']
];
queries.forEach(([id, q]) => {
  const g = G.find(x => x.id === id);
  console.log('=== ' + id + ' :: ' + q);
  for (const [path, val] of walk(g, '')) {
    if (typeof val === 'string' && val.includes(q)) {
      const i = val.indexOf(q);
      console.log('  [' + path + '] ...' + val.slice(Math.max(0, i - 60), i + q.length + 60));
    }
  }
});