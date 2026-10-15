const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');

function ruta(obj, prefijo, out) {
  if (!obj || typeof obj !== 'object') return out;
  Object.keys(obj).forEach(k => {
    const p = prefijo ? prefijo + '.' + k : k;
    if (/faq/i.test(k)) out.push({ ruta: p, valor: obj[k] });
    else ruta(obj[k], p, out);
  });
  return out;
}

const faqs = ruta(guia, '', []);
console.log('=== ' + faqs.length + ' campos FAQ ===\n');
faqs.forEach(f => {
  console.log(f.ruta + ':');
  console.log('   ' + String(f.valor).replace(/\s+/g, ' ').slice(0, 230) + '\n');
});
