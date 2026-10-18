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
  ['A 4.5-inch woven woofer and silk-dome tweeter on 50W RMS of Class A/B bi-amplification, reaching 55 Hz, the deepest bass available new on a pair under $150.',
   'A 4.5-inch woven woofer and silk dome on 50W RMS of Class A/B bi-amplification reaching 65 Hz at minus 3 dB, the deepest bass available new on a pair under $150.'],
  ['Woofer de 4,5 pulgadas de tejido y cúpula de seda con 50 W RMS bi-amplificados en Clase A/B, bajando hasta 55 Hz, lo que lo convierte en el grave más profundo que puedes comprar nuevo por un par por debajo de $150.',
   'Woofer de 4,5 pulgadas de tejido y cúpula de seda con 50 W RMS bi-amplificados en Clase A/B, bajando hasta 65 Hz a menos 3 dB, lo que lo convierte en el grave más profundo que puedes comprar nuevo por un par por debajo de $150.']
];

let cuenta = 0;

function aplicar(txt) {
  let x = txt;
  for (const par of pares) {
    while (x.indexOf(par[0]) >= 0) { x = x.split(par[0]).join(par[1]); cuenta++; }
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
fs.writeFileSync(rg, JSON.stringify(guides, null, 2), 'utf8');
console.log('sustituciones aplicadas: ' + cuenta);

const todo = JSON.stringify(g);
const malas = todo.match(/.{55}55 ?Hz(?!.{0,20}(dB|-10)).{20}/g) || [];
console.log('\n=== 55 Hz SIN ATENUACION (debe ser 0) ===');
console.log('  ' + malas.length);
malas.slice(0, 6).forEach(m => console.log('  ! ...' + m + '...'));
