var d = require('../data/guides.json');
var issues = [];
d.forEach(function(g){
  ['description','description_es'].forEach(function(f){
    var es = f === 'description_es';
    var t = (g[f]||'');
    if (/\b2026\b/.test(t) === false) issues.push(g.id+' '+f+' NO-YEAR');
    if (t.split('2026').length-1 > 1) issues.push(g.id+' '+f+' DOBLE-YEAR: '+t);
    if (t.indexOf('Read the full verdict') > -1 && (t.match(/Read the full verdict/g)||[]).length > 1) issues.push(g.id+' '+f+' DOBLE-CTA');
    if (t.indexOf('Lee el veredicto completo') > -1 && (t.match(/Lee el veredicto completo/g)||[]).length > 1) issues.push(g.id+' '+f+' DOBLE-CTA');
    if (/In 2026, In 2026/.test(t) || /En 2026, En 2026/.test(t)) issues.push(g.id+' '+f+' DOBLE-PREFIJO');
    // promise presence per language
    var ok = es ? /(veredicto|precios|antes de comprar|elige|ganador)/i.test(t) : /(verdict|prices?|before you buy|pick|winner|rank|compared|reviewed)/i.test(t);
    if (!ok) issues.push(g.id+' '+f+' NO-PROMISE: '+t);
  });
});
console.log(issues.length ? issues.join('\n') : 'ALL CLEAN (year + promise, no dupes)');