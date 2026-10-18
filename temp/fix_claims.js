const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const rg = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(rg, 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');

const swaps = [
  // --- 1. "most power" es incorrecto: el BX4 declara 120 W PICO ---
  ['Most power: Behringer Truth 3.5 BT.', 'Most continuous power: Behringer Truth 3.5 BT.'],
  ['Más potencia: Behringer Truth 3.5 BT.', 'Más potencia continua: Behringer Truth 3.5 BT.'],
  ['<p><strong>This is the most power you can buy new on a pair under $150, and the difference is not subtle.</strong> Sixty-four watts of Class D, thirty-two per side, driving a 3.5-inch deformation-resistant glass-fibre woofer and a 1-inch silk dome. Every other compact pair in this guide runs on roughly half that, and it shows: the Behringer plays at mixing level without the thin, strained quality that small speakers develop when you push them.</p>',
   '<p><strong>At sixty-four watts this has the highest continuous power rating in the guide, and the difference is not subtle.</strong> That is thirty-two watts per side in Class D driving a 3.5-inch deformation-resistant glass-fibre woofer and a 1-inch silk dome. Every other compact pair here runs on 50W RMS or less, and it shows: the Behringer plays at mixing level without the thin, strained quality small speakers develop when you push them.</p><p><strong>One caveat, because the numbers get quoted out of context: the M-Audio BX4 is rated at 120W peak.</strong> Peak and RMS are not comparable figures, which is why we rank on continuous power here. If you see a comparison claiming this is the loudest pair here, check which number it is using.</p>'],
  ['<p><strong>Es la máxima potencia que puedes comprar nueva en un par por debajo de $150, y la diferencia se nota.</strong> Sesenta y cuatro vatios en Clase D, treinta y dos por lado, moviendo un woofer de 3,5 pulgadas de fibra de vidrio resistente a la deformación y una cúpula de seda de 1 pulgada. Todos los demás pares compactos de esta lista funcionan con más o menos la mitad, y se nota: el Behringer suena a volumen de mezcla sin esa cualidad fina y forzada que desarrolla los altavoces pequeños cuando los fuerzas.</p>',
   '<p><strong>Con sesenta y cuatro vatios tiene la mayor potencia continua de la guía, y la diferencia se nota.</strong> Son treinta y dos vatios por lado en Clase D moviendo un woofer de 3,5 pulgadas de fibra de vidrio resistente a la deformación y una cúpula de seda de 1 pulgada. Todos los demás pares compactos de aquí van con 50 W RMS o menos, y se nota: el Behringer suena a volumen de mezcla sin esa cualidad fina y forzada que desarrollan los altavoces pequeños cuando los fuerzas.</p><p><strong>Un matiz, porque estas cifras se sacan de contexto: el M-Audio BX4 está declara 120 W de potencia pico.</strong> Pico y RMS no son cifras comparables, y por eso aquí ordenamos por potencia continua. Si ves una comparativa que dice que este es el par más alto de la lista, mira qué número está usando.</p>'],
  ['+ Most power in the guide at 64W', '+ Highest continuous power here at 64W RMS'],

  // --- 2. la conclusion repetia el CR4.5 dos veces y no tenia al Behringer ---
  ['If you mix and want mixes that translate, buy the Mackie CR4.5: the deepest bass available new for a pair under $150, and its location switch fixes the one problem a $130 monitor cannot escape, which is being too close to a wall. If your desk is small and your budget is firm at a hundred dollars, the Mackie CR3.5 wins on the isolation pads in the box and the front-panel tone knob. If your room has bass in it, the Mackie CR4.5 reaches 55 Hz for ten dollars less than the M-Audio BX4 and is the deepest new pair at this price. And if what you actually want is a serious upgrade from computer speakers rather than a mixing tool, buy the Edifier R1280T, accept that it is not a monitor, and stop expecting it to translate.',
   'If you mix and want mixes that translate, buy the Mackie CR4.5. It reaches 55 Hz, the lowest bass figure of any real monitor in this guide, and its location switch fixes the one problem a $130 monitor cannot escape, which is sitting too close to a wall. It also costs ten dollars less than the M-Audio BX4, which reaches 69 Hz. If you play loud, take the Behringer Truth 3.5 BT instead: 64 watts of continuous power is the most in the guide, and the Advanced Waveguide keeps the stereo image intact when you move your head. If your desk is small and the budget stops at a hundred dollars, the Mackie CR3.5 takes it, the only pair here that ships with isolation pads, and it also adds a front tone knob. If bass is the whole game and you want the deepest of all, note that the Edifier R1280T reaches 52 Hz, lower than any monitor here, but it does it as a bookshelf speaker with no balanced input and no waveguide. And if what you really want is a serious upgrade from computer speakers rather than a mixing tool, buy the R1280T, accept what it is, and stop expecting it to translate.'],
  ['Si mezclas y quieres mezclas que trasladen, compra el Mackie CR4.5: el grave más profundo que hay nuevo por un par por debajo de $150, y su conmutador de ubicación arregla el único problema que ningún monitor de 130 dólares puede esquivar, que es estar demasiado pegado a la pared. Si tu escritorio es pequeño y tu presupuesto se queda clavado en cien dólares, el Mackie CR3.5 gana por los pads de aislamiento de la caja y el knob frontal de tono. Si tu sala tiene graves, el Mackie CR4.5 llega a 55 Hz por diez dólares menos que el M-Audio BX4 y es el par nuevo más profundo a este precio. Y si lo que quieres de verdad es una mejora seria sobre los altavoces del ordenador en lugar de una herramienta de mezcla, compra el Edifier R1280T, acepta que no es un monitor y deja de esperar que traslade.',
   'Si mezclas y quieres mezclas que trasladen, compra el Mackie CR4.5. Llega a 55 Hz, la cifra de graves más baja de cualquier monitor real de esta guía, y su conmutador de ubicación arregla el único problema que ningún monitor de 130 dólares puede esquivar, que es estar pegado a la pared. Además cuesta diez dólares menos que el M-Audio BX4, que llega a 69 Hz. Si tocas fuerte, el Behringer Truth 3.5 BT: 64 vatios de potencia continua, la mayor de la guía, y su guía de ondas avanzada mantiene la imagen estéreo intacta al mover la cabeza. Si la mesa es pequeña y el presupuesto se para en cien dólares, el Mackie CR3.5 se lo lleva, el único par de aquí con pads de aislamiento de serie, y además suma un knob de tono frontal. Si el grave lo es todo y quieres el más profundo de todos, ten en cuenta que el Edifier R1280T llega a 52 Hz, por debajo de cualquier monitor de esta lista, pero lo hace como altavoz de estantería, sin entrada balanceada y sin guía de ondas. Y si lo que quieres de verdad es una mejora seria sobre los altavoces del ordenador en lugar de una herramienta de mezcla, compra el R1280T, acepta lo que es y deja de esperar que traslade.'],

  // --- 3. "deepest new pair" era incorrecto: el R1280T llega a 52 Hz ---
  ['+ Deepest new bass available at this budget, 55 Hz', '+ Lowest bass figure of any real monitor here, 55 Hz'],
  ['+ El grave más profundo nuevo en este presupuesto, 55 Hz', '+ La cifra de graves más baja de los monitores reales de aquí, 55 Hz'],
  ['a 4.5-inch driver and a waveguide, and its location switch', 'a 4.5-inch driver and a waveguide, and its location switch']
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
fs.writeFileSync(rg, JSON.stringify(guides, null, 2), 'utf8');

console.log('correcciones aplicadas: ' + n + ' (de ' + swaps.length + ' patrones)');
const sinTags = s => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ');
console.log('\n### CONCLUSION EN\n' + sinTags(g.conclusion));
console.log('\n### CONCLUSION ES\n' + sinTags(g.conclusion_es));
console.log('\n### VERDICT EN\n' + g.verdict);
console.log('### VERDICT ES\n' + g.verdict_es);
console.log('\nlas 6 marcas en la conclusion EN: ' + ['Mackie CR4.5', 'Behringer Truth 3.5 BT', 'Mackie CR3.5', 'Edifier R1280T', 'M-Audio BX4'].filter(x => g.conclusion.includes(x)).join(', '));
