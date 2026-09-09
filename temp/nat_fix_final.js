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

  if (g.id === 'best-headphones') {
    f = fix(f, 'The gold standard for closed-back monitoring', 'The reference for closed-back monitoring');
    f = fix(f, 'the scientific gold standard for frequency response', 'the frequency response target science has settled on');
    f = fix(f, 'El estándar de oro del monitoreo cerrado', 'La referencia en monitoreo cerrado');
  }

  if (g.id === 'studio-furniture') {
    f = fix(f, 'The gold standard — quiet', 'The reference cable — quiet');
    f = fix(f, 'El estándar de oro — silencioso', 'El cable de referencia — silencioso');
    f = fix(f, 'Eleva tu sonido: soportes de monitor K&M', 'Monitores bien ubicados: soportes K&M');
  }

  if (g.id === 'beginner-guitar') {
    f = fix(f, 'cambiar pastillas después desbloquea más', 'cambiar pastillas después abre más');
  }

  if (g.id === 'scarlett-vs-motu') {
    f = fix(f, 'The Proven Workhorse', 'The Reliable Go-To');
  }

  if (g.id === 'best-bass-under-700') {
    f = fix(f, 'la máquina del metal', 'la opción para metal');
    f = fix(f, 'la máquina del funk', 'la opción para funk');
  }

  return f;
});

fs.writeFileSync(__dirname + '/_nat_chunk1.json', JSON.stringify(fixed, null, 2), 'utf8');
try {
  JSON.parse(fs.readFileSync(__dirname + '/_nat_chunk1.json', 'utf8'));
  console.log('JSON OK');
} catch(e) { console.error('JSON ERROR:', e.message); }
console.log('Additional fixes:', fixCount);
