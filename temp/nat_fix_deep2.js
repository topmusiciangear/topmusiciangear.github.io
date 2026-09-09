const fs = require('fs');
const d = require('../temp/_nat_chunk1.json');

// Walk object but only process _es fields for ES fixes
function walkEsFields(obj, fn) {
  if (typeof obj === 'string') return obj;
  if (Array.isArray(obj)) return obj.map(item => walkEsFields(item, fn));
  if (obj && typeof obj === 'object') {
    const result = {};
    for (const k of Object.keys(obj)) {
      if (k.endsWith('_es') && typeof obj[k] === 'string') {
        result[k] = fn(obj[k]);
      } else {
        result[k] = walkEsFields(obj[k], fn);
      }
    }
    return result;
  }
  return obj;
}

// Walk object but only process non-_es string fields for EN fixes
function walkEnFields(obj, fn) {
  if (typeof obj === 'string') return fn(obj);
  if (Array.isArray(obj)) return obj.map(item => walkEnFields(item, fn));
  if (obj && typeof obj === 'object') {
    const result = {};
    for (const k of Object.keys(obj)) {
      if (k.endsWith('_es')) {
        result[k] = obj[k]; // skip ES fields
      } else if (typeof obj[k] === 'string') {
        result[k] = fn(obj[k]);
      } else {
        result[k] = walkEnFields(obj[k], fn);
      }
    }
    return result;
  }
  return obj;
}

function enFix(s) {
  let r = s;
  r = r.replace(/sounds this good at this price is a workhorse/g, 'sounds this good at this price is a rare find');
  r = r.replace(/studio-grade analog emulation/g, 'high-quality analog emulation');
  r = r.replace(/bulletproof drivers/g, 'rock-solid drivers');
  r = r.replace(/bulletproof routing/g, 'rock-solid routing');
  r = r.replace(/are incredible values/g, 'are seriously good buys');
  r = r.replace(/hassle-free setup/g, 'straightforward setup');
  r = r.replace(/studio-grade metering/g, 'accurate metering');
  r = r.replace(/passive studio workhorse/g, 'passive studio go-to');
  r = r.replace(/is the workhorse/g, 'is the go-to');
  r = r.replace(/the workhorse/g, 'the go-to');
  r = r.replace(/A workhorse/g, 'A go-to');
  r = r.replace(/incredible quality/g, 'seriously good quality');
  r = r.replace(/incredible/g, 'impressive');
  r = r.replace(/the definitive rock machine/g, 'the definitive rock workhorse');
  r = r.replace(/The definitive rock machine/g, 'The definitive rock workhorse');
  r = r.replace(/a monster/g, 'a powerhouse');
  return r;
}

function esFix(s) {
  let r = s;
  r = r.replace(/caballo de batalla/g, 'opción que nunca falla');
  r = r.replace(/increíble/g, 'muy buena');
  r = r.replace(/sin complicaciones/g, 'sencilla');
  r = r.replace(/nivel profesional/g, 'calidad profesional');
  r = r.replace(/la bestia de carga/g, 'la favorita de carga');
  r = r.replace(/la bestia/g, 'la favorita');
  r = r.replace(/bestia de carga/g, 'favorita de carga');
  r = r.replace(/la máquina de rock definitiva/g, 'la guitarra de rock por excelencia');
  r = r.replace(/La máquina de rock definitiva/g, 'La guitarra de rock por excelencia');
  r = r.replace(/máquina de rock/g, 'guitarra de rock');
  r = r.replace(/todoterreno/g, 'versátil');
  return r;
}

const fixed = d.map(g => {
  let f = walkEnFields(g, enFix);
  f = walkEsFields(f, esFix);
  return f;
});

fs.writeFileSync(__dirname + '/_nat_chunk1.json', JSON.stringify(fixed, null, 2), 'utf8');

try {
  JSON.parse(fs.readFileSync(__dirname + '/_nat_chunk1.json', 'utf8'));
  console.log('JSON OK');
} catch(e) {
  console.error('JSON ERROR:', e.message);
}
console.log('Guides:', fixed.length);
