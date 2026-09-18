var fs = require('fs');
var P = 'C:/Users/Daniel/projects/topmusiciangear/';

var WORDS = ['grabacion','tambien','conexion','opcion','informacion','solucion','version','condicion','razon','funcion','aplicacion','configuracion','seleccion','descripcion','microfono','cancelacion','probablemente'];
var MISSING_ACCENT = { grabacion:'grabación', tambien:'también', conexion:'conexión', opcion:'opción', informacion:'información', solucion:'solución', version:'versión', condicion:'condición', razon:'razón', funcion:'función', aplicacion:'aplicación', configuracion:'configuración', seleccion:'selección', descripcion:'descripción', microfono:'micrófono', cancelacion:'cancelación' };

function checkString(s) {
  if (typeof s !== 'string' || !s) return [];
  var out = [];
  WORDS.forEach(function (w) {
    if (!MISSING_ACCENT[w]) return;
    var re = new RegExp('\\b' + w + '\\b', 'gi'), m;
    while ((m = re.exec(s))) {
      out.push(ctxt(s, m.index, m[0].length, w + ' -> ' + MISSING_ACCENT[w]));
    }
  });
  var reV = /\bvia\b/gi, mv;
  while ((mv = reV.exec(s))) out.push(ctxt(s, mv.index, 3, 'via -> vía'));
  var reD = /\ba un (DAW|Mac|iPad|iPhone)\b/gi, md;
  while ((md = reD.exec(s))) out.push(ctxt(s, md.index, md[0].length, md[0] + ' (prep. "a" rara)'));
  var reB = /\bes el mejor para\b/gi, mb;
  while ((mb = reB.exec(s))) out.push(ctxt(s, mb.index, mb[0].length, 'es el mejor para -> es ideal para'));
  return out;
}
function ctxt(s, idx, len, label) {
  var before = s.slice(Math.max(0, idx - 70), idx).replace(/\s+/g, ' ');
  var after = s.slice(idx + len, idx + len + 70).replace(/\s+/g, ' ');
  return { label: label, before: before, match: s.substr(idx, len), after: after };
}

function hasESkey(k) { return /_es$/.test(k) || /(^|_)ES$/.test(k) || /conclusionES|verdictES$/.test(k); }

var out = [];

var b = fs.readFileSync(P + 'build-guides.js', 'utf8');
checkString(b).forEach(function (h) { out.push('[build-guides.js] ...' + h.before + '«' + h.match + '»' + h.after + '...  (' + h.label + ')'); });

var g = JSON.parse(fs.readFileSync(P + 'data/guides.json', 'utf8'));
var stack = g.map(function (x) { return { v: x, base: x.slug || ('id' + x.id) }; });
while (stack.length) {
  var cur = stack.pop(); var v = cur.v, base = cur.base;
  if (typeof v === 'string') {
    if (!/es$/i.test(base) && !/_ES\./.test(base)) continue;
    checkString(v).forEach(function (h) { out.push('[guides.json] ' + base + ' :: ...' + h.before + '«' + h.match + '»' + h.after + '...  (' + h.label + ')'); });
  } else if (Array.isArray(v)) {
    v.forEach(function (x, i) { stack.push({ v: x, base: base + '[' + i + ']' }); });
  } else if (v && typeof v === 'object') {
    Object.keys(v).forEach(function (k) { stack.push({ v: v[k], base: base + '.' + k }); });
  }
}

var p = JSON.parse(fs.readFileSync(P + 'data/products.json', 'utf8'));
var items = Array.isArray(p) ? p : p.products;
items.forEach(function (it) {
  ['desc_es', 'title_es'].forEach(function (k) {
    if (it[k]) checkString(it[k]).forEach(function (h) { out.push('[products.json] #' + it.id + ' ' + k + ' :: ...' + h.before + '«' + h.match + '»' + h.after + '...  (' + h.label + ')'); });
  });
});

var seen = {};
out = out.filter(function (l) { if (seen[l]) return false; seen[l] = 1; return true; });
console.log('TOTAL HITS: ' + out.length);
out.forEach(function (l) { console.log(l); });