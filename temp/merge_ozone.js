const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

// ---------- 1. products.json: fuera el duplicado 1033 ----------
const pp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(pp, 'utf8'));
const antes = products.length;
const p30 = products.find(p => p.id === 30);
const p1033 = products.find(p => p.id === 1033);
if (!p30 || !p1033) { console.log('faltan 30 o 1033'); process.exit(1); }
// el texto de 30 es el que ya usan 3 guias; nos quedamos con el
const texto = 'desc=' + p30.desc + ' | desc_es=' + p30.desc_es;
const filtrados = products.filter(p => p.id !== 1033);
fs.writeFileSync(pp, JSON.stringify(filtrados, null, 2), 'utf8');
console.log('products.json: ' + antes + ' -> ' + filtrados.length + ' (1033 eliminado)');
console.log('  conservado id 30: ' + texto.slice(0, 120) + '...');

// ---------- 2. guides.json: 1033 -> 30 en ozone-vs-fabfilter ----------
const gp = B + 'data/guides.json';
let guides = JSON.parse(fs.readFileSync(gp, 'utf8'));
const g = guides.find(x => x.id === 'ozone-vs-fabfilter');
let cambios = 0;
(g.featuredProducts || []).forEach((v, i) => { if (v === 1033) { g.featuredProducts[i] = 30; cambios++; } });
(g.sections || []).forEach(s => (s.products || []).forEach((v, i) => { if (v === 1033) { s.products[i] = 30; cambios++; } }));
fs.writeFileSync(gp, JSON.stringify(guides, null, 2), 'utf8');
console.log('guides.json: ' + cambios + ' referencia(s) 1033 -> 30 en ozone-vs-fabfilter');

// ---------- 3. build-guides.js: fuera la entrada 1033 del mapa ----------
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const linea = bg.match(/\n1033: \{prices:\{[^\n]*\n/);
if (!linea) { console.log('entrada 1033 no encontrada en el mapa'); process.exit(1); }
const n = bg.split(linea[0]).length - 1;
if (n !== 1) { console.log('ocurrencias: ' + n + ' (ambigua)'); process.exit(1); }
bg = bg.replace(linea[0], '\n');
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
console.log('build-guides.js: entrada 1033 eliminada del mapa');

// ---------- verificacion ----------
const prods = JSON.parse(fs.readFileSync(pp, 'utf8'));
console.log('\n1033 en products.json: ' + prods.filter(p => p.id === 1033).length);
const g2 = JSON.parse(fs.readFileSync(gp, 'utf8'));
let rest = 0;
g2.forEach(x => JSON.stringify(x, (k, v) => { if (v === 1033) rest++; return v; }));
console.log('1033 en guides.json: ' + rest);
const b2 = fs.readFileSync(B + 'build-guides.js', 'utf8');
console.log('1033 en build-guides.js: ' + (b2.match(/\{prices:\{[^\n]*\n/) && /(?<!\d)1033: \{prices/.test(b2)));
const Ozone = prods.filter(p => /Ozone 12/.test(p.title));
console.log('entradas Ozone 12 Advanced restantes: ' + Ozone.length + ' (id ' + Ozone.map(p => p.id).join(',') + ')');