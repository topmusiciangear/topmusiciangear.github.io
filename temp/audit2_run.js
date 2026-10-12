var fs = require('fs');
var P = 'C:/Users/Daniel/projects/topmusiciangear/';
try { fs.mkdirSync(P + 'temp/audit2'); } catch (e) {}
var guides = JSON.parse(fs.readFileSync(P + 'data/guides.json', 'utf8'));

// ---------- collect strings with paths ----------
var strings = []; // {guide, path, lang, text}
guides.forEach(function (g, gi) {
  var gname = g.slug || g.id || ('guide' + gi);
  (function walk(v, path) {
    if (typeof v === 'string') {
      var lang = /_es(\.|$|\[)/.test(path + '.') || /(^|\.)[a-z0-9_]*_es$/.test(path) ? 'es' : 'en';
      strings.push({ guide: gname, path: path, lang: lang, text: v });
      return;
    }
    if (Array.isArray(v)) v.forEach(function (x, i) { walk(x, path + '[' + i + ']'); });
    else if (v && typeof v === 'object') Object.keys(v).forEach(function (k) { walk(v[k], path ? path + '.' + k : k); });
  })(g, '');
});
var EN = strings.filter(function (s) { return s.lang === 'en'; });
var ES = strings.filter(function (s) { return s.lang === 'es'; });
console.log('strings EN:' + EN.length + ' ES:' + ES.length);

// ---------- A: AI-tells ----------
var AI_EN = ['delve', "in today\\u0027s fast-paced", 'fast-paced world', 'whether you\\u0027re a beginner or', 'whether you are a beginner or', 'look no further', 'game-changer', 'game changer', 'testament to', '\\bboasts\\b', 'nestled', '\\bvibrant\\b', 'sonic landscape', 'musical landscape', 'it\\u0027s important to note', 'it\\u0027s worth noting', 'last but not least', 'take your .* to the next level', 'unleash', 'harness the power', 'let\\u0027s dive', 'dive into', '\\bembark\\b', 'in the realm of', 'as an ai\\b', 'i\\u0027ve spent countless hours', 'i\\u0027ve spent endless hours', 'trust me,', 'top-notch', 'cutting-edge', 'seamless', 'elevate your'];
var AI_ES = ['profundicemos', 'vertiginoso mundo', 'mundo acelerado', 'ya seas principiante o', 'ya sea que seas', 'no busques m\u00e1s', 'punto justo', 'caballo de batalla', 'caballos de batalla', 'sin\u00f3nimo de', 'lleva tu .* al siguiente nivel', 'libera el poder', 'aprovecha el poder', 'sum\u00e9rgete', 'emb\u00e1rcate', 'en el reino de', 'en \u00faltima instancia', 'he pasado incontables horas', 'he pasado interminables horas', 'cr\u00e9eme', 'de primer nivel', 'de vanguardia', 'sin fisuras', 'eleva tu', 'panorama s\u00f3nico', 'panorama musical', 'testimonio de', 'cabe destacar', 'es importante tener en cuenta', 'vale la pena se\u00f1alar', 'en conclusi\u00f3n,', 'por \u00faltimo pero no menos importante', 'cuando se trata de', 'en t\u00e9rminos de', 'amplia gama de', 'computadora de bater\u00eda', 'grabar a un ', 'resolver eventos', 'opci\u00f3n opci\u00f3n', '\\biA\\b'];
function scan(list, pats, label) {
  var out = [];
  list.forEach(function (s) {
    pats.forEach(function (p) {
      var re = new RegExp(p, 'gi'), m;
      while ((m = re.exec(s.text))) {
        out.push(s.guide + ' :: ' + s.path + ' :: [' + label + ':' + p.replace(/\\\\/g, '') + '] ...' + s.text.slice(Math.max(0, m.index - 60), m.index).replace(/\s+/g, ' ') + ' <<' + m[0] + '>> ' + s.text.slice(m.index + m[0].length, m.index + m[0].length + 60).replace(/\s+/g, ' '));
      }
    });
  });
  return out;
}
var aEN = scan(EN, AI_EN, 'AI-EN');
var aES = scan(ES, AI_ES, 'AI-ES');
fs.writeFileSync(P + 'temp/audit2/ai_en.txt', aEN.join('\n'));
fs.writeFileSync(P + 'temp/audit2/ai_es.txt', aES.join('\n'));
console.log('AI-EN hits:' + aEN.length + ' AI-ES hits:' + aES.length);

// ---------- B: parity ----------
var par = [];
guides.forEach(function (g) {
  var gname = g.slug || g.id;
  Object.keys(g).forEach(function (k) {
    if (/_es$/.test(k)) {
      var base = k.slice(0, -3);
      var en = g[base], es = g[k];
      if (typeof en === 'string' && typeof es === 'string') {
        if (!es.trim()) par.push(gname + ' :: ' + k + ' EMPTY-ES');
        else if (es.trim() === en.trim()) par.push(gname + ' :: ' + k + ' IDENTICAL (untranslated)');
        else if (es.length < en.length * 0.35 && en.length > 120) par.push(gname + ' :: ' + k + ' SHORT-ES (' + es.length + ' vs ' + en.length + ')');
      }
      if (typeof en === 'string' && (es === undefined || es === null)) par.push(gname + ' :: ' + k + ' MISSING-ES-VALUE');
    }
  });
});
// cross-language words
var EN_COMMON = [' the ', ' and ', ' with ', ' you ', ' your ', ' our ', ' this ', ' that ', ' from ', ' will ', ' buy ', ' best ', ' review ', ' price ', ' are ', ' was ', ' were ', ' have ', ' has ', ' which ', ' their ', ' there '];
var ES_COMMON = [' el ', ' la ', ' los ', ' las ', ' una ', ' para ', ' con ', ' est\u00e1', ' precio ', ' tambi\u00e9n', ' a\u00f1os', ' m\u00e1s '];
ES.forEach(function (s) {
  if (s.text.length < 60) return;
  var low = ' ' + s.text.toLowerCase() + ' ';
  var n = 0; EN_COMMON.forEach(function (w) { if (low.indexOf(w) >= 0) n++; });
  if (n >= 4) par.push(s.guide + ' :: ' + s.path + ' ENGLISH-IN-ES (' + n + ' markers)');
});
EN.forEach(function (s) {
  if (s.text.length < 60) return;
  var low = ' ' + s.text.toLowerCase() + ' ';
  var n = 0; ES_COMMON.forEach(function (w) { if (low.indexOf(w) >= 0) n++; });
  if (n >= 3) par.push(s.guide + ' :: ' + s.path + ' SPANISH-IN-EN (' + n + ' markers)');
});
fs.writeFileSync(P + 'temp/audit2/parity.txt', par.join('\n'));
console.log('parity hits:' + par.length);

// ---------- C: artifacts ----------
var art = [];
var ART_RES = [/\(\s*\)/, /\$NaN/, /\bNaN\b/, /undefined/, /\(\s*each\s*\)/i, /more each/i, /more a pair/i, /  /, / \./, / ,/, /\(2026\)/, /\(el par\)/, /\( a pair\)/, /\( each\)/, /\biA\b/];
strings.forEach(function (s) {
  ART_RES.forEach(function (re) {
    var m = re.exec(s.text);
    if (m) art.push(s.guide + ' :: ' + s.path + ' [' + s.lang + '] ARTIFACT ' + re + ' :: ...' + s.text.slice(Math.max(0, m.index - 50), m.index + 70).replace(/\s+/g, ' '));
  });
});
fs.writeFileSync(P + 'temp/audit2/artifacts.txt', art.join('\n'));
console.log('artifact hits:' + art.length);

// ---------- D: repeated sentences across guides (boilerplate) ----------
var sentCount = {};
strings.forEach(function (s) {
  if (s.text.length < 40) return;
  var parts = s.text.split(/(?<=[.!?])\s+/);
  parts.forEach(function (p) {
    var k = p.trim().toLowerCase().replace(/\s+/g, ' ');
    if (k.length > 60) sentCount[k] = (sentCount[k] || 0) + 1;
  });
});
var rep = Object.keys(sentCount).filter(function (k) { return sentCount[k] >= 3; }).sort(function (a, b) { return sentCount[b] - sentCount[a]; });
fs.writeFileSync(P + 'temp/audit2/repeated.txt', rep.slice(0, 120).map(function (k) { return 'x' + sentCount[k] + ' :: ' + k.slice(0, 200); }).join('\n'));
console.log('repeated sentences x3+:' + rep.length);

// ---------- E: verdictProsCons 4+4 rule ----------
var pros = [];
guides.forEach(function (g) {
  var gname = g.slug || g.id;
  ['verdictProsCons'].forEach(function () {});
  var v = g.verdictProsCons;
  if (!v) { pros.push(gname + ' NO verdictProsCons'); return; }
  function cnt(x) { if (Array.isArray(x)) return x.length; if (typeof x === 'string') return x.split(/\n|;/).filter(function (l) { return l.trim(); }).length; return -1; }
  ['pros', 'cons', 'pros_es', 'cons_es'].forEach(function (k) {
    var c = v[k] !== undefined ? cnt(v[k]) : -2;
    if (c >= 0 && c < 4) pros.push(gname + ' :: verdictProsCons.' + k + ' has ' + c + ' (<4)');
    if (c === -2) pros.push(gname + ' :: verdictProsCons.' + k + ' MISSING');
  });
});
fs.writeFileSync(P + 'temp/audit2/proscons.txt', pros.join('\n'));
console.log('proscons hits:' + pros.length);
console.log('DONE');
