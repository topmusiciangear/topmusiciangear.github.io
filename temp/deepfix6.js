var fs = require('fs');
var guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var fixes = 0;
function eachES(g, fn) {
  ['intro_es', 'conclusion_es', 'verdict_es', 'description_es'].forEach(function (f) { if (typeof g[f] === 'string') { var n = fn(g[f]); if (n !== g[f]) { g[f] = n; fixes++; } } });
  Object.keys(g).forEach(function (k) { if (/^faq_(q|a)[1-5]_es$/i.test(k) && typeof g[k] === 'string') { var n = fn(g[k]); if (n !== g[k]) { g[k] = n; fixes++; } } });
  (g.sections || []).forEach(function (s) { ['heading_es', 'content_es'].forEach(function (f) { if (typeof s[f] === 'string') { var n = fn(s[f]); if (n !== s[f]) { s[f] = n; fixes++; } } }); });
  (g.verdictProsCons || []).forEach(function (v) {
    if (typeof v.name_es === 'string') { var n = fn(v.name_es); if (n !== v.name_es) { v.name_es = n; fixes++; } }
    ['pros_es', 'cons_es'].forEach(function (arr) { (v[arr] || []).forEach(function (p, i) { if (typeof p === 'string') { var nn = fn(p); if (nn !== p) { v[arr][i] = nn; fixes++; } } }); });
  });
}
function R(s, olds, news) { if (s.indexOf(olds) >= 0) s = s.split(olds).join(news); return s; }
guides.forEach(function (g) {
  eachES(g, function (s) {
    s = R(s, 'opción opción', 'opción');
    s = R(s, 'Opción opción', 'Opción');
    s = R(s, 'opción elección', 'elección');
    s = R(s, 'mejor opción compra', 'mejor compra');
    s = R(s, 'mejor opción relación calidad-precio', 'mejor opción en relación calidad-precio');
    s = R(s, 'mejor opción relación', 'mejor opción en relación');
    s = R(s, 'preamps', 'previos');
    s = R(s, 'Preamps', 'Previos');
    s = R(s, 'una preamp', 'un previo');
    s = R(s, 'una Preamp', 'un previo');
    s = R(s, 'preamp', 'previo');
    s = R(s, 'Preamp', 'Previo');
    s = R(s, 'Specs y veredicto', 'Ficha técnica y veredicto');
    s = R(s, 'Specs, precios', 'Ficha técnica, precios');
    s = R(s, 'grabar a través de', 'grabar con');
    s = R(s, 'grabando a través de ellas', 'procesando la señal con ellas');
    s = R(s, 'piensen a través de las teclas', 'piensan en teclas');
    s = R(s, 'piensan a través de los pads', 'trabajan con pads');
    s = R(s, 'corta través de toda una big band', 'atraviesa toda una big band');
    s = R(s, 'mientras empuja a través de la mezcla', 'mientras se abre paso en la mezcla');
    s = R(s, 'caballo de batalla', 'todoterreno');
    s = R(s, 'Caballo de batalla', 'Todoterreno');
    s = R(s, 'deba resolver tres problemas', 'deba apañarse con tres tareas distintas');
    s = R(s, 'resolver temas completos', 'sacar adelante temas completos');
    s = R(s, 'debe resolver canciones', 'debe dar salida a canciones');
    s = R(s, 'ni un configuración caro', 'ni una configuración cara');
    s = R(s, 'se conecta directo a tu ordenador', 'se conecta directamente a tu ordenador');
    s = R(s, 'te lo cubre', 'tienes todo lo que necesitas');
    s = R(s, 'para cubrir eventos de 24 a 32 canales', 'para sonorizar eventos que requieren de 24 a 32 canales');
    s = R(s, 'y LCD atrás', 'y pantalla LCD trasera');
    s = R(s, 'completan la ficha de caballo de batalla', 'completan un perfil todoterreno');
    s = R(s, 'Envíes un bajo directo a la PA', 'Ya envíes un bajo directo a la PA');
    s = R(s, 'porque en el papel ahora parecen gemelos', 'porque sobre el papel ahora parecen gemelos');
    s = R(s, 'el rey del presupuesto gestionado por IA', 'el rey de la gama económica, con cancelación de ruido por IA');
    s = R(s, 'el rey del presupuesto con cancelación', 'el rey de la gama económica, con cancelación');
    s = R(s, 'si nada que no sea 32-bit float que no pueda saturarse te servirá', 'y si solo te sirve un 32-bit float que no sature');
    s = R(s, 'nuestra guía de Mejores Herramientas IA', 'nuestra guía de mejores herramientas de IA para producción musical');
    s = R(s, 'nuestra guía de mejores micrófonos de solapa... la de mejores', 'nuestra guía de mejores micrófonos de solapa..., la de mejores');
    s = R(s, 'un micrófono conectar y usar', 'un micrófono de conectar y usar');
    s = R(s, 'El punto óptimo para calidad de estudio casero es', 'El punto óptimo para lograr calidad de estudio en casa está entre');
    s = R(s, 'funcionan mejor para fuentes ruidosas', 'funcionan mejor con fuentes ruidosas');
    s = R(s, 'envía datos de notas y control a tu ordenador', 'envía notas y datos de control a tu ordenador');
    s = R(s, 'no produce sonido', 'no produce sonido por sí mismo');
    s = R(s, 'El rango de frecuencias UHF opera', 'La banda UHF opera');
    s = R(s, 'en todo el rango de frecuencia', 'en toda la respuesta en frecuencia');
    s = R(s, 'ningún rango de frecuencia', 'ninguna gama de frecuencias');
    return s;
  });
});
// products desc_es
var prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
prods.forEach(function (p) {
  if (typeof p.desc_es === 'string') {
    var s = p.desc_es, o = s;
    s = R(s, 'caballo de batalla', 'todoterreno');
    s = R(s, 'Caballo de batalla', 'Todoterreno');
    s = R(s, 'preamps', 'previos');
    s = R(s, 'preamp', 'previo');
    s = R(s, 'standalone', 'autónomo');
    s = R(s, 'Session Players IA', 'Session Players con IA');
    s = R(s, 'con detección IA', 'con detección por IA');
    s = R(s, 'con análisis IA', 'con análisis por IA');
    s = R(s, 'amplio punto dulce', 'amplio punto óptimo');
    if (s !== o) { p.desc_es = s; fixes++; }
  }
});
fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2));
fs.writeFileSync('data/products.json', JSON.stringify(prods, null, 2));
console.log('part6 ES fixes=' + fixes);
