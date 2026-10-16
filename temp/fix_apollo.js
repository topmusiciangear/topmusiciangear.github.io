const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
// sweep global: funciónan/funcióne (nunca correctos; función como nombre y funcionó en pasado se respetan)
let t0 = JSON.stringify(g);
const nAn = (t0.match(/funciónan/g) || []).length;
const nE = (t0.match(/funcióne([^n]|$)/g) || []).length;
(function rec(o) {
  if (typeof o === 'string') return o.split('funciónan').join('funcionan').split('funcióne').join('funcione');
  if (Array.isArray(o)) return o.map(rec);
  if (o && typeof o === 'object') { Object.keys(o).forEach(k => { o[k] = rec(o[k]); }); }
  return o;
})(g);
console.log('funciónan -> funcionan: ' + nAn + ' | funcióne -> funcione: ' + nE);
// ¡cuidado!: "funcione" ya existia bien en otros sitios; solo contamos reemplazos
const gg = g.find(x => x.id === 'apollo-vs-babyface');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('representan los dos pesos pesados en el mercado de interfaces de audio premium de escritorio',
  'representan los dos pesos pesados del mercado de interfaces de audio premium de escritorio');
swap('¿Es el Apollo Twin x gen 2 el mejor', '¿Es el Apollo Twin X Gen 2 el mejor');
swap('El Apollo Twin X Gen 2 está construido alrededor de la tecnología Unison de UA, que reconfigura físicamente la impedancia',
  'El Apollo Twin X Gen 2 tiene en el centro la tecnología Unison de UA, que reconfigura de verdad la impedancia');
swap('La diferencia no es trivial — Unison cambia cómo reacciona el previo al micrófono, dándote cambios tonales genuinos en lugar de simples curvas de EQ',
  'La diferencia no es sutil: Unison cambia cómo reacciona el previo al micrófono, con cambios tonales genuinos en lugar de simples curvas de EQ');
swap('El DSP integrado te permite ejecutar plugins UAD con latencia casi nula, lo que significa que puedes grabar',
  'El DSP integrado te permite usar plugins UAD con latencia casi nula, con el que puedes grabar');
swap('La Babyface Pro FS de RME no va de emulación — va de perfección en ingeniería', 'La Babyface Pro FS de RME no va de emulación: va de perfección en ingeniería');
swap('ofreciendo mediciones que compiten con convertidores independientes', 'con mediciones que compiten con convertidores independientes');
swap('La matriz de enrutamiento TotalMix FX es el entorno de mezcla más potente jamás empaquetado en una interfaz de tamaño medio rack, dándote control total sobre enrutamiento',
  'La matriz de enrutamiento TotalMix FX es el entorno de mezcla más potente jamás metido en una interfaz de tamaño medio rack, con control total sobre el enrutamiento');
swap('Donde el Apollo depende del DSP, RME depende de una arquitectura', 'Mientras el Apollo depende del DSP, RME depende de una arquitectura');
swap('La división fundamental aquí es cómo cada empresa resuelve la monitorización', 'La diferencia fundamental aquí es cómo resuelve cada empresa la monitorización');
swap('UA pone un poderoso chip DSP en la caja y te permite ejecutar sus plugins UAD propietarios directamente en él',
  'UA mete un poderoso chip DSP en la caja y te permite usar sus plugins UAD propietarios directamente en él');
swap('RME pone su ingeniería en la capa de controladores y enrutamiento, dándote una ruta de señal prístina',
  'RME concentra su ingeniería en la capa de controladores y enrutamiento, con una ruta de señal prístina');
swap('el Apollo Twin X Gen 2 cambia la vida', 'el Apollo Twin X Gen 2 te cambia la forma de trabajar');
swap('¿Cuál deberías comprar: Apollo Twin x gen 2 o Babyface Pro FS?', '¿Cuál deberías comprar: Apollo Twin X Gen 2 o Babyface Pro FS?');
swap('o si quieres esos previos Unison que cambian genuinamente cómo suenan los micrófonos',
  'o si quieres esos previos Unison que cambian de verdad cómo suenan los micrófonos');
swap('Si tus sesiones ocurren en la carretera o en muchas salas, la portabilidad y el ruteo de cualquiera de las dos unidades te servirán bien durante años',
  'Si tus sesiones tienen lugar en la carretera o en muchas salas, la portabilidad y el encaminamiento de cualquiera de las dos unidades te darán buen servicio durante años');
swap('pero tu proceso dictará cuál se siente correcta', 'pero tu forma de trabajar dictará cuál te resulta más cómoda');
swap('>Mejor Interfaz de Audio para Grabación Casera</a>', '>Mejor interfaz de audio: guía completa para grabación casera</a>');
swap('>Apollo x16 vs Fireface UFX III</a>', '>Apollo X16 vs RME Fireface UFX III: DSP vs ruteo</a>');
swap('>RME Babyface vs MOTU M2</a>', '>Interfaz de gama de entrada vs premium: ¿vale la pena?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('apollo aplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
const t = JSON.stringify(JSON.parse(fs.readFileSync(F, 'utf8')));
console.log('restos funciónan/funcióne: ' + (t.match(/funciónan|funcióne(?!n)/g) || []).length);
console.log('"funcionen" bien (subjuntivo, debe seguir): ' + (t.match(/funcionen/g) || []).length);
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
