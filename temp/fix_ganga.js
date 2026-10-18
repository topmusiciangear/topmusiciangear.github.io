const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const rg = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(rg, 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');

// "lo mas parecido a una ganga" es calco de "the closest thing to a bargain"
// y ademas se contradice: la seccion explica que el HS3 queda fuera POR CARO.
const pares = [
  ['The Yamaha HS3 is the closest thing to a bargain here, at $190 to $230 depending on the retailer, and it is a genuinely good monitor with balanced XLR and proper Room Control switches. It simply is not a sub-$150 pair.',
   'The Yamaha HS3 costs $190 to $230 depending on the retailer, and it is a genuinely good monitor with balanced XLR and proper Room Control switches. It simply is not a sub-$150 pair.'],
  ['El Yamaha HS3 es lo más parecido a una ganga de esta lista, entre $190 y $230 según la tienda, y es un monitor genuinamente bueno con XLR balanceado y conmutadores de Room Control de verdad. Simplemente no es un par por debajo de $150.',
   'El Yamaha HS3 cuesta entre $190 y $230 según la tienda, y es un monitor genuinamente bueno con XLR balanceado y conmutadores de corrección de sala de verdad. Simplemente no es un par por debajo de $150.']
];

let cuenta = 0;
const faltan = [];
function aplicar(t) { let x = t; for (const [a, b] of pares) if (x.indexOf(a) >= 0) { x = x.split(a).join(b); cuenta++; } return x; }
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

console.log('sustituciones: ' + cuenta + ' | no encontrados: ' + faltan.length);
faltan.forEach(f => console.log('   -> ' + f.slice(0, 60)));
console.log('');
console.log('quedan "ganga": ' + (fin.match(/ganga/g) || []).length + ' | "bargain": ' + (fin.match(/bargain/g) || []).length);
console.log('CJK/coreanos: ' + (/[\uAC00-\uD7AF\u4E00-\u9FFF\u3040-\u30FF]/.test(fin) ? 'SI <-- MAL' : 'no'));