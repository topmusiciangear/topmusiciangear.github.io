const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const P = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const arr = Array.isArray(P) ? P : P.products;
const byId = {}; arr.forEach(p => byId[p.id]=p);
const b = fs.readFileSync(BASE+'build-guides.js','utf8');
const g = guides.find(x=>x.id==='beatmaker-plugins');

const ids = new Set();
(g.featuredProducts||[]).forEach(i=>ids.add(i));
(g.sections||[]).forEach(s=>(s.products||[]).forEach(i=>ids.add(i)));
console.log('### beatmaker-plugins — ' + g.title);
console.log('\nTARJETAS (' + ids.size + '):');
[...ids].forEach(i => {
  const p = byId[i];
  const m = b.match(new RegExp('(^|\\n)\\s*' + i + ':\\s*\\{[\\s\\S]*?\\n\\s*\\},','m'));
  const pb = m && m[0].match(/pluginboutique:\s*"([^"]+)"/);
  console.log('  id ' + i + '  ' + p.title.padEnd(36) + ' $' + String(p.price).padEnd(8) + ' PB: ' + (pb?pb[1]:'-'));
});
console.log('\nSECCIONES (' + g.sections.length + '):');
g.sections.forEach((s,i)=>console.log('  ' + i + '. ' + (s.heading||s.h) + '  products=' + JSON.stringify(s.products||[])));

const esquema = g.comparison ? 'comparison' : (g.productTable ? 'productTable' : 'ninguno');
console.log('\nESQUEMA DE TABLA: ' + esquema);
if (g.comparison) {
  console.log('headers (' + g.comparison.headers.length + '): ' + g.comparison.headers.join(' | '));
  g.comparison.rows.forEach((r,i) => console.log('  [' + i + '] ' + r.label + ' / ' + r.label_es + ' :: ' +
    ['val','val2','val3','val4','val5'].filter(k=>r[k]!==undefined).map(k => k + '=' + JSON.stringify(r[k])).join('  ')));
}
if (g.productTable) {
  console.log('columns: ' + g.productTable.columns.map((c,i)=>i+':'+c.title).join(' | '));
  g.productTable.rows.forEach((r,i)=>console.log('  [' + i + '] ' + r.label + ' :: ' + r.values.map(v=>v.value).join(' ~ ')));
}
console.log('\nVEREDICTOS (' + (g.verdictProsCons||[]).length + '):');
(g.verdictProsCons||[]).forEach((v,i)=>console.log('  ' + i + '. ' + (v.name||v.title) + '  [' + v.pros.length + '/' + v.cons.length + ']'));
console.log('\nconclusion:\n  ' + String(g.conclusion).replace(/<[^>]+>/g,' ').slice(0,600));