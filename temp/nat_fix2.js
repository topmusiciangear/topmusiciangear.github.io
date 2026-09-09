const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/_nat_chunk2.json','utf8'));

let fixes = 0;

function r(str, search, replace) {
  if (typeof str !== 'string') return str;
  if (str.includes(search)) {
    fixes++;
    return str.replace(search, replace);
  }
  return str;
}

function rAll(str, search, replace) {
  if (typeof str !== 'string') return str;
  if (str.includes(search)) {
    const count = str.split(search).length - 1;
    fixes += count;
    return str.split(search).join(replace);
  }
  return str;
}

// budget-bass-like-expensive
const bbl = g.find(x=>x.id==='budget-bass-like-expensive');
bbl.verdict_es = rAll(bbl.verdict_es, 'caballo de batalla versátil', 'opción versátil');

// best-drum-machine
const bdm = g.find(x=>x.id==='best-drum-machine');
bdm.conclusion_es = rAll(bdm.conclusion_es, 'a otro nivel', 'un paso notable');

// best-beginner-electric-guitar
const beg = g.find(x=>x.id==='best-beginner-electric-guitar');
// verdict_es: "mejor eléctrica todoterreno para principiantes" → "mejor eléctrica versátil para principiantes"
beg.verdict_es = r(beg.verdict_es, 'mejor eléctrica todoterreno para principiantes', 'mejor eléctrica versátil para principiantes');
// conclusion_es: "mejor todoterreno," → "mejor opción versátil,"
beg.conclusion_es = r(beg.conclusion_es, 'mejor todoterreno', 'mejor opción versátil');
// Also fix the mics-for-creators verdict
const mfc = g.find(x=>x.id==='mics-for-creators');
mfc.verdict_es = r(mfc.verdict_es, 'el mejor todoterreno para creadores', 'la mejor opción versátil para creadores');

// pro-headphones
const ph = g.find(x=>x.id==='pro-headphones');
ph.verdict_es = r(ph.verdict_es, 'un caballo de batalla', 'un socio diario');

// k371-vs-mdr7506 ES s1: "estándar de la industria" (remaining)
const k371 = g.find(x=>x.id==='k371-vs-mdr7506');
k371.sections[1].content_es = r(k371.sections[1].content_es, 'el estándar de la industria para grabación de sonido en exteriores', 'el preferido para grabación de sonido en exteriores');

// yamaha-mg-vs-behringer-xenyx conclusion_es: "estándar de la industria en calidad"
const ymg = g.find(x=>x.id==='yamaha-mg-vs-behringer-xenyx');
ymg.conclusion_es = r(ymg.conclusion_es, 'el estándar de la industria en calidad', 'la referencia en calidad');

// c414-vs-u87: "sin esfuerzo" (2x) - borderline natural, but let's clean them up
const c414 = g.find(x=>x.id==='c414-vs-u87');
c414.sections[0].content_es = rAll(c414.sections[0].content_es, 'sin esfuerzo', 'sin artificios');
c414.sections[2].content_es = rAll(c414.sections[2].content_es, 'sin esfuerzo', 'sin artificios');

// dxr-vs-prx conclusion_es: "sin complicaciones" - already replaced first, check remaining
const dxr = g.find(x=>x.id==='dxr-vs-prx');
// Should already be fixed from first pass. Verify.
if (dxr.conclusion_es.includes('sin complicaciones')) {
  dxr.conclusion_es = rAll(dxr.conclusion_es, 'sin complicaciones', 'sin líos');
}

fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/_nat_chunk2.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Additional fixes:', fixes);

// Verify JSON
try {
  JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/_nat_chunk2.json','utf8'));
  console.log('JSON valid: YES');
} catch(e) {
  console.log('JSON valid: NO -', e.message);
}
