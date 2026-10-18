const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

// ============ 1. PRODUCTO NUEVO ============
const rp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(rp, 'utf8'));
const id = Math.max(...products.map(p => p.id)) + 1;

const nuevo = {
  id: id,
  title: 'Behringer Truth 3.5 BT',
  title_es: 'Behringer Truth 3.5 BT',
  brand: 'Behringer',
  category: 'monitors',
  price: 147,
  rating: 4.6,
  reviews: 400,
  badge: 'bestvalue',
  desc: "A 3.5-inch glass-fibre woofer and 1-inch silk dome on 64W of Class D, with Behringer's Advanced Waveguide and shelf trims at 70 Hz and 12 kHz.",
  desc_es: 'Woofer de 3,5 pulgadas de fibra de vidrio y cúpula de seda de 1 pulgada con 64 W en Clase D, con la guía de ondas avanzada de Behringer y ajustes de estante a 70 Hz y 12 kHz.',
  img: '',
  stores: { amazon: 'https://www.amazon.com/dp/B0C6WXKWK6?tag=topmusicg-20' },
  unit: 'pair',
  unit_es: 'par'
};
products.push(nuevo);
fs.writeFileSync(rp, JSON.stringify(products, null, 2), 'utf8');
console.log('=== 1. PRODUCTO CREADO ===');
console.log('  ' + id + ' | ' + nuevo.title + ' | $' + nuevo.price + ' | ' + nuevo.unit);
console.log('  desc EN=' + nuevo.desc.length + ' ES=' + nuevo.desc_es.length + ' (ambas <=145, caben en 3 lineas)');

// ============ 2. GUIA: FUERA EL MR3, DENTRO EL TRUTH ============
const rg = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(rg, 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');
const MR3 = 1044;

// featured
g.featuredProducts = g.featuredProducts.map(x => (x === MR3 ? id : x));

// secciones: sustituir la del MR3 por la del Truth
const idxMR3 = g.sections.findIndex(s => (s.products || []).includes(MR3));
if (idxMR3 >= 0) {
  g.sections[idxMR3] = {
    heading: 'Is the Behringer Truth 3.5 BT the Most Powerful Monitor Under $150?',
    heading_es: '¿Es el Behringer Truth 3.5 BT el monitor más potente por debajo de $150?',
    content: '<p><strong>This is the most power you can buy new on a pair under $150, and the difference is not subtle.</strong> Sixty-four watts of Class D, thirty-two per side, driving a 3.5-inch deformation-resistant glass-fibre woofer and a 1-inch silk dome. Every other compact pair in this guide runs on roughly half that, and it shows: the Behringer plays at mixing level without the thin, strained quality that small speakers develop when you push them.</p><p><strong>It also has the only real waveguide among the 3.5-inch options here.</strong> Advanced Waveguide Technology controls dispersion, so the stereo image holds together when you move your head instead of collapsing off-axis. Combined with the balanced quarter-inch TRS inputs on the rear panel, that makes it a monitor rather than a computer speaker.</p><p><strong>The rear trims are unusually well specified for the price:</strong> plus or minus 6 dB on a low shelf at 70 Hz and plus or minus 6 dB on a high shelf at 12 kHz, with the frequencies stated. Bluetooth 5.3 is on board too, so you can check a mix wirelessly without leaving your seat.</p><p><strong>The trade-off is bass extension: 70 Hz at plus or minus 3 dB,</strong> which is the same as the Mackie CR3.5 and fourteen hertz higher than the pair it replaces in this guide. If your material lives below 80 Hz, the 4.5-inch Mackie CR4.5 or the M-Audio BX4 is the smarter buy and you should spend the extra thirty dollars there.</p>',
    content_es: '<p><strong>Es la máxima potencia que puedes comprar nueva en un par por debajo de $150, y la diferencia se nota.</strong> Sesenta y cuatro vatios en Clase D, treinta y dos por lado, moviendo un woofer de 3,5 pulgadas de fibra de vidrio resistente a la deformación y una cúpula de seda de 1 pulgada. Todos los demás pares compactos de esta lista funcionan con más o menos la mitad, y se nota: el Behringer suena a volumen de mezcla sin esa cualidad fina y forzada que develops los altavoces pequeños cuando los fuerzas.</p><p><strong>Además tiene la única guía de ondas real entre las opciones de 3,5 pulgadas de aquí.</strong> La Advanced Waveguide Technology controla la dispersión, así que la imagen estéreo se mantiene cuando mueves la cabeza en lugar de desmoronarse fuera del eje. Junto con las entradas TRS balanceadas de 1/4 de pulgada del panel trasero, eso lo convierte en un monitor y no en un altavoz de ordenador.</p><p><strong>Los ajustes traseros están inusualmente bien especificados para el precio:</strong> de -6 a +6 dB en un estante de graves a 70 Hz y de -6 a +6 dB en un estante de agudos a 12 kHz, con las frecuencias indicadas. Además lleva Bluetooth 5.3, así que puedes comprobar una mezcla sin levantarte de la silla.</p><p><strong>La contrapartida es la extensión de graves: 70 Hz con más o menos 3 dB,</strong> lo mismo que el Mackie CR3.5 y catorce hercios más alto que el par al que sustituye en esta guía. Si tu material vive por debajo de 80 Hz, el Mackie CR4.5 de 4,5 pulgadas o el M-Audio BX4 son una compra más inteligente y conviene gastar ahí los treinta dólares de más.</p>',
    products: [id]
  };
}

// tabla
const idxCol = g.productTable.columns.findIndex(c => /Edifier MR3/.test(c.title));
if (idxCol >= 0) {
  g.productTable.columns[idxCol] = { title: 'Behringer Truth 3.5 BT', title_es: 'Behringer Truth 3.5 BT' };
  const set = (label, valores) => {
    const fila = g.productTable.rows.find(r => r.label === label);
    if (fila) fila.values[idxCol] = { value: valores[0], value_es: valores[1] };
  };
  set('Price (pair)', ['$147.00', '$147.00']);
  set('Woofer', ['3.5" glass fibre', '3,5" fibra de vidrio']);
  set('Bass extension (stated)', ['70 Hz - 20 kHz (±3 dB)', '70 Hz - 20 kHz (±3 dB)']);
  set('Balanced input', ['TRS', 'TRS']);
  set('Room correction', ['Waveguide + shelf trims', 'Guía de ondas + ajustes de estante']);
  set('Bluetooth', ['Yes, 5.3', 'Sí, 5.3']);
  set('Isolation included', ['No', 'No']);
  set('A true studio monitor?', ['Yes', 'Sí']);
}

// veredictos
const iv = g.verdictProsCons.findIndex(v => /Edifier MR3/.test(v.name));
if (iv >= 0) {
  g.verdictProsCons[iv] = {
    name: 'Behringer Truth 3.5 BT', name_es: 'Behringer Truth 3.5 BT',
    pros: ['Most power in the guide at 64W', 'Advanced Waveguide keeps the image off-axis', 'Balanced TRS inputs', 'Shelf trims at 70 Hz and 12 kHz, stated', 'Bluetooth 5.3'],
    pros_es: ['La mayor potencia de la guía, 64 W', 'La guía de ondas mantiene la imagen fuera del eje', 'Entradas TRS balanceadas', 'Ajustes de estante a 70 Hz y 12 kHz, indicados', 'Bluetooth 5.3'],
    cons: ['70 Hz is the weakest bass here', 'No XLR input', 'Bluetooth is the only wireless option, no app EQ'],
    cons_es: ['70 Hz es el grave más flojo de esta lista', 'Sin entrada XLR', 'Bluetooth es la única opción inalámbrica, sin EQ en app']
  };
}

// textos que citaban al MR3
const swaps = [
  ['Best features per dollar: Edifier MR3.', 'Most power: Behringer Truth 3.5 BT.'],
  ['Mejor relación funciones-precio: Edifier MR3.', 'Más potencia: Behringer Truth 3.5 BT.'],
  ['If you want Kevlar and Bluetooth, the Edifier MR3 gives you Bluetooth at half the price, with a smaller driver.',
   'If you want Bluetooth under $150, the Behringer Truth 3.5 BT is the one, though at $147 it is the most expensive pair here.'],
  ['Si quieres Kevlar y Bluetooth, el Edifier MR3 te da Bluetooth a mitad de precio, con un driver más pequeño.',
   'Si quieres Bluetooth por debajo de $150, el que buscas es el Behringer Truth 3.5 BT, aunque a $147 es el par más caro de esta lista.'],
  ['the M-Audio BX4 for isolation, and the Edifier MR3 at $99.99', 'the M-Audio BX4 for isolation'],
  ['el M-Audio BX4 para aislamiento', 'el M-Audio BX4 para aislamiento']
];
let n = 0;
const rec = o => {
  if (typeof o === 'string') { let t = o; for (const [a, b] of swaps) if (t.includes(a)) { t = t.split(a).join(b); n++; } return t; }
  if (Array.isArray(o)) return o.map(rec);
  if (o && typeof o === 'object') { const s = {}; for (const k of Object.keys(o)) s[k] = rec(o[k]); return s; }
  return o;
};
const c = rec(g);
Object.keys(c).forEach(k => { g[k] = c[k]; });

fs.writeFileSync(rg, JSON.stringify(guides, null, 2), 'utf8');

console.log('\n=== 2. GUIA ACTUALIZADA ===');
console.log('  secciones: ' + g.sections.length + ' | featured: ' + g.featuredProducts.length +
  ' | columnas: ' + g.productTable.columns.length + ' | verdicts: ' + g.verdictProsCons.length);
console.log('  filas de la tabla: ' + g.productTable.rows.map(r => r.values.length).join(','));
console.log('  textos corregidos: ' + n);
console.log('  productos destacados: ' + g.featuredProducts.join(', '));
const sobran = JSON.stringify(g).match(/Edifier MR3/g);
console.log('  menciones de "Edifier MR3": ' + (sobran ? sobran.length : 0));
