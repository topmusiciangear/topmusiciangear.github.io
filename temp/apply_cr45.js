const fs = require('fs');
const H = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0.0.0 Safari/537.36' };
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

// 1. validar la foto limpia
const foto = 'https://r2.gear4music.com/media/127/1274870/1200/preview.jpg';
(async () => {
const r = await fetch(foto, { headers: H });
const tipo = r.headers.get('content-type');
const bytes = (await r.arrayBuffer()).byteLength;
console.log('=== FOTO MACKIE CR4.5 ===');
console.log('  ' + foto);
console.log('  status=' + r.status + ' | content-type=' + tipo + ' | bytes=' + bytes);
const valida = r.status === 200 && /^image\//.test(tipo || '');
console.log('  valida (200 + image/*): ' + (valida ? 'SI' : 'NO'));
if (!valida) process.exit(1);

// 2. ficha 1048
const rp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(rp, 'utf8'));
const p = products.find(x => x.id === 1048);
p.img = foto;
fs.writeFileSync(rp, JSON.stringify(products, null, 2), 'utf8');
console.log('\n=== FICHA 1048 ===');
console.log('  ' + p.title + ' -> img asignada');
console.log('  tiendas: ' + (Object.keys(p.stores).join(', ') || 'ninguna'));

const sinFoto = products.filter(x => x.category === 'monitors' && !x.img);
console.log('  monitores del catalogo sin foto: ' + sinFoto.length + (sinFoto.length ? ' -> ' + sinFoto.map(x => x.id + ' ' + x.title).join(', ') : ''));

// 3. portada de la guia
const rg = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(rg, 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');
const antes = g.image || '(vacia)';
g.image = foto;
fs.writeFileSync(rg, JSON.stringify(guides, null, 2), 'utf8');
console.log('\n=== PORTADA DE LA GUIA ===');
console.log('  antes: ' + antes);
console.log('  ahora: ' + g.image);

// 4. comprobacion: las imagenes de todas las guias de monitores
console.log('\n=== OTRAS GUIAS DE MONITORES SIN IMAGEN ===');
const sinImg = guides.filter(x => x.category === 'monitors' && !x.image);
console.log('  ' + sinImg.length + ' de ' + guides.filter(x => x.category === 'monitors').length);
sinImg.forEach(x => console.log('    ! ' + x.id));
})();
