const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const rg = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(rg, 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');
const s = g.sections.find(x => /Behringer/.test(x.heading));

s.heading = 'Is the Behringer Truth 3.5 BT the Most Powerful Monitor Under $150?';
s.heading_es = '¿Es el Behringer Truth 3.5 BT el monitor más potente por debajo de $150?';

// primer parrafo: se parte por el cierre </p> del primero
const cortar = (txt) => {
  const fin = txt.indexOf('</p>');
  return { primero: txt.slice(0, fin + 4), resto: txt.slice(fin + 4) };
};
const a = cortar(s.content);
const b = cortar(s.content_es);

a.primero = '<p><strong>At sixty-four watts this has the highest continuous power rating in the guide, and the difference is not subtle.</strong> That is thirty-two watts per side in Class D driving a 3.5-inch deformation-resistant glass-fibre woofer and a 1-inch silk dome. Every other compact pair here runs on 50W RMS or less, and it shows: the Behringer plays at mixing level without the thin, strained quality small speakers develop when you push them.</p><p><strong>One caveat, because these numbers get quoted out of context: the M-Audio BX4 is rated at 120W peak.</strong> Peak and RMS are not comparable figures, which is why we rank on continuous power. If you find a comparison claiming this is the loudest pair here, check which number it is using.</p>';

b.primero = '<p><strong>Con sesenta y cuatro vatios tiene la mayor potencia continua de la guía, y la diferencia se nota.</strong> Son treinta y dos vatios por lado en Clase D moviendo un woofer de 3,5 pulgadas de fibra de vidrio resistente a la deformación y una cúpula de seda de 1 pulgada. Todos los demás pares compactos de aquí van con 50 W RMS o menos, y se nota: el Behringer suena a volumen de mezcla sin esa cualidad fina y forzada que desarrollan los altavoces pequeños cuando los fuerzas.</p><p><strong>Un matiz, porque estas cifras se sacan de contexto: el M-Audio BX4 declara 120 W de potencia pico.</strong> Pico y RMS no son cifras comparables, y por eso aquí ordenamos por potencia continua. Si encuentras una comparativa que diga que este es el par más alto de la lista, mira qué número está usando.</p>';

s.content = a.primero + a.resto;
s.content_es = b.primero + b.resto;

// el resto de la seccion tenia la errata develops/develops
s.content_es = s.content_es.replace(/que\s+develops\s+los altavoces/gi, 'que desarrollan los altavoces');
s.content = s.content.replace(/que\s+develops\s+the small speakers/gi, 'that small speakers develop');

fs.writeFileSync(rg, JSON.stringify(guides, null, 2), 'utf8');

console.log('seccion del Behringer reescrita');
const sinTags = t => t.replace(/<[^>]+>/g, '');
console.log('\nEN: ' + sinTags(s.content).slice(0, 260));
console.log('\nES: ' + sinTags(s.content_es).slice(0, 260));

const todo = JSON.stringify(g);
const comprobaciones = [
  ['la máxima potencia que puedes comprar', false],
  ['most power you can buy', false],
  ['que develops los altavoces', false],
  ['desarrollan los altavoces pequeños', true],
  ['120 W de potencia pico', true],
  ['120W peak', true],
  ['64 vatios tiene la mayor potencia continua', true]
];
console.log('\n=== COMPROBACIONES ===');
let fallos = 0;
comprobaciones.forEach(([k, debe]) => {
  const hay = todo.includes(k);
  const ok = hay === debe;
  if (!ok) fallos++;
  console.log((ok ? '  ok       ' : '  FALLA    ') + (debe ? 'debe existir:  ' : 'no debe existir: ') + k);
});
console.log(fallos ? '\n' + fallos + ' problemas' : '\ntodo correcto');
