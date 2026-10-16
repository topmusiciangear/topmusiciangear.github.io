const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');

const R_EUR = 1.0084, R_GBP = 0.7959;
const fmt = (sym, v) => sym + v.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// parse "$1,069.00" / "€130.08" -> {sym, num}
function parse(s) {
  const sym = s.trim()[0];
  const num = parseFloat(s.replace(/[^0-9.]/g, ''));
  return { sym, num };
}

let converted = 0, skipped = [];
for (let id = 1001; id <= 1039; id++) {
  const re = new RegExp('^([ \\t]*)' + id + ': \\{prices:\\{pluginboutique:"([^"]+)"\\}\\},?$', 'm');
  const m = bg.match(re);
  if (!m) { skipped.push(id); continue; }
  const indent = m[1];
  const { sym, num } = parse(m[2]);
  let us, eur, gbp;
  if (sym === '$') { us = num; eur = us * R_EUR; gbp = us * R_GBP; }
  else if (sym === '€') { eur = num; us = eur / R_EUR; gbp = us * R_GBP; }
  else if (sym === '£') { gbp = num; us = gbp / R_GBP; eur = us * R_EUR; }
  else { skipped.push(id); continue; }
  const replacement = indent + id + ': {prices:{pluginboutique:"' + fmt('€', eur) + '"},pbCur:{us:"' + fmt('$', us) + '",uk:"' + fmt('£', gbp) + '"}},';
  bg = bg.replace(re, replacement);
  converted++;
}

fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
console.log('Converted: ' + converted + ' | skipped (not single-price format): ' + skipped.join(','));

try { new Function(bg); console.log('SYNTAX OK'); }
catch (e) { console.log('SYNTAX ERROR: ' + e.message); }

// show sample
const i = bg.indexOf('1001: {prices:');
console.log(bg.substring(i, i + 160));
