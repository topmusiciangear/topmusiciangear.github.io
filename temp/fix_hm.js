const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-headphones-for-mixing');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Los abiertos ( DT 990 Pro HD 490 Pro Plus ) ofrecen', 'Los abiertos (DT 990 Pro, HD 490 Pro Plus) ofrecen');
swap('Han sido la referencia en estudios profesionales durante décadas —usados en estudios profesionales en todo el mundo.',
  'Han sido la referencia en estudios profesionales durante décadas, usados en estudios de todo el mundo.');
swap('Comodidad: La comodidad está entre las mejores de su clase, apta para sesiones largas',
  'En comodidad está entre los mejores de su clase, apto para sesiones largas');
swap('Mientras que los auriculares abiertos son ideales para mezclar, filtran sonido y dejan entrar ruido.',
  'Mientras que los auriculares abiertos son ideales para mezclar, dejan escapar sonido y dejan entrar ruido.');
swap('en comparación con los DT 990. pero la extensión de graves es excelente, lo que los hace ideales',
  'en comparación con los DT 990. Pero la extensión de graves es excelente, lo que los hace ideales');
swap('Si hablas sobre mezcla y masterización, los HD 490 Pro Plus son el control de calidad definitivo.',
  'Si trabajas en mezcla y masterización, los HD 490 Pro Plus son el control de calidad definitivo.');
swap('Como todos los abiertos, filtran sonido y no son ideales', 'Como todos los abiertos, dejan escapar sonido y no son ideales');
swap('De ahí su fondo para sesiones largas y grabación fiable:', 'De ahí su valía para sesiones largas y grabación fiable:');
swap('y una salida floja de laptop los deja bajos y apagados.', 'y una salida floja de portátil los deja bajos y apagados.');
swap('te permiten ajustarlo a cualquier frontal que tengas.', 'te permiten ajustarlo a cualquier equipo que tengas.');
swap('El graves es generoso —dobles- hasta, y eso favorece la mezcla hasta que deja de hacerlo.',
  'El grave es generoso, y eso favorece la mezcla hasta que deja de hacerlo.');
swap('Beyerdynamic DT 990 Pro: cuando el graves del 770 se convierte en una ventaja',
  'Beyerdynamic DT 990 Pro: cuando el grave del 770 se convierte en una ventaja');
swap('y el graves radia lo suficiente para oírse fuera.', 'y el grave radia lo suficiente para oírse fuera.');
swap('a algunos les resulta fatiguing.', 'a algunos les resulta fatigante.');
swap('Es el micrófono de estudio más vendido del mundo por una razón', 'Es el auricular de estudio más vendido del mundo por una razón');
swap('qué hará unaltavoz con tu grave, y una decisión', 'qué hará un altavoz con tu grave, y una decisión');
swap('>DT 990 Pro HD 490 Pro Plus</a>', '>HD 490 Pro vs DT 990 Pro: ¿abiertos para mezclar?</a>');
swap('>guía de los mejores auriculares de estudio</a>', '>Mejores auriculares de estudio: guía completa</a>');
swap('>comparativa DT 770 Pro vs DT 990 Pro</a>', '>DT 770 Pro vs DT 990 Pro: ¿cerrados o abiertos para mezclar?</a>');
swap('>guía de los mejores auriculares abiertos</a>', '>Mejores auriculares abiertos: guía completa</a>');
swap('>comparativa M50x vs DT 770</a>', '>ATH-M50x vs DT 770 Pro: diferencias técnicas</a>');
swap('>comparativa M50x vs MDR-7506</a>', '>ATH-M50x vs MDR-7506: ¿mejores auriculares cerrados?</a>');
swap('>M50x vs DT 770</a>', '>ATH-M50x vs DT 770 Pro: diferencias técnicas</a>');
swap('>comparativa HD 490 Pro vs DT 990</a>', '>HD 490 Pro vs DT 990 Pro: ¿abiertos para mezclar?</a>');
swap('>DT 770 Pro vs DT 990 Pro</a>', '>DT 770 Pro vs DT 990 Pro: ¿cerrados o abiertos para mezclar?</a>');
swap('>ATH-M50x vs MDR-7506</a>', '>ATH-M50x vs MDR-7506: ¿mejores auriculares cerrados?</a>');
swap('>HD 490 Pro vs DT 990 Pro</a>', '>HD 490 Pro vs DT 990 Pro: ¿abiertos para mezclar?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
