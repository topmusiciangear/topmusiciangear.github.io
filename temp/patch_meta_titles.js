const fs = require('fs');
const FILE = 'data/guides.json';
let raw = fs.readFileSync(FILE, 'utf8');

function setOnce(oldText, newText, label, expected) {
  const want = expected || 1;
  const o = JSON.stringify(oldText);
  const n = JSON.stringify(newText);
  const c = raw.split(o).length - 1;
  if (c !== want) throw new Error(`[${label}] expected ${want}, got ${c}`);
  raw = raw.split(o).join(n);
  console.log(label, 'ok (' + c + ')');
}

// 1) nylon guide: ES meta description ended on a dangling "y más."
setOnce('Mejores guitarras clásicas para principiantes con cuerdas de nylon. Yamaha C40II, Cordoba C5 y más.',
  'Mejores guitarras clásicas para principiantes con cuerdas de nylon. Yamaha C40II, Cordoba C5 y alternativas económicas.',
  'nylon description_es');

// 2) budget-mics: ES <title> was 69 chars (> 60 limit)
setOnce('Mejores micrófonos económicos XLR para home estudio por menos de $200',
  'Mejores micrófonos XLR económicos para estudio en casa',
  'budget-mics title_es + titleTag_es', 2);

fs.writeFileSync(FILE, raw, 'utf8');
const arr = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const g = (Array.isArray(arr) ? arr : arr.guides);
const n = g.find(x => x.id === 'best-nylon-guitars-for-beginners');
const b = g.find(x => x.id === 'budget-mics');
console.log('nylon description_es:', n.description_es, '(' + n.description_es.length + ')');
console.log('budget-mics titleTag_es:', b.titleTag_es, '(' + b.titleTag_es.length + ')');
