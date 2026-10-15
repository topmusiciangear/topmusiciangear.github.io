// Conclusion reescrita con las 3 correcciones del usuario, mas dos que hacen falta:
//  - el NT1 5th Gen NO es "el mas silencioso": empata con el Signature a 4 dBA
//  - fuera la cifra del "micro de 3.000", que no es verificable
const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
let ok = 0; const fallos = [];
function swap(de, a, et) {
  const t0 = JSON.stringify(s);
  if (!t0.includes(de)) { fallos.push(et); return; }
  const c = t0.split(de).length - 1;
  (function rec(o) {
    if (typeof o === 'string') return o.split(de).join(a);
    if (Array.isArray(o)) return o.map(rec);
    if (o && typeof o === 'object') { Object.keys(o).forEach(k => { o[k] = rec(o[k]); }); }
    return o;
  })(s);
  ok += c; console.log('  ok (' + c + ')  ' + et);
}

/* ── residuos de la ronda anterior ── */
swap('it will not tell you that your mix is wrong the way a $3,000 microphone seems to',
  'it will not tell you that your mix is wrong the way a far more expensive microphone seems to',
  'seccion[5] EN: fuera el micro de $3,000');
swap('no te va a decir que tu mezcla está mal como parece hacer un micrófono de 3.000',
  'no te va a decir que tu mezcla está mal como parece hacer un micrófono mucho más caro',
  'seccion[5] ES: fuera el micro de 3.000');

/* ── CONCLUSION ──
   1) "cada pieza se puede pasar" -> solo las que de verdad se arrastran (pie, tratamiento)
   2) transicion de los auricularesConnected al nighttime
   3) "paneles" -> "tratamiento acustico" (el Nivel 3 necesita tambien trampas)
   + el NT1 5th Gen no es el mas silencioso: empata con el Signature a 4 dBA
   + fuera el Neumann de 3.000 dolares del cierre */
s.conclusion =
  '<p>Start with Tier 1. It is the honest, cheap way to find out whether you actually like recording yourself, and the pieces that carry over — the stand, the acoustic treatment — move into the next build without being wasted. The microphone and the interface do not carry over, and pretending otherwise is how people end up buying the same mistake twice.</p>' +
  '<p>Tier 2 is the one to buy if you are going to sing. The NT1 5th Generation records 32-bit float, so a loud take cannot clip and you stop riding the gain, and the ATH-M50x will not flatter anything you mix. That combination catches mistakes instead of hiding them, which is the only reason a mixing headphone is worth buying. Worth being clear about what the upgrade buys: the microphone is not quieter than the one in Tier 1, both are 4 dBA. You are paying for the USB output and the SSL character. And on any tier, the headphones are not a compromise — they are the right tool for the hour of the night when you are actually working.</p>' +
  '<p>Move up to Tier 3 when you are mixing other people’s work or selling it. It is the build that doubles the budget, and it is the point where analogue modelling and a Neumann capsule stop being luxuries. Before you get there, put the money into the room rather than into anything on this list.</p>' +
  '<p>And whatever you spend on the rest, do not skip the acoustic treatment. The cheapest microphone in any of these builds will sound better in a treated room than the most expensive one will sound in an untreated bedroom.</p>';

s.conclusion_es =
  '<p>Empieza por el Nivel 1. Es la forma barata y honesta de averiguar si de verdad te gusta grabarte, y las piezas que sí se arrastran —el soporte, el tratamiento acústico— pasan al siguiente montaje sin desperdiciarse. El micrófono y la interfaz no se arrastran, y fingir lo contrario es cómo se acaba comprando dos veces el mismo error.</p>' +
  '<p>El Nivel 2 es el que hay que comprar si vas a cantar. El NT1 5th Generation graba en coma flotante de 32 bits, así que una toma fuerte no puede saturar y dejas de vigilar la ganancia, y los ATH-M50x no van a adular nada de lo que mezcles. Esa combinación atrapa los errores en vez de esconderlos, y esa es la única razón por la que merece la pena comprar auriculares de mezcla. Vale la pena ser claro sobre qué te da la mejora: el micrófono no es más silencioso que el del Nivel 1, los dos están en 4 dBA. Pagas por la salida USB y por el carácter de la SSL. Y en cualquier nivel, los auriculares no son un compromiso: son la herramienta correcta para la hora de la noche en la que realmente trabajas.</p>' +
  '<p>Sube al Nivel 3 cuando ya mezcles o vendas el trabajo de otros. Es el montaje que duplica el presupuesto, y es el punto en el que el modelado analógico y una cápsula Neumann dejan de ser lujos. Antes de llegar ahí, mete el dinero en la sala y no en nada de esta lista.</p>' +
  '<p>Y gastes lo que gastes en lo demás, no te saltes el tratamiento acústico. El micrófono más barato de cualquiera de estos montajes sonará mejor en una sala tratada que el más caro en un dormitorio sin tratar.</p>';
console.log('  ok        CONCLUSION reescrita (EN y ES)');
ok += 2;

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\n  reemplazos: ' + ok);
if (fallos.length) { console.log('  NO APLICADOS: ' + fallos.join(', ')); } else console.log('  ninguno fallido');

/* CONTROL */
const s2 = JSON.parse(fs.readFileSync(F, 'utf8')).find(x => x.id === 'starter-studio');
const t = JSON.stringify(s2);
console.log('\n=== CONTROL ===');
[['quietest large-diaphragm|más silencioso', '"el más silencioso"'], ['\\$3,000|3\\.000', 'cifra de 3.000'],
 ['do not skip the panels|no te saltes los paneles', '"no te saltes los paneles"'],
 ['every part of it can move|cada pieza se puede pasar', '"cada pieza se puede pasar"']
].forEach(([re, et]) => console.log('  ' + String((t.match(new RegExp(re, 'g')) || []).length).padStart(3) + '  ' + et));

console.log('\n=== CONCLUSION ES ===');
s2.conclusion_es.split('</p>').forEach((x, i) => console.log('\n[' + i + '] ' + x.replace(/<[^>]+>/g, '').trim()));
console.log('\n  mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
console.log('  longitud conclusion: EN ' + s2.conclusion.replace(/<[^>]+>/g, ' ').trim().split(' ').length + ' palabras / ES ' + s2.conclusion_es.replace(/<[^>]+>/g, ' ').trim().split(' ').length);
