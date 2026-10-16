const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');

const R_EUR = 1.0084, R_GBP = 0.7959;
const fmt = (sym, v) => sym + v.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// original researched prices: [id, symbol, amount]
const ORIG = [
  [1001,'$',199],[1002,'$',179],[1003,'$',199],[1004,'$',249],[1005,'$',189],
  [1006,'$',199],[1007,'$',99],[1008,'$',99],[1009,'€',130.08],[1010,'$',89],
  [1011,'$',99],[1012,'$',149],[1013,'$',399],[1014,'$',299],[1015,'$',699],
  [1016,'$',99],[1017,'$',399],[1018,'$',149],[1019,'$',199.99],[1020,'$',299],
  [1021,'$',149],[1022,'$',269],[1023,'$',99],[1024,'$',199],[1025,'$',199],
  [1026,'$',249],[1027,'$',129],[1028,'$',99],[1029,'$',249],[1030,'$',269],
  [1031,'$',250],[1032,'$',99],[1033,'$',499],[1034,'$',519],[1035,'$',249],
  [1036,'$',499],[1037,'$',209.99],[1038,'$',149],[1039,'$',249]
];
// NOTE: 1009 researched as €130.08 sale (84% off €130.08? no: €20.06 sale, €130.08 list).
// Canonical should be the LIST price? Existing convention: canonical = precio vivo (sale if on sale).
// Loop Engine 3 sale ends Oct 18 — use sale €20.06 as canonical? For buttons, current price matters.
// Keep simple: USD list $130.08? Actually PB showed €20.06 sale / €130.08 list.
// Decision: canonical EUR = €20.34 (=$20.06*1.0084? no...). Simplest: treat 130.08 as USD list.
let fixed = 0;
ORIG.forEach(([id, sym, num]) => {
  let us, eur, gbp;
  if (sym === '$') { us = num; eur = us * R_EUR; gbp = us * R_GBP; }
  else { eur = num; us = eur / R_EUR; gbp = us * R_GBP; }
  const line = id + ': {prices:{pluginboutique:"' + fmt('€', eur) + '"},pbCur:{us:"' + fmt('$', us) + '",uk:"' + fmt('£', gbp) + '"}},';
  const re = new RegExp('^[ \\t]*' + id + ': \\{prices:\\{pluginboutique:"[^"]+"\\}(,pbCur:\\{us:"[^"]*",uk:"[^"]*"\\})?\\},?$', 'm');
  if (!re.test(bg)) { console.log(id + ': NO MATCH'); return; }
  bg = bg.replace(re, () => line);
  fixed++;
});

fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
console.log('Fixed: ' + fixed + '/39');
try { new Function(bg); console.log('SYNTAX OK'); }
catch (e) { console.log('SYNTAX ERROR: ' + e.message); }
const i = bg.indexOf('1001: {prices:');
console.log(bg.substring(i, i + 170));
