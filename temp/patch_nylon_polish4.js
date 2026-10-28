// Polish #4: ES naturalness, decimal separators, currency phrasing, longer conclusion
const fs = require('fs');
const FILE = 'data/guides.json';
let raw = fs.readFileSync(FILE, 'utf8');

function sub(oldText, newText, label, expected) {
  const c = raw.split(oldText).length - 1;
  if (c !== expected) throw new Error(`[${label}] expected ${expected}, got ${c}`);
  raw = raw.split(oldText).join(newText);
  console.log(`  ${label}: ${c}`);
}

// A) EN meta description tail was vague
sub('Yamaha C40II, Cordoba C5 and more.', 'Yamaha C40II, Cordoba C5 and budget alternatives.', 'desc EN', 1);

// B) FAQ 2 EN fragment
sub('Not for learning. Cutaway and electronics add cost and complexity.',
  "Not while you're still learning. Cutaway and electronics add cost and complexity.", 'faq2 EN', 1);

// C) ES section 3 opening: literal "removes the friction"
sub('la clásica de iniciación que se quita las fricciones de en medio',
  'la clásica de iniciación que resuelve las incomodidades de siempre', 'sec3 ES', 1);

// D/E) "se siente rápido" is a calque of "feels fast"
sub('El acabado satinado se siente rápido', 'El acabado satinado deja deslizar la mano', 'sec2 ES finish', 1);
sub('El acabado mate se siente rápido', 'El acabado mate deja deslizar la mano', 'sec5 ES finish', 1);

// F) ES section 0: "consistente" + vague closing
sub('La construcción es consistente y sabes lo que compras en cualquier tienda.',
  'El control de calidad es constante, así que sabes lo que te llevas en cualquier tienda.', 'sec0 ES build', 1);

// G) ES section 7: "señal limpia directa a la PA"
sub('la pastilla entrega señal limpia directa a la PA.',
  'la pastilla entrega una señal limpia que va directa al equipo de PA.', 'sec7 ES pickup', 1);

// H) ES section 8: "edades 7-11"
sub('hacen cómodo el alcance para edades 7-11',
  'hacen cómodo el alcance para niños de 7 a 11 años', 'sec8 ES ages', 1);

// I/J) section 9: price range away from the borderline £150
sub("and at under £150 it's the most reliable entry point",
  "and at well under £200 it's the most reliable entry point", 'sec9 EN price', 1);
sub('y por menos de 150 £ es el punto de entrada más fiable',
  'y por menos de 200 £ es el punto de entrada más fiable', 'sec9 ES price', 1);

// K) ES decimal separator (RAE uses comma)
sub('cejuela de 50.8 mm', 'cejuela de 50,8 mm', 'verdict4 ES decimal', 2);

// L) ES cons: inches are not natural in Spanish
sub('Cejuela más estrecha de 1 7/8\\" no es la clásica de 52 mm',
  'Cejuela de 47,6 mm, más estrecha que la clásica de 52 mm', 'verdict3 ES cons', 2);

// M) "cabida dinámica" is wrong
sub('Cabida dinámica limitada', 'Margen dinámico limitado', 'verdict8 ES cons', 2);

// N/O) "resultar voluminosa" reads oddly for a nut width
sub('Cejuela ancha puede resultar voluminosa para manos pequeñas',
  'Cejuela ancha que se hace grande en manos pequeñas', 'verdict0 ES cons', 2);
sub('Cejuela ancha puede resultar voluminosa',
  'Cejuela ancha poco cómoda en manos pequeñas', 'verdict9 ES cons', 2);

// P) conclusion: add the stage and kids options
sub('gives you that traditional cedar warmth without a steep price.</p>',
  'gives you that traditional cedar warmth without a steep price.</p>' +
  '<p>If you have to plug in on a small stage, the <span class=\\"product-name\\">Ibanez GA35TCE</span> amplifies nylon without feedback. And for kids, the <span class=\\"product-name\\">Cordoba Protege C1 3/4</span> is the size that actually fits.</p>',
  'conclusion EN', 1);
sub('te da esa calidez de cedro tradicional sin precio elevado.</p>',
  'te da esa calidez de cedro tradicional sin precio elevado.</p>' +
  '<p>Si tienes que enchufarla en un escenario pequeño, la <span class=\\"product-name\\">Ibanez GA35TCE</span> amplifica el nylon sin acoples. Y para niños, la <span class=\\"product-name\\">Cordoba Protege C1 3/4</span> es el tamaño que de verdad les encaja.</p>',
  'conclusion ES', 1);

fs.writeFileSync(FILE, raw, 'utf8');

const arr = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const g = arr.find(x => x.id === 'best-nylon-guitars-for-beginners');
console.log('\nJSON valid. sections:', g.sections.length, 'faq:', g.faq.length, 'verdicts:', g.verdictProsCons.length);
console.log('desc EN:', g.description);
console.log('conclusion EN ends:', g.conclusion.slice(-120));
