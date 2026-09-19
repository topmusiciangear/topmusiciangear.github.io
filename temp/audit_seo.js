var fs = require('fs');
var d = require('../data/guides.json');
var YEAR = '2026';
var vague = /\b(friendliest|friendly|best|top|great|amazing|excellent|ultimate|essential|must-have|perfect|comprehensive|deep dive|complete guide|everything|all(-|)in(-|)one)\b/i;
var hasPrice = /\$|eur|€|£|usd|k€|under [0-9]|below [0-9]|around \$/i;
var hasSpec = /db|khz|hz|bit|watt|1\/[0-9]|[0-9]+-inch|inch|channels|inputs|outputs|midi|xlr|usb|air mode|dsp|dac|latency|gain|noise floor|wireless|models?|series|v[0-9]|mk[ii]{0,2}|\b[0-9]{2,4}\b/;
var hasYear = new RegExp('\\b' + YEAR + '\\b');

function clean(s){ return (s||'').replace(/\s+/g,' ').trim(); }

var rows = d.map(function(g){
  var t = clean(g.title), te = clean(g.title_es);
  var tt = clean(g.titleTag), tte = clean(g.titleTag_es);
  var de = clean(g.description), des = clean(g.description_es);
  var flagYear = !(hasYear.test(t) || hasYear.test(tt) || hasYear.test(de));
  var flagVague = vague.test(t) || vague.test(tt);
  var flagNoConcrete = !(hasPrice.test(de) || hasSpec.test(de) || hasSpec.test(tt));
  var flagDescEmpty = !de || !des;
  var flags = [];
  if (flagYear) flags.push('NO-YEAR');
  if (flagVague) flags.push('VAGUE');
  if (flagNoConcrete) flags.push('NO-CONCRETE');
  if (flagDescEmpty) flags.push('DESC/ES-MISSING');
  return { id: g.id, flags: flags, title: t, desc: de };
}).filter(function(r){ return r.flags.length; });

console.log('total guides:' + d.length + '  w/ issues:' + rows.length);
rows.forEach(function(r){
  console.log('\n### ' + r.id + '  [' + r.flags.join(',') + ']');
  console.log('  T: ' + r.title);
  console.log('  D: ' + r.desc);
});