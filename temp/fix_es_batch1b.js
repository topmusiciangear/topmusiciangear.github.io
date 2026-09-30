// ES batch 1b: retry failures with fixed path nav.
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const FX = [
['di-box','verdictPros_es[1]','entrada de nivel parlante','entrada de nivel de altavoz'],
['di-box','verdictCons_es[0]','señales de nivel parlante','señales de nivel de altavoz'],
['di-box','verdictProsCons[0].cons_es[1]','No está hecha para nivel de parlante como la RNDI','No está hecha para nivel de altavoz como la RNDI'],
['di-box','verdictProsCons[1].pros_es[1]','parlantes de hasta +41 dBu (amplificador de 1000W)','altavoces de hasta +41 dBu (amplificador de 1000W)'],
['j48-vs-rndi','verdictProsCons[1].pros_es[1]','señales de parlante de hasta +41 dBu','señales de altavoz de hasta +41 dBu'],
['best-in-ear-monitors','verdictProsCons[2].pros_es[0]','con audífonos IE 4','con auriculares IE 4'],
['best-in-ear-monitors','verdictProsCons[5].pros_es[3]','Incluye audífonos IE 4 listos','Incluye auriculares IE 4 listos'],
['best-in-ear-monitors','verdictProsCons[7].pros_es[3]','Incluye audífonos IE 4 y kit','Incluye auriculares IE 4 y kit'],
['budget-mics','verdictProsCons[1].pros_es[1]','brinda excelente aislamiento','da excelente aislamiento'],
['pro-microphones','verdictProsCons[1].pros_es[3]','seleccionables mediante control remoto','seleccionables con control remoto'],
['rme-vs-motu','verdictProsCons[0].pros_es[1]','suprime el jitter sin importar la fuente de reloj','suprime el jitter sea cual sea la fuente de reloj'],
['zlx-vs-k12','verdictProsCons[0].pros_es[0]','menos que el QSC K12.2, lo que la convierte en el punto de entrada para sistemas en vivo económicos','menos que el QSC K12.2: el punto de entrada para sistemas en vivo económicos'],
['player-strat-vs-pacifica','verdictProsCons[0].cons_es[0]','por un conjunto de características equivalente','por unas funciones equivalentes'],
['best-digital-mixers','verdictProsCons[5].pros_es[3]','hasta 96 canales mediante stage boxes','hasta 96 canales con stage boxes'],
['best-looper-pedals','verdictProsCons[0].pros_es[2]','sincroniza con cajas de ritmos, DAWs y pedaleras mediante reloj MIDI','sincroniza con cajas de ritmos, DAWs y pedaleras por reloj MIDI'],
['best-instrument-mics','verdictProsCons[6].pros_es[2]','Control inalámbrico mediante la app PolarPilot','Control inalámbrico desde la app PolarPilot'],
['stream-controllers','verdictProsCons[2].pros_es[2]','Canales ilimitados mediante paginado de perillas','Canales ilimitados con paginado de perillas'],
];
function seg(o, p) {
  const m = p.match(/^(\w+)\[(\d+)\]$/);
  return m ? o[m[1]][+m[2]] : o[p];
}
let ok = 0; const fail = [];
FX.forEach(([scope, path, oldS, newS]) => {
  const root = scope[0] === 'P' ? P.find(p => p.id === +scope.slice(1)) : G.find(g => g.id === scope);
  if (!root) { fail.push('scope? ' + scope); return; }
  const parts = path.split('.');
  const last = parts.pop();
  let o = root;
  for (const p of parts) { o = seg(o, p); if (o === undefined) break; }
  const m = last.match(/^(\w+)\[(\d+)\]$/);
  let cur;
  if (m) { cur = o[m[1]][+m[2]]; } else { cur = o[last]; }
  if (typeof cur !== 'string' || !cur.includes(oldS)) { fail.push(scope + ' :: ' + path + ' :: NO: ' + oldS.slice(0, 50)); return; }
  const nv = cur.split(oldS).join(newS);
  if (m) o[m[1]][+m[2]] = nv; else o[last] = nv;
  ok++;
});
// ie900: locate section containing the audifono string (index shifted)
{
  const g = G.find(x => x.id === 'ie900-vs-se846');
  let done = false;
  g.sections.forEach(s => {
    if (s.content_es && s.content_es.includes('permite reajustar el audífono en segundos')) {
      s.content_es = s.content_es.split('permite reajustar el audífono en segundos').join('permite reajustar el auricular en segundos');
      done = true; ok++;
    }
  });
  if (!done) fail.push('ie900 audifono no localizado');
}
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2) + '\n');
console.log('aplicados: ' + ok + ' | fallos: ' + fail.length);
fail.forEach(f => console.log(' ! ' + f));
