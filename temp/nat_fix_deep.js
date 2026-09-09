const fs = require('fs');
const d = require('../temp/_nat_chunk1.json');

// Recursively walk all string values in a JSON object
function walkStrings(obj, fn) {
  if (typeof obj === 'string') return fn(obj);
  if (Array.isArray(obj)) return obj.map(item => walkStrings(item, fn));
  if (obj && typeof obj === 'object') {
    const result = {};
    for (const k of Object.keys(obj)) {
      result[k] = walkStrings(obj[k], fn);
    }
    return result;
  }
  return obj;
}

let total = 0;

// === EN fixes (non-_es fields) ===
function fixEn(obj) {
  return walkStrings(obj, (s) => {
    let r = s;
    // best-headphones: workhorse in productTable
    r = r.replace(/a pair of headphones that sounds this good at this price is a workhorse/g, 'a pair of headphones that sounds this good at this price is a rare find');
    // apollo-vs-babyface: studio-grade in productTable
    r = r.replace(/studio-grade analog emulation/g, 'high-quality analog emulation');
    // apollo-vs-babyface: bulletproof in productTable
    r = r.replace(/bulletproof drivers/g, 'rock-solid drivers');
    r = r.replace(/bulletproof routing/g, 'rock-solid routing');
    // jbl-vs-kali: incredible in productTable
    r = r.replace(/are incredible/g, 'are seriously good');
    // scarlett-vs-motu: hassle-free in productTable
    r = r.replace(/hassle-free setup/g, 'straightforward setup');
    // scarlett-vs-motu: studio-grade in productTable
    r = r.replace(/studio-grade metering/g, 'accurate metering');
    // best-bass-under-700: workhorse in productTable
    r = r.replace(/passive studio workhorse/g, 'passive studio go-to');
    r = r.replace(/the workhorse/g, 'the go-to');
    r = r.replace(/A workhorse/, 'A go-to');
    // best-bass-under-700: incredible in productTable
    r = r.replace(/incredible quality/g, 'seriously good quality');
    r = r.replace(/incredible/g, 'impressive');
    // pro-guitars: definitive rock machine in productTable
    r = r.replace(/the definitive rock machine/g, 'the definitive rock workhorse');
    r = r.replace(/The definitive rock machine/g, 'The definitive rock workhorse');
    // nx912-vs-pxm12mp: monster in productTable
    r = r.replace(/a monster/g, 'a powerhouse');
    return r;
  });
}

// === ES fixes (_es fields) ===
function fixEs(obj) {
  return walkStrings(obj, (s) => {
    let r = s;
    // best-headphones: caballo de batalla
    r = r.replace(/caballo de batalla/g, 'opción que nunca falla');
    // beginner-guitar: increíble
    r = r.replace(/increíble/g, 'muy buena');
    // scarlett-vs-motu: sin complicaciones
    r = r.replace(/sin complicaciones/g, 'sencilla');
    // scarlett-vs-motu: nivel profesional
    r = r.replace(/nivel profesional/g, 'calidad profesional');
    // best-bass-under-700: la bestia / bestia de
    r = r.replace(/la bestia de carga/g, 'la favorita de carga');
    r = r.replace(/la bestia/g, 'la favorita');
    r = r.replace(/bestia de carga/g, 'favorita de carga');
    // pro-guitars: máquina de
    r = r.replace(/la máquina de rock definitiva/g, 'la guitarra de rock por excelencia');
    r = r.replace(/La máquina de rock definitiva/g, 'La guitarra de rock por excelencia');
    r = r.replace(/máquina de rock/g, 'guitarra de rock');
    // budget-usb-mics: todoterreno
    r = r.replace(/todoterreno/g, 'versátil');
    return r;
  });
}

const fixed = d.map(g => {
  // Fix EN fields
  let fixed = fixEn(g);
  // Fix ES fields specifically
  fixed = fixEs(fixed);
  return fixed;
});

fs.writeFileSync(__dirname + '/_nat_chunk1.json', JSON.stringify(fixed, null, 2), 'utf8');

// Verify
try {
  JSON.parse(fs.readFileSync(__dirname + '/_nat_chunk1.json', 'utf8'));
  console.log('JSON OK');
} catch(e) {
  console.error('JSON ERROR:', e.message);
}

console.log('Guides:', fixed.length);
