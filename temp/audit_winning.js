var d = require('../data/guides.json');
var YEAR = '2026';
var brands = /\b(Sennheiser|Shure|Xvive|Yamaha|Behringer|Allen & Heath|Midas|Mackie|EV|Electro[- ]Voice|QSC|JBL|KRK|Kali|Adam|ADAM|Genelec|Neumann|AKG|Rode|RØDE|Audio[- ]Technica|ATH|Sony|Beyerdynamic|DT[ -]?7?7?0|DT[ -]?9?9?0|Focusrite|Scarlett|MOTU|Audient|Universal Audio|UA Volt|Apollo|RME|Ableton|Logic|FL Studio|Cubase|Pro Tools|FabFilter|iZotope|Ozone|Roland|Elektron|Akai|MPC|Korg|Moog|Sequential|Nord|Strymon|Boss|Ibanez|Telecaster|Stratocaster|Les Paul|Martin|Taylor|Gibson|Fender|Gibson|Audeze|Focal|Royer|Coles|Royer|Le witt|Lewitt|Hollyland|DJI|Elgato|Razer|Rodecaster|Mackie|TC Electronic|Line 6|HeadRush|Novation|Xvive|Radial|Rupert Neve|Squire|Squier|Epiphone|Gretsch|Pacifica|PreSonus|A&H)\b/i;
var reModel = /(?:vs|battle|duel|compared|comparison|versus)\b/i;
var reNum = /(?:[A-Z0-9]{1,4}[- _][A-Z0-9]{2,5}|\b[0-9]{2,4}(?:P|Pro|XT|X|MK?|XL|B|C|A|D|S|T|L|R)\b)/i;
var reYear = new RegExp('\\b' + YEAR + '\\b');
var rePromise = /\b(verdict|prices?|price|before you buy|find your|pick|winner|range|latency|compared?|ranking|reviewed|full review|honest|vs)\b/i;

function clean(s){ return (s||'').replace(/\s+/g,' ').trim(); }
function evalCheck(g){
  var title = clean(g.titleTag || g.title);
  var de = clean(g.description);
  var t = title + ' ' + de;
  var year = reYear.test(t);
  var models = brands.test(t) || reModel.test(de) || reNum.test(t);
  var promise = rePromise.test(de);
  var missing = [];
  if(!year) missing.push('AÑO');
  if(!models) missing.push('MODELOS');
  if(!promise) missing.push('PROMESA');
  return { id:g.id, title:title, desc:de, missing:missing };
}
var res = d.map(evalCheck);
var groups = {};
res.forEach(function(r){
  var k = r.missing.length===0 ? 'OK' : r.missing.join('+');
  (groups[k] = groups[k] || []).push(r);
});
var summary = { OK:0, FALTA:0 };
res.forEach(function(r){ r.missing.length ? summary.FALTA++ : summary.OK++; });
console.log('TOTAL:' + d.length + '  OK:' + summary.OK + '  FALTA-ALGO:' + summary.FALTA);
var order = Object.keys(groups).sort(function(a,b){ return groups[b].length - groups[a].length; });
order.forEach(function(k){
  var arr = groups[k];
  console.log('\n=== ' + (k==='OK'?'CUMPLE PATRÓN (OK)':('FALTA: '+k)) + ' (' + arr.length + ') ===');
  arr.forEach(function(r){ console.log('  - ' + r.id); });
});