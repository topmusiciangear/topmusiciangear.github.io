const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const gFile = DIR + 'data/guides.json';
const G = JSON.parse(fs.readFileSync(gFile, 'utf8'));
const g = G.find(x => x.id === 'budget-monitors');
const rep1 = (txt, from, to) => {
  const c = txt.split(from).length - 1;
  if (c !== 1) throw new Error('found ' + c + 'x: ' + from.slice(0, 60));
  return txt.split(from).join(to);
};
// 1) IN-8 tweeter cell: name the 4" mid
const t = g.productTable;
const ci = t.columns.findIndex(c => /IN-8/.test(c.title));
const tw = t.rows.find(r => r.label === 'Tweeter');
if (tw.values[ci].value !== '1" (coaxial)') throw new Error('IN8 tweeter changed');
tw.values[ci].value = '1" + 4" coaxial mid';
tw.values[ci].value_es = '1" + medios coaxiales de 4"';
console.log('table IN-8 fixed');
// 2) LP-UNF verdict: replace 85dB con with cable con
let v = g.verdictProsCons.find(x => /LP-UNF/.test(x.name));
v.cons = v.cons.map(x => x === '85 dB continuous output caps loud-tracking headroom'
  ? 'The second speaker tethers via cable \u2014 the stereo pair is not fully wireless' : x);
v.cons_es = v.cons_es.map(x => x === 'Los 85 dB continuos limitan el headroom para grabar fuerte'
  ? 'El segundo altavoz va conectado por cable \u2014 el par est\u00e9reo no es totalmente inal\u00e1mbrico' : x);
if (!v.cons.some(x => x.includes('tethers via cable'))) throw new Error('UNF con not replaced');
// 3) LP-6 con reword
v = g.verdictProsCons.find(x => /LP-6/.test(x.name));
v.cons = v.cons.map(x => x === 'Its 80W total output is the lowest of the four, so very loud monitoring runs out of headroom first'
  ? 'Its 80W output suits nearfield work but runs short if you try to fill a large room' : x);
v.cons_es = v.cons_es.map(x => x === 'Su salida total de 80W es la m\u00e1s baja de las cuatro, as\u00ed que la monitorizaci\u00f3n muy fuerte se queda sin margen primero'
  ? 'Su potencia de 80W es id\u00f3nea para campo cercano, pero se queda justa si intentas sonorizar una sala grande' : x);
if (!v.cons.some(x => x.includes('fill a large room'))) throw new Error('LP6 con not replaced');
// 4) HS8: remove tweeter-headroom con
v = g.verdictProsCons.find(x => /HS8/.test(x.name));
const n0 = v.cons.length, n0es = v.cons_es.length;
v.cons = v.cons.filter(x => x !== 'The 120W amplifier is split 75W bass / 45W treble, so the tweeter runs out of headroom first on loud high-frequency material');
v.cons_es = v.cons_es.filter(x => x !== 'El amplificador de 120W se reparte 75W para graves y 45W para agudos, as\u00ed que el tweeter se queda sin margen antes en material brillante');
if (v.cons.length !== n0 - 1 || v.cons_es.length !== n0es - 1) throw new Error('HS8 con not removed');
console.log('verdicts fixed');
fs.writeFileSync(gFile, JSON.stringify(G, null, 2) + '\n');
// 5) product desc qualifier
const pFile = DIR + 'data/products.json';
const P = JSON.parse(fs.readFileSync(pFile, 'utf8'));
const p = P.find(x => x.id === 307);
if (!p.desc.includes('The 39Hz-25kHz response')) throw new Error('desc EN changed');
if (!p.desc_es.includes('La respuesta de 39Hz-25kHz')) throw new Error('desc ES changed');
p.desc = p.desc.replace('The 39Hz-25kHz response', 'The 39Hz-25kHz (-10 dB) response');
p.desc_es = p.desc_es.replace('La respuesta de 39Hz-25kHz', 'La respuesta de 39Hz-25kHz (-10 dB)');
fs.writeFileSync(pFile, JSON.stringify(P, null, 2) + '\n');
console.log('product desc qualified');
