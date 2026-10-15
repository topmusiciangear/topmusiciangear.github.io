const fs = require('fs');
const p = 'C:/Users/Daniel/projects/topmusiciangear/temp/g4m_eris.html';
if (!fs.existsSync(p)) { console.log('no se descargo el HTML'); process.exit(0); }
const s = fs.readFileSync(p, 'utf8');
console.log('longitud: ' + s.length);

const og = (s.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) || [])[1];
console.log('og:image: ' + (og || '(no encontrado)'));

const r2 = [...new Set(s.match(/r2\.gear4music\.com\/media\/[^"'\\ ]+/g) || [])];
console.log('\nimagenes r2 (' + r2.length + '):');
r2.slice(0, 6).forEach(x => console.log('  ' + x));

const t = (s.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1];
console.log('\ntitulo: ' + (t || '').trim());

const precios = [...new Set((s.match(/£[\d,]+\.\d\d/g) || []))];
console.log('precios en la pagina: ' + precios.slice(0, 8).join('  '));
