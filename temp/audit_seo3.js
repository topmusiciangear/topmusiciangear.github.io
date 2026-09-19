var d = require('../data/guides.json');
var YEAR = '2026';
var reYear = new RegExp('\\b' + YEAR + '\\b');
var rePrice = /\$[0-9]|\bUS\$\b|€|£|under ?\$?[0-9]|below ?\$?[0-9]|price/i;
var reModel = /\b[A-Za-z0-9]+(?: ?[A-Za-z0-9]+){0,2} ?(?:[0-9]{2,4}|II|III|IV|Mk?[IVX0-9]+|G[0-9]|Plus|EVO|MAX|XD|DLX|PRO)\b|\b[0-9]{2,4}[- ]?[A-Za-z]+\b/i;
var reSpec = /\b(range|latency|impedance|noise floor|bandwidth|frequency|battery|channels?|inputs?|outputs?|mono|stereo|dual|voicing|pad|compression|eq|preamp|dac|bit depth|sample rate|db|khz|hz|mm|watt|watts|feet|metres?)\b/i;

function clean(s){ return (s||'').replace(/\s+/g,' ').trim(); }

var total = d.length;
var byIssue = { 'SIN-AÑO': [], 'SIN-DATOS': [], 'DESC-SIN-CONCRETO': [], 'DESC-ES-MISSING': [], 'OK': [] };

d.forEach(function(g){
  var fields = ['title','title_es','titleTag','titleTag_es','description','description_es'];
  var anyYear = fields.some(function(f){ return reYear.test(clean(g[f])); });
  var de = clean(g.description), des = clean(g.description_es);
  var descConcrete = rePrice.test(de) || reModel.test(de) || reSpec.test(de);
  var tags = [];

  if (!anyYear) tags.push('SIN-AÑO');
  if (!descConcrete) tags.push('SIN-DATOS');
  if (!de || !des) tags.push('DESC-ES-MISSING');
  if (de && descConcrete && /BEST\b/i.test(de) && de.length < 120 && !/under|\$|vs|compared/i.test(de)) tags.push('DESC-SIN-CONCRETO');

  if (!tags.length) { byIssue['OK'].push(g.id); }
  else { tags.forEach(function(tag){ byIssue[tag].push(g.id); }); }
});

console.log('TOTAL:' + total);
Object.keys(byIssue).forEach(function(k){
  var arr = byIssue[k];
  console.log('\n== ' + k + ' (' + arr.length + ' guias) ==');
  if (k === 'OK') console.log(arr.join(', '));
  else arr.forEach(function(id){
    var g = d.find(function(x){return x.id === id;});
    console.log('  - ' + id + ' || ' + clean(g.title) + ' || ' + clean(g.description));
  });
});