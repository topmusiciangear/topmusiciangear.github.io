const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const tagReEnd = /\s*\((each|pair|unidad|par|cada uno|cada una)\)\s*$/i;
const tagReDot = /\s*\((each|pair|unidad|par|cada uno|cada una)\)\s*\.\s*$/i;
const titleHasUnit = t => /\((each|pair|unidad|par|cada uno|cada una)\)\s*$/i.test(t || '');

let changed = 0, unitsAdded = 0;
const conflicts = [];

for (const p of products) {
  let tag = null;
  for (const key of ['desc', 'desc_es']) {
    const v = p[key];
    if (!v) continue;
    let m = v.match(tagReDot);
    let next;
    if (m) {
      next = v.replace(tagReDot, '.');
      tag = tag || m[1];
    } else {
      m = v.match(tagReEnd);
      if (m) {
        next = v.replace(tagReEnd, '');
        tag = tag || m[1];
      }
    }
    if (next !== undefined && next !== v) { p[key] = next; changed++; }
  }
  if (!tag) continue;

  const unit = /each|cada uno|cada una/i.test(tag) ? 'each' : 'pair';
  const hasTitleUnit = titleHasUnit(p.title) || titleHasUnit(p.title_es);

  if (p.unit && p.unit !== unit) conflicts.push('#' + p.id + ' unit=' + p.unit + ' tag=' + tag);
  if (!p.unit && !hasTitleUnit) {
    p.unit = unit;
    unitsAdded++;
  }
}

fs.writeFileSync('data/products.json', JSON.stringify(products, null, 2), 'utf8');

console.log('campos de descripcion limpiados:', changed);
console.log('productos con unit asignado:', unitsAdded);

// Quedan etiquetas en descripciones?
const left = products.filter(p => /\((each|pair|unidad|par|cada uno|cada una)\)/i.test(p.desc || '') || /\((each|pair|unidad|par|cada uno|cada una)\)/i.test(p.desc_es || ''));
console.log('descripciones con etiqueta restante:', left.length);
left.slice(0, 10).forEach(p => console.log('  #' + p.id + ' :: ' + (p.desc || '') + ' || ' + (p.desc_es || '')));

if (conflicts.length) {
  console.log('\nCONFLICTOS:');
  conflicts.forEach(c => console.log('  ' + c));
}

const jbl = products.find(p => p.id === 496);
console.log('\nJBL 496 unit:', jbl.unit);
console.log('  EN:', jbl.desc);
console.log('  ES:', jbl.desc_es);
