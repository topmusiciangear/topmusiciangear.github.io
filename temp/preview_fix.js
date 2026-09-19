var d = require('../data/guides.json');
var YEAR = '2026';
var CTA_EN = 'Read the full verdict & prices before you buy.';
var CTA_ES = 'Lee el veredicto completo y los precios antes de comprar.';

function clean(s){ return (s||'').replace(/\s+/g,' ').trim(); }
function hasYear(s){ return /\b2026\b/.test(s); }
function hasPromise(s, es){
  if (es) return /\b(veredicto|precios|antes de comprar|elige|ganador)\b/i.test(s);
  return /\b(verdict|prices?|before you buy|pick|winner|rank|compared|reviewed)\b/i.test(s);
}
function shoutStart(t){
  return /^(?:>?\d+\s+)?(BEST|MEJORES|COMPLETE|GUÍA|GUIA|ULTIMATE|ULTIMATE GUIDE|TOP|THE\s+BEST|LO(|S)\s+\d)\b/i.test(t)
    || /^[A-ZÀ-ÝÊ]{4,}/.test(t) && /^[A-Z]{4,}(\s|:|\.)/.test(t);
}
function insertYear(t, es){
  if (hasYear(t)) return t;
  t = t.replace(/ \./g, '.').trim();
  if (shoutStart(t)) {
    var seg = t.match(/^([^.:;—–]+)[.:;—–]/);
    if (seg) return t.slice(0, seg[1].length) + ' ' + YEAR + t.slice(seg[1].length);
    return t + ' ' + YEAR + '.';
  }
  var p = es ? 'En ' : 'In ';
  if (/^[a-z]/.test(t)) t = t[0].toUpperCase() + t.slice(1);
  return p + YEAR + ', ' + t;
}
function appendCTA(t, es){
  if (hasPromise(t, es)) return t;
  t = t.trim();
  if (!/[.!?…]\s*$/.test(t)) t += '.';
  return t + ' ' + (es ? CTA_ES : CTA_EN);
}
function fix(g, es){
  var F = es ? 'description_es' : 'description';
  var t = clean(g[F]);
  if (!t) return null;
  var before = t;
  if (!hasYear(t)) t = insertYear(t, es);
  t = appendCTA(t, es);
  if (t === before) return null;
  return { id:g.id, es:es, out:t };
}
var all = [];
d.forEach(function(g){
  ['description','description_es'].forEach(function(f){
    var es = f === 'description_es';
    if (g.id === 'best-interface') {} // noop
    var r = fix(g, es);
    if (r) all.push(r);
  });
});
console.log('TOTAL cambios:', all.length);
fs = require('fs');
fs.writeFileSync('temp/fix_preview.txt', all.map(function(r, i){
  return (i+1) + '. ### ' + r.id + (r.es ? ' [ES]' : ' [EN]') + '\n   ' + r.out;
}).join('\n'));
console.log(all.map(function(r){ return r.id + (r.es?'[ES]':'[EN]'); }).join(', '));