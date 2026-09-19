var d = require('../data/guides.json');
var YEAR = '2026';
var reYear = new RegExp('\\b' + YEAR + '\\b');
var rePrice = /\$|\$[0-9]|€|£|usd|under ?\$?[0-9]|below ?\$?[0-9]|from ?\$?[0-9]|\b[0-9]{1,3}(?:,[0-9]{3})+\b/;
var reSpec = /\b(spec|specs|dac|air mode|khz|hz ?input|db |db s|db of|watt|watts|channel(s)?|x[0-9]{2}|preamp|latency|noise floor|inputs?|outputs?|xlr|usb|midi|dsp|1\/[0-9]|inch|-inch|\.\d{1,2} ?db)\b|\b[0-9]{2,4} ?(?:w|watts|hz|khz|db|channel|input|output|inches|inch|bit|ms|m|km|feet|gb|tb)\b/i;
function clean(s){ return (s||'').replace(/\s+/g,' ').trim(); }
var res = d.map(function(g){
  var fields = ['title','title_es','titleTag','titleTag_es','description','description_es'];
  var hasYear = fields.some(function(f){ return reYear.test(clean(g[f])); });
  var de = clean(g.description), des = clean(g.description_es);
  var hasConcrete = /rePrice/.test.de ? false : (rePrice.test(de) || reSpec.test(de));
  var missing = [];
  if (!hasYear) missing.push('SIN-AÑO');
  if (!hasConcrete) missing.push('SIN-DATOS');
  if (!de || !des) missing.push('DESC-INCOMPLETA');
  return { id: g.id, missing: missing, title: clean(g.title), desc: de };
});
console.log('TOTAL:' + d.length);
console.log('\n== EN ITALIA/OJO: OK (solo 3) ==');
console.log('== SIN-AÑO (' + res.filter(r=>r.missing.indexOf('SIN-AÑO')>-1).length + ') ==');
console.log(res.filter(r=>r.missing.indexOf('SIN-AÑO')>-1).map(r=>r.id).join(', '));
console.log('\n== SIN-DATOS-CONCRETOS (' + res.filter(r=>r.missing.indexOf('SIN-DATOS')>-1).length + ') ==');
console.log(res.filter(r=>r.missing.indexOf('SIN-DATOS')>-1).map(r=>r.id).join(', '));
console.log('\n== AMBOS (SIN-AÑO + SIN-DATOS) ==');
console.log(res.filter(r=>r.missing.indexOf('SIN-AÑO')>-1 && r.missing.indexOf('SIN-DATOS')>-1).map(r=>r.id).join(', '));
console.log('\n== DESC-INCOMPLETA ==');
console.log(res.filter(r=>r.missing.indexOf('DESC-INCOMPLETA')>-1).map(r=>r.id).join(', ') || 'ninguna');