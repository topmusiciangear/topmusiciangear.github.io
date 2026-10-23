const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
let c = fs.readFileSync(path, 'utf8');
let obj = JSON.parse(c);
const g = obj.find(x => x.id === 'best-monitors');

// Corregir FAQ 8 - "bajos bajos" -> "graves profundos"
g.faq[7].a_es = g.faq[7].a_es.replace(
  'bajos bajos ajustados y musicales',
  'graves profundos, ajustados y musicales'
);

fs.writeFileSync(path, JSON.stringify(obj, null, 2));
console.log('FAQ 8 corregida: "bajos bajos" -> "graves profundos"');

// Verificar
const obj2 = JSON.parse(fs.readFileSync(path, 'utf8'));
const g2 = obj2.find(x => x.id === 'best-monitors');
console.log('FAQ 8 respuesta:', g2.faq[7].a_es.substring(0, 200));