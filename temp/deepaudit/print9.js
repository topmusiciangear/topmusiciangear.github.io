var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
function getPath(obj, path) { return path.split(/[.\[\]]+/).filter(Boolean).reduce(function (o, k) { return o == null ? o : o[k]; }, obj); }
function show(id, field) { var x = g.find(function (y) { return y.id === id; }); console.log('[' + id + '].' + field + ' = ' + JSON.stringify(getPath(x, field))); }

var bm = g[4];
console.log('== best-monitors FAQ ==');
Object.keys(bm.featuredSnippet).sort().forEach(function (k) { if (/^faq/.test(k)) console.log('  ' + k + ' = ' + JSON.stringify(bm.featuredSnippet[k])); });

show('best-monitors', 'intro_es');
show('best-monitors', 'sections[1].title_en');
show('best-monitors', 'sections[1].sections[0].title_es');
show('best-monitors', 'featuredSnippet.title_es');
[/sections/, /sections\[/, /s\[/];
console.log('=== sections content (Each) ===');
bm.sections.forEach(function (s, i) {
  console.log('[' + i + '] title_en=' + JSON.stringify(s.title_en));
  if (s.title_en && s.title_en.indexOf('Each') >= 0) { console.log('  -> title_es=' + JSON.stringify(s.title_es)); }
  (s.sections || []).forEach(function (ss, j) {
    var txtEn = ss.title_en || ss.subtitle_en || ss.text_en || '';
    if (/Each[,.]/.test(txtEn)) console.log('[' + i + '].ss[' + j + '] title_en=' + JSON.stringify(ss.title_en) + ' | title_es=' + JSON.stringify(ss.title_es));
    if (ss.text_en && /\bEach[,.]/.test(ss.text_en)) console.log('[' + i + '].ss[' + j + '].text_en=' + JSON.stringify(ss.text_en).slice(0, 160));
  });
  if (s.text_en && /\bEach[,.]/.test(s.text_en)) console.log('[' + i + '].text_en=' + JSON.stringify(s.text_en).slice(0, 160));
});
console.log('=== "revelan" in intro_es ===');
console.log(bm.intro_es.replace(/<[^>]+>/g, ' ').match(/revelan.{0,40}/g));

show('best-monitors', 'faq_q1'); show('best-monitors', 'faq_a1'); show('best-monitors', 'faq_q1_es'); show('best-monitors', 'faq_a1_es');

var sw = g[54];
console.log('\n== stage-wireless top-level faq corrupt check ==');
['faq_a1_en','faq_a2_en','faq_a3_en','faq_a4_en','faq_a5_en','faq_a1_es','faq_a2_es','faq_a3_es','faq_a4_es','faq_a5_es'].forEach(function (k) {
  if (sw[k] && (/\(\)|,099|^\d|\d–\d/.test(sw[k]) || sw[k].match(/\(\d/))) console.log('  ' + k + ' = ' + JSON.stringify(sw[k]));
});