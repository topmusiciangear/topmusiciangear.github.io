const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-plugins');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Plugins gratuito que rivalizan con premium', 'Plugins gratuitos que rivalizan con premium');
swap('maneja compresión de bus transparente igual que compresores premium para bus transparente;',
  'maneja compresión de bus transparente igual que compresores premium;');
swap('El inconveniente de los plugins gratuito es soporte y actualizaciones', 'El inconveniente de los plugins gratuitos es el soporte y las actualizaciones');
swap('>Mejores Plugins de Mezcla y Masterización</a>', '>Mejores plugins de mezcla y masterización</a>');
swap('>Mejores Plugins Vocales</a>', '>Mejores plugins vocales: cadena de procesamiento completa</a>');
swap('>Mejores Efectos Creativos</a>', '>Mejores plugins de efectos creativos para producción</a>');
swap('>Soundtoys vs Khs</a>', '>FabFilter vs Komplete: ¿bisturíes o ecosistema?</a>');
swap('href=\\"/guides/pro-plugins.html\\">Soundtoys vs Khs bundle', 'href=\\"/guides/pro-plugins_es.html\\">FabFilter vs Komplete: ¿bisturíes o ecosistema?');
swap('los plugins digital-first son mejores.', 'los plugins nativos digitales son mejores.');
swap('La reserva debe ver con la dependencia:', 'La reserva tiene que ver con la dependencia:');
swap('Partir de una sesión vacía cuesta imaginación cuando la paleta sigue estrecha',
  'Partir de una sesión vacía exige imaginación cuando la paleta sigue estrecha');
swap('El plug-in premia a técnicos de masterización', 'El plugin premia a técnicos de masterización');
swap('ajustar umbral, ratio y tiempos de oído exige escucha disciplinada', 'ajustar umbral, ratio y tiempos a oído exige escucha disciplinada');
swap('El peaje es el ecosistema.', 'El precio es el ecosistema.');
swap('FabFilter Pro-Q es la mejor opción inversión de plugin para mezcla', 'FabFilter Pro-Q es la mejor inversión en plugins para mezcla');
swap('Los plugins modelados de hardware agregan carácter pero no son necesarios', 'Los plugins modelados de hardware añaden carácter pero no son necesarios');
swap('>guía de plugins profesionales</a>', '>FabFilter vs Komplete: ¿bisturíes o ecosistema?</a>');
swap('>mejores plugins de mezcla</a>', '>Mejores plugins de mezcla y masterización</a>');
swap('>mejores plugins para vocales</a>', '>Mejores plugins vocales: cadena de procesamiento completa</a>');
swap('>FabFilter vs Ozone</a>', '>FabFilter vs Ozone: ¿mejor suite de mezcla y masterización?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
