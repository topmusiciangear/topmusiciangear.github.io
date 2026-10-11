var fs = require('fs');
var css = fs.readFileSync('css/style.css', 'utf8');
console.log('guide-more-btn in css: ' + (css.indexOf('.guide-more-btn') >= 0));
var es = fs.readFileSync('deals_es.html', 'utf8');
var en = fs.readFileSync('deals.html', 'utf8');
function count(s, t) { return s.split(t).length - 1; }
console.log('es hidden: ' + count(es, 'deal-extra" style="display:none') + ' | btn Ver más: ' + (es.indexOf('Ver más') >= 0));
console.log('en hidden: ' + count(en, 'deal-extra" style="display:none') + ' | btn Show more: ' + (en.indexOf('Show more') >= 0));
console.log('es total cards: ' + count(es, 'deals-card deal-card'));
