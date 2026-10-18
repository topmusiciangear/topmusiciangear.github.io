const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const rg = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(rg, 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');

const pares = [
  // --- ENCABEZADO: "Strongest" sigue siendo ambiguo, hay que decir CONTINUA ---
  ['Is the Behringer Truth 3.5 BT the Strongest Monitor Under $150?',
   'Is the Behringer Truth 3.5 BT the Highest Continuous Power Under $150?'],
  ['¿Es el Behringer Truth 3.5 BT el monitor con más potencia por debajo de $150?',
   '¿Es el Behringer Truth 3.5 BT el monitor con más potencia continua por debajo de $150?'],

  // --- INTRO: no hemos medido nada ourselves, son datos de fabricante ---
  ['We measured what actually changes at this price and what does not',
   'We compared what actually changes at this price and what does not'],

  // --- SECCION 1 (EN, textos exactos) ---
  ['in a cabinet that is MDF rather than plastic',
   'in an MDF cabinet rather than plastic'],
  ['The tone knob is unusual at this price and genuinely useful.',
   'The tone control is unusual at this price and genuinely useful.'],
  ['play it back at a party without a second system',
   'play it back at a party without changing gear'],

  // --- SECCION 2 (EN, textos exactos) ---
  ['and a crossover at 2.8 kHz', 'and a crossover filter at 2.8 kHz'],
  ['which matters to a beginner more than it does to an engineer',
   'which matters to a beginner more than it does to a working engineer'],
  ['also the one that gives away the most low end',
   'also the one that gives you the least real bass'],
  ['that is a more meaningful upgrade than any specification on this page',
   'and that matters far more than any specification in this guide'],

  // --- VEREDICTO R1280T ---
  ['Will flatter your mixes rather than reveal them',
   'Makes your mixes sound better than they really are'],
  ['19,000-odd reviews and rising', 'Thousands of reviews and rising'],

  // --- CONCLUSION: mismo error de los pads + "translate" + fragmento ---
  ['If you mix and want mixes that translate, buy the Mackie CR4.5.',
   'If you mix and want your work to sound right on other systems, buy the Mackie CR4.5.'],
  ['the Mackie CR3.5 takes it, the only pair here that ships with isolation pads, and it also adds a front tone knob.',
   'the Mackie CR3.5 takes it, one of only two pairs here that ship with isolation pads in the box.'],
  ['buy the R1280T, accept what it is, and stop expecting it to translate.',
   'buy the R1280T and use it for what it is genuinely good at.'],
  ['Si mezclas y quieres mezclas que trasladen, compra el Mackie CR4.5.',
   'Si mezclas y quieres que tu trabajo suene igual en otros equipos, compra el Mackie CR4.5.'],
  ['Si mezclas a volumen alto, el Behringer Truth 3.5 BT:',
   'Si mezclas a volumen alto, elige el Behringer Truth 3.5 BT:'],
  ['el Mackie CR3.5 se lo lleva, el único par de aquí con pads de aislamiento de serie, y además suma un knob de tono frontal.',
   'el Mackie CR3.5 se lo lleva, uno de los dos únicos pares de aquí que traen los pads de aislamiento en la caja.'],
  ['compra el R1280T, acepta lo que es y deja de esperar que traslade.',
   'compra el R1280T y úsalo para lo que hace bien.'],

  // --- VEREDICTO ES ---
  ['Mejor monitor para empezar de cero', 'Mejor monitor como primera compra']
];

let cuenta = 0;
const faltan = [];
function aplicar(txt) {
  let x = txt;
  for (const [a, b] of pares) {
    if (x.indexOf(a) >= 0) { x = x.split(a).join(b); cuenta++; }
  }
  return x;
}
function recorrer(o) {
  if (typeof o === 'string') return aplicar(o);
  if (Array.isArray(o)) return o.map(recorrer);
  if (o && typeof o === 'object') { const s = {}; for (const k of Object.keys(o)) s[k] = recorrer(o[k]); return s; }
  return o;
}
const limpio = recorrer(g);
Object.keys(limpio).forEach(k => { g[k] = limpio[k]; });

const fin = JSON.stringify(g);
pares.forEach(([a, b]) => { if (fin.indexOf(b) < 0) faltan.push(a); });
fs.writeFileSync(rg, JSON.stringify(guides, null, 2), 'utf8');

console.log('sustituciones: ' + cuenta + ' | pares no encontrados: ' + faltan.length);
faltan.forEach(f => console.log('   NO ENCONTRADO -> ' + f.slice(0, 70)));
console.log('');
['only pair here that ships', 'único par de aquí con pads', 'mixes that translate',
 'que traslade', 'We measured', 'tone knob', 'knob de tono', '19,000', '20,000',
 'Strongest Monitor', 'poderoso '].forEach(k => {
  console.log('  "' + k + '": ' + (fin.indexOf(k) >= 0 ? 'AUN PRESENTE' : 'fuera'));
});
console.log('');
console.log('caracteres CJK/coreanos: ' + (/[\uAC00-\uD7AF\u4E00-\u9FFF\u3040-\u30FF]/.test(fin) ? 'SI <-- MAL' : 'no'));