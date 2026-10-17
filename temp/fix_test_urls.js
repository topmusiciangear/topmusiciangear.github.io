const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const titulo = id => (products.find(p => p.id === Number(id)) || {}).title || '';
const searchTerm = t => { const s = String(t || '').trim(); const c = s.replace(/\s*\((each|pair|set|2 headsets?)\)\s*$/i, '').trim(); return c || s; };

const ruta = B + 'build-guides.js';
let texto = fs.readFileSync(ruta, 'utf8');
const saltos = texto.split('\n');
let cambios = 0;
const salida = saltos.map(linea => {
  const m = linea.match(/^\s*(\d+):\s*\{/);
  if (!m) return linea;
  const t = titulo(m[1]);
  if (!t) return linea;
  const esperado = searchTerm(t);
  return linea.replace(/([?&](?:search_query|SearchText)=)([^"'&\s\\]+)/g, (todo, pre, val) => {
    const antes = decodeURIComponent(val.replace(/\+/g, ' '));
    if (antes === esperado) return todo;
    cambios++;
    console.log('  ' + m[1] + ': "' + antes + '" -> "' + esperado + '"');
    return pre + encodeURIComponent(esperado).replace(/%20/g, '+');
  });
});
fs.writeFileSync(ruta, salida.join('\n'), 'utf8');
console.log('\nlineas modificadas: ' + cambios);

// comprobacion: los precios siguen intactos
const check = fs.readFileSync(ruta, 'utf8');
[93, 214, 431, 434, 438, 538, 540, 586, 619, 679].forEach(id => {
  const mm = check.match(new RegExp('(?:^|\\n)\\s*' + id + ': \\{prices:\\{[^\\n]*'));
  console.log('  ' + id + ': ' + (mm ? mm[0].replace(/^\n/, '').trim().slice(0, 110) : 'NO'));
});