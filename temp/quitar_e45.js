const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

// ============ 1. QUITAR ERIS E4.5 (1045) DE LA GUIA ============
const rg = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(rg, 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');
const E45 = 1045;

const antes = { secciones: g.sections.length, featured: g.featuredProducts.length, cols: g.productTable.columns.length, verdicts: g.verdictProsCons.length };

// featured
g.featuredProducts = g.featuredProducts.filter(id => id !== E45);
// secciones
g.sections = g.sections.filter(s => !(s.products || []).includes(E45));
// tabla
const idxCol = g.productTable.columns.findIndex(c => /Eris E4\.5/.test(c.title));
if (idxCol >= 0) {
  g.productTable.columns.splice(idxCol, 1);
  g.productTable.rows.forEach(r => r.values.splice(idxCol, 1));
}
// veredictos
g.verdictProsCons = g.verdictProsCons.filter(v => !/Eris E4\.5/.test(v.name));

// textos que lo nombran como ganador
const swaps = [
  ['Best overall: PreSonus Eris E4.5. Best for small desks', 'Best overall: Mackie CR4.5. Best for small desks'],
  ['Mejor en general: PreSonus Eris E4.5. Mejor para escritorios pequeños', 'Mejor en general: Mackie CR4.5. Mejor para escritorios pequeños'],
  ['Best pick: Eris E4.5.', 'Best pick: CR4.5.'],
  ['Mejor compra: Eris E4.5.', 'Mejor compra: CR4.5.'],
  ['PreSonus, Mackie, M-Audio and Edifier compared', 'PreSonus, Mackie, M-Audio and Edifier compared'],
  // conclusion EN: el E4.5 era la primera recomendacion
  ['If you mix and want mixes that translate, buy the PreSonus Eris E4.5: it is the only pair under $150 with true balanced XLR alongside a 4.5-inch driver and a waveguide, and the waveguide will not stop reminding you about your untreated room.',
   'If you mix and want mixes that translate, buy the Mackie CR4.5: the deepest bass available new for a pair under $150, and its location switch fixes the one problem a $130 monitor cannot escape, which is being too close to a wall.'],
  ['Si mezclas y quieres mezclas que trasladen, compra el PreSonus Eris E4.5: es el único par por debajo de $150 con XLR balanceado de verdad junto a un driver de 4,5 pulgadas y una guía de ondas, y esa guía no dejará de recordarte tu sala sin tratar.',
   'Si mezclas y quieres mezclas que trasladen, compra el Mackie CR4.5: el grave más profundo que hay nuevo por un par por debajo de $150, y su conmutador de ubicación arregla el único problema que ningún monitor de 130 dólares puede esquivar, que es estar demasiado pegado a la pared.'],
  // el veredicto de la seccion del R1280T apuntaba al E4.5
  ['For that job the PreSonus Eris E4.5 at $139.99 is the right buy, and the extra twenty-two dollars buys you a waveguide, an XLR input and a driver with an inch more cone in it.',
   'For that job the Mackie CR4.5 at $129.99 is the right buy, and the extra twelve dollars buys you a waveguide, a location switch and a driver with an inch more cone in it.'],
  ['Para ese trabajo, lo que tienes que comprar es el PreSonus Eris E4.5 a $139.99, y los veintidós dólares extra te compran una guía de ondas, una entrada XLR y un driver con una pulgada más de cono.',
   'Para ese trabajo, lo que tienes que comprar es el Mackie CR4.5 a $129.99, y los doce dólares extra te compran una guía de ondas, un conmutador de ubicación y un driver con una pulgada más de cono.'],
  // referencias sueltas en otras secciones
  ['If your material has real low end, the extra thirty dollars for the Eris E4.5 buys you a 4.5-inch driver instead of a 3.5-inch one',
   'If what you are mixing has real low end, the extra thirty dollars buys you a 4.5-inch driver instead of a 3.5-inch one'],
  ['Si vas a mezclar algo con una parte de bajo, los treinta dólares extra por el Eris E4.5 te compran un driver de 4,5 pulgadas en lugar de uno de 3,5',
   'Si vas a mezclar algo con una parte de bajo, los treinta dólares extra te compran un driver de 4,5 pulgadas en lugar de uno de 3,5'],
  ['spend the extra thirty dollars on the PreSonus Eris E4.5 or the Mackie CR4.5',
   'spend the extra thirty dollars on the Mackie CR4.5 or the M-Audio BX4'],
  ['gasta treinta dólares más en el PreSonus Eris E4.5 o el Mackie CR4.5',
   'gasta treinta dólares más en el Mackie CR4.5 o el M-Audio BX4']
];

let aplicados = 0;
const rec = (o) => {
  if (typeof o === 'string') {
    let t = o;
    for (const [a, b] of swaps) if (t.includes(a)) { t = t.split(a).join(b); aplicados++; }
    return t;
  }
  if (Array.isArray(o)) return o.map(rec);
  if (o && typeof o === 'object') { const s = {}; for (const k of Object.keys(o)) s[k] = rec(o[k]); return s; }
  return o;
};
const limpio = rec(g);
Object.keys(limpio).forEach(k => { g[k] = limpio[k]; });

fs.writeFileSync(rg, JSON.stringify(guides, null, 2), 'utf8');
console.log('=== 1. ERIS E4.5 FUERA DE LA GUIA ===');
console.log('  secciones: ' + antes.secciones + ' -> ' + g.sections.length);
console.log('  featured:  ' + antes.featured + ' -> ' + g.featuredProducts.length);
console.log('  columnas:  ' + antes.cols + ' -> ' + g.productTable.columns.length);
console.log('  filas x col: ' + g.productTable.rows.map(r => r.values.length).join(','));
console.log('  verdicts:  ' + antes.verdicts + ' -> ' + g.verdictProsCons.length);
console.log('  textos actualizados: ' + aplicados);
const restos = JSON.stringify(g).match(/Eris E4\.5/g);
console.log('  menciones de "Eris E4.5" que quedan: ' + (restos ? restos.length : 0));
