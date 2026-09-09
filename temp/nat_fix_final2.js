const fs = require('fs');
const d = require('../temp/_nat_chunk1.json');

function walk(obj, fn) {
  if (typeof obj === 'string') return fn(obj);
  if (Array.isArray(obj)) return obj.map(item => walk(item, fn));
  if (obj && typeof obj === 'object') {
    const result = {};
    for (const k of Object.keys(obj)) result[k] = walk(obj[k], fn);
    return result;
  }
  return obj;
}

let fixCount = 0;
function fix(obj, oldStr, newStr) {
  return walk(obj, s => {
    if (s.includes(oldStr)) { fixCount++; return s.split(oldStr).join(newStr); }
    return s;
  });
}

const fixed = d.map(g => {
  let f = g;

  if (g.id === 'stage-mics') {
    f = fix(f, 'The SM58 is the world standard for live vocals', 'The SM58 is the most-used vocal mic for live vocals');
    f = fix(f, 'The world standard for live vocals — outsold', 'The most-used vocal mic for live vocals — outsold');
    f = fix(f, 'El SM58 es el estándar mundial para voces en vivo', 'El SM58 es el micrófono más usado para voces en vivo');
    f = fix(f, 'El estándar mundial de voces en vivo', 'El micrófono más usado para voces en vivo');
  }

  if (g.id === 'ableton-vs-fl-studio') {
    f = fix(f, 'Ableton Live 12 Suite is the benchmark most electronic producers compare against',
              'Ableton Live 12 Suite is the one most electronic producers measure everything else against');
  }

  if (g.id === 'fix-clipping-scarlett') {
    f = fix(f, 'El micrófono dinámico estándar de la industria para transmisión',
              'El micrófono dinámico que más se usa para transmisión');
  }

  if (g.id === 'best-digital-pianos') {
    f = fix(f, 'It is a pro-level investment versus home options', 'It is a big-ticket investment compared to home options');
  }

  if (g.id === 'pro-guitars') {
    f = fix(f, 'The most advanced Strat ever made versus the definitive rock workhorse.',
              'The most advanced Strat ever made versus the guitar that defined rock.');
    f = fix(f, 'is the definitive rock workhorse —', 'is the guitar that defined rock —');
    f = fix(f, '<strong>The definitive rock workhorse.</strong>', '<strong>The guitar that defined rock.</strong>');
    f = fix(f, 'is the definitive rock workhorse with Burstbucker pickups', 'is the guitar that defined rock, with Burstbucker pickups');
    f = fix(f, 'makes complex runs feel effortless', 'makes complex runs feel smooth');
    f = fix(f, 'hace que los pasajes complejos sean sin esfuerzo', 'hace que los pasajes complejos se sientan fluidos');
  }

  if (g.id === 'best-wireless-iems') {
    f = fix(f, 'para desbloquear lo que este sistema  entrega', 'para aprovechar lo que este sistema puede dar');
  }

  return f;
});

fs.writeFileSync(__dirname + '/_nat_chunk1.json', JSON.stringify(fixed, null, 2), 'utf8');
try { JSON.parse(fs.readFileSync(__dirname + '/_nat_chunk1.json', 'utf8')); console.log('JSON OK'); }
catch(e) { console.error('JSON ERROR:', e.message); }
console.log('Fixes applied:', fixCount);