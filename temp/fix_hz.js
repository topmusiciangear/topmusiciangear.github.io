const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const rg = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(rg, 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');

// ---- tabla:Extension de graves con la atenuacion correcta ----
const fila = g.productTable.rows.find(r => r.label === 'Bass extension (stated)');
fila.values[0] = { value: '65 Hz - 20 kHz (-3 dB) / 55 Hz at -10 dB', value_es: '65 Hz - 20 kHz (-3 dB) / 55 Hz a -10 dB' };
fila.values[3] = { value: '70 Hz - 20 kHz (-3 dB) / 60 Hz at -10 dB', value_es: '70 Hz - 20 kHz (-3 dB) / 60 Hz a -10 dB' };

// ---- textos ----
const swaps = [
  ['It reaches 55 Hz, the lowest bass figure of any real monitor in this guide',
   'It reaches 65 Hz at minus 3 dB, the lowest figure of any real monitor in this guide, though the margin over the M-Audio BX4 is only four hertz'],
  ['Llega a 55 Hz, la cifra de graves más baja de cualquier monitor real de esta guía',
   'Llega a 65 Hz a menos 3 dB, la cifra más baja de cualquier monitor real de esta guía, aunque la ventaja sobre el M-Audio BX4 es de solo cuatro hercios'],
  ['+ Lowest bass figure of any real monitor here, 55 Hz', '+ Lowest bass figure of any real monitor here: 65 Hz at -3 dB'],
  ['+ La cifra de graves más baja de los monitores reales de aquí, 55 Hz', '+ La cifra de graves más baja de los monitores reales de aquí: 65 Hz a -3 dB'],
  ['reaching 55 Hz, which makes it the deepest bass you can buy new for a pair under $150',
   'reaching 65 Hz at minus 3 dB, the deepest bass you can buy new for a pair under $150'],
  ['A 4.5-inch woven woofer on 50W RMS reaching 55 Hz, the deepest new bass under $150, with a front tone knob and location switch.',
   'A 4.5-inch woven woofer on 50W RMS reaching 65 Hz at -3 dB, the deepest bass under $150, with a front tone knob and location switch.'],
  ['Woofer de 4,5 pulgadas con 50 W RMS hasta 55 Hz, el grave nuevo más profundo bajo $150, con knob de tono y conmutador.',
   'Woofer de 4,5 pulgadas con 50 W RMS hasta 65 Hz a -3 dB, el grave más profundo bajo $150, con knob de tono y conmutador.']
];

let n = 0;
const rec = o => {
  if (typeof o === 'string') { let x = o; for (const [a, b] of swaps) if (x.includes(a)) { x = x.split(a).join(b); n++; } return x; }
  if (Array.isArray(o)) return o.map(rec);
  if (o && typeof o === 'object') { const s = {}; for (const k of Object.keys(o)) s[k] = rec(o[k]); return s; }
  return o;
};
const c = rec(g);
Object.keys(c).forEach(k => { g[k] = c[k]; });

// ---- anadir el CR4.5 al contraste de la seccion 0 ----
const s0 = g.sections[0];
s0.content = s0.content.replace(
  'The Mackie CR4.5 is quoted at 55 Hz to 20 kHz and the M-Audio BX4 at 69 Hz.',
  'The Mackie CR4.5 is quoted twice: 55 Hz at minus 10 dB and 65 Hz at minus 3 dB, which is why the manufacturer can show you either number. The M-Audio BX4 states 69 Hz with no attenuation at all.'
);
s0.content_es = s0.content_es.replace(
  'El Mackie CR4.5 está citado como 55 Hz a 20 kHz y el M-Audio BX4 como 69 Hz.',
  'El Mackie CR4.5 está citado dos veces: 55 Hz a menos 10 dB y 65 Hz a menos 3 dB, y por eso el fabricante puede enseñarte cualquiera de las dos cifras. El M-Audio BX4 declara 69 Hz sin indicar atenuación alguna.'
);

fs.writeFileSync(rg, JSON.stringify(guides, null, 2), 'utf8');
console.log('textos corregidos: ' + n + '/7 | seccion 0 ampliada');

// ---- ficha del producto ----
const rp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(rp, 'utf8'));
const p = products.find(x => x.id === 1048);
p.desc = 'A 4.5-inch woven woofer on 50W RMS reaching 65 Hz at -3 dB, the deepest bass under $150, with a front tone knob and location switch.';
p.desc_es = 'Woofer de 4,5 pulgadas con 50 W RMS hasta 65 Hz a -3 dB, el grave más profundo bajo $150, con knob de tono y conmutador.';
fs.writeFileSync(rp, JSON.stringify(products, null, 2), 'utf8');
console.log('ficha 1048: desc EN=' + p.desc.length + ' ES=' + p.desc_es.length + ' (caben en 3 lineas)');

// ---- verificacion ----
const todo = JSON.stringify(g) + JSON.stringify(products);
console.log('\n=== QUEDAN REFERENCIAS A 55 Hz SIN ATENUACION ===');
[...todo.matchAll(/.{70}55 ?Hz.{40}/g)].slice(0, 8).forEach(m => console.log('  ...' + m[0] + '...'));
