const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

function buscar(objeto, ruta, salida) {
  if (typeof objeto === 'string') {
    if (/400\s*\+|400 models|400 modelos|10,000|10\.000/.test(objeto)) salida.push({ ruta, texto: objeto });
    return;
  }
  if (Array.isArray(objeto)) { objeto.forEach((v, i) => buscar(v, ruta + '[' + i + ']', salida)); return; }
  if (objeto && typeof objeto === 'object') {
    Object.keys(objeto).forEach(k => buscar(objeto[k], ruta + '.' + k, salida));
  }
}
const out = [];
guides.forEach(g => { const r = []; buscar(g, g.id, r); r.forEach(x => out.push(x)); });
console.log('=== MENCIONES "400+" / "10,000" en guides.json: ' + out.length);
out.forEach(x => {
  const i = Math.max(x.texto.search(/400\s*\+|400 models|400 modelos/), x.texto.search(/10,000|10\.000/));
  console.log('\n' + x.ruta);
  console.log('   ...' + x.texto.slice(Math.max(0, i - 130), i + 150).replace(/\s+/g, ' ') + '...');
});
const rp = [];
products.forEach(p => { const r = []; buscar(p, p.id + ' ' + p.title, r); r.forEach(x => rp.push(x)); });
console.log('\n\n=== MENCIONES en products.json: ' + rp.length);
rp.forEach(x => console.log('  ' + x.ruta + ' -> ' + x.texto.slice(0, 120)));