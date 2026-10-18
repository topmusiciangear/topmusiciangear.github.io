const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const rg = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(rg, 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');

const pares = [
  ['A 4.5-inch woofer reaching 55 Hz for $129.99 is the deepest bass available new at this budget, and it beats the M-Audio BX4 that costs ten dollars more.',
   'A 4.5-inch woofer reaching 65 Hz at minus 3 dB for $129.99 is the deepest bass available new at this budget, and it beats the M-Audio BX4, which costs ten dollars more and reaches 69 Hz without stating an attenuation.'],
  ['Un woofer de 4,5 pulgadas que llega a 55 Hz por $129.99 es el grave más profundo disponible nuevo en este presupuesto, y le gana al M-Audio BX4 que cuesta diez dólares más.',
   'Un woofer de 4,5 pulgadas que llega a 65 Hz a menos 3 dB por $129.99 es el grave más profundo disponible nuevo en este presupuesto, y le gana al M-Audio BX4, que cuesta diez dólares más y llega a 69 Hz sin indicar atenuación.'],
  ['Deepest new bass available at this budget, 55 Hz', 'Deepest new bass here: 65 Hz at -3 dB'],
  ['El grave más profundo nuevo en este presupuesto, 55 Hz', 'El grave más profundo de aquí: 65 Hz a -3 dB'],
  ['A 4.5-inch woofer and silk-dome tweeter on 50W RMS of Class A/B bi-amplification, reaching 55 Hz',
   'A 4.5-inch woofer and silk dome on 50W RMS of Class A/B bi-amplification reaching 65 Hz at -3 dB'],
  ['A 4.5-inch woven woofer and silk-dome tweeter on 50W RMS of Class A/B bi-amplification reaching 55 Hz',
   'A 4.5-inch woven woofer and silk dome on 50W RMS of Class A/B bi-amplification reaching 65 Hz at -3 dB']
];

let n = 0;
const Aplicar = txt => {
  let x = txt;
  for (const [a, b] of pares) {
    while (x.includes(a)) { x = x.split(a).join(b); n++; }
  }
  return x;
};
let n = 0;
const rec = o => {
  if (typeof o === 'string') return aplicar(o);
  if (Array.isArray(o)) return o.map(rec);
  if (o && typeof o === 'object') { const s = {}; for (const k of Object.keys(o)) s[k] = rec(o[k]); return s; }
  return o;
};
const c = rec(g);
Object.keys(c).forEach(k => { g[k] = c[k]; });
fs.writeFileSync(rg, JSON.stringify(guides, null, 2), 'utf8');
console.log('sustituciones aplicadas: ' + n);

// verificacion final: toda mencion a 55 Hz debe llevar -10 dB al lado
const todo = JSON.stringify(g);
const malas = [...todo.matchAll(/.{60}55 ?Hz(?!.{0,18}(dB|-10)).{25}/g)];
console.log('\n=== 55 Hz SIN ATENUACION (debe ser 0) ===');
console.log('  ' + malas.length);
malas.slice(0, 6).forEach(m => console.log('  ! ...' + m[0]));
