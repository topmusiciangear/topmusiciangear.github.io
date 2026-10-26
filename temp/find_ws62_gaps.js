const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const sub = g.find(x => x.id === 'studio-subwoofers');
console.log('columns:', (sub.productTable.columns || []).map(c => JSON.stringify(c.title)).join(' | '));
const t = JSON.stringify(sub);
const pats = ['" : ', 'product-name\\"> <\\/span>', 'The is the', 'El es el', 'El es el sub', 'The is the compact'];
pats.forEach(p => {
  const c = (t.match(new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  if (c) console.log('patron ' + JSON.stringify(p) + ': ' + c);
});
// tambien listar todos los campos string que contengan '6.5-inch horizontally opposed' o 'El es el'
function walk(o, path) {
  if (typeof o === 'string') {
    if (o.includes('6.5-inch horizontally opposed') || o.includes('El es el') || o.includes('The is the') || /product-name"> <\/span>/.test(o) || o.trim().startsWith(': ')) {
      console.log('CAMPO', path, '=>', o.slice(0, 150));
    }
  } else if (Array.isArray(o)) o.forEach((v, i) => walk(v, path + '[' + i + ']'));
  else if (o && typeof o === 'object') Object.keys(o).forEach(k => walk(o[k], path + '.' + k));
}
walk(sub, 'studio-subwoofers');
