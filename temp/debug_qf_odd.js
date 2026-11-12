// temp/debug_qf_odd.js — depura valores raros de quickfacts
const fs = require('fs');
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const m = src.match(/var QF_ES_MAP = (\{[\s\S]*?\n\});/);
const map = eval('(' + m[1] + ')');
console.log('map["macOS & Windows"] =', JSON.stringify(map['macOS & Windows']));

const P = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const prods = Array.isArray(P) ? P : (P.products || []);
for (const target of ['macOS & Windows', 'Fixed 38-inch', 'Modified 0', '12 analog']) {
  for (const p of prods) {
    for (const f of (p.facts || [])) {
      if (typeof f.value === 'string' && f.value.trim() === target.trim()) {
        const codes = [...f.value].slice(0, 24).map(c => c.charCodeAt(0)).join(',');
        console.log('VAL [' + target + '] prods=' + p.title + ' | raw=' + JSON.stringify(f.value) + ' | codes=' + codes);
        break;
      }
    }
  }
}
