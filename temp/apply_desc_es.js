const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const map = JSON.parse(fs.readFileSync(B + 'temp/desc_es_new.json', 'utf8'));
const pp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(pp, 'utf8'));

let applied = 0, missing = [];
Object.keys(map).forEach(id => {
  const p = products.find(x => x.id === Number(id));
  if (!p) { missing.push(id); return; }
  p.desc_es = map[id];
  // el nombre del producto no se traduce: se replica como hacen los demas
  p.title_es = p.title;
  applied++;
});
if (missing.length) { console.log('ids no encontrados: ' + missing.join(', ')); }
fs.writeFileSync(pp, JSON.stringify(products, null, 2), 'utf8');
console.log('desc_es aplicados: ' + applied);

// ---- verificacion ----
const check = JSON.parse(fs.readFileSync(pp, 'utf8'));
const sinEs = check.filter(p => p.desc && !(p.desc_es || '').trim());
const sinTitle = check.filter(p => p.title && !(p.title_es || '').trim());
const iguales = check.filter(p => p.desc && p.desc_es && p.desc_es.trim() === p.desc.trim());
console.log('\nproducts.json: total=' + check.length);
console.log('sin desc_es: ' + sinEs.length + (sinEs.length ? ' -> ' + sinEs.map(p => p.id).join(', ') : ''));
console.log('sin title_es: ' + sinTitle.length);
console.log('desc_es == desc (sin traducir): ' + iguales.length);

// deteccion de ingles residual en las 36 traducciones nuevas
const EN = /\b(the|and|with|for|from|that|this|your|you|are|is|was|were|will|can|into|than|then|which|while|where|when|what|their|them|they|have|has|had|been|being|its|our|out|not|but|all|any|one|two|three|more|most|less|very|real|best|new|full|single|every|both|each|other|such|only|also|just|like|make|made|using|used|uses|built|includes|included|features|powerful|versatile|complete|professional|world|industry|standard|legacy|definitive)\b/i;
const nuevas = Object.keys(map).map(id => check.find(p => p.id === Number(id)));
const sospechosas = nuevas.filter(p => p && EN.test(p.desc_es));
console.log('\ntraducciones con posibles palabras inglesas: ' + sospechosas.length);
sospechosas.forEach(p => console.log('  ' + p.id + ' ' + p.title + ' -> ' + p.desc_es.slice(0, 90)));