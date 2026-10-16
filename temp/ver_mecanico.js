const fs = require('fs');
const raw = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');
const g = JSON.parse(raw);
function textosES(o, acc) {
  acc = acc || [];
  if (Array.isArray(o)) { o.forEach(v => textosES(v, acc)); return acc; }
  if (o && typeof o === 'object') {
    Object.entries(o).forEach(([k, v]) => {
      if (typeof v === 'string' && /(_es|title_es|desc_es)$/.test(k)) acc.push(v);
      else if (v && typeof v === 'object') textosES(v, acc);
    });
    return acc;
  }
  return acc;
}
let es = [];
g.forEach(gg => { es = es.concat(textosES(gg, [])); });
const todo = es.join('\n');
console.log('miles con coma restantes: ' + (todo.match(/\$\d{1,3},\d{3}/g) || []).length);
console.log('decimales con punto+unidad restantes: ' + (todo.match(/\d+\.\d{1,2}\s?(?:pulgadas|kg|cm|mm|kHz|Hz|dB|ms\b|m\b|W\b|V\b|s\b)/g) || []).length);
console.log('"5,5 Bundle" creado por error: ' + (todo.match(/5,5 Bundle/g) || []).length);
console.log('"40.000 Hz" intacto: ' + (todo.match(/40\.000 Hz/g) || []).length);
console.log('ejemplos nuevos: ' + [...new Set(todo.match(/\d+,\d+\s?(?:pulgadas|kg|cm|mm|kHz|Hz|dB)/g) || [])].slice(0, 8).join(' | '));
// EN intacto
let en = [];
g.forEach(gg => { JSON.stringify(gg); });
const rawEn = raw;
console.log('EN con miles coma (debe seguir): ' + (rawEn.match(/\$1,357/g) || []).length + ' (starter tiene $1,357 en EN, correcto)');
