const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const ids = [1044, 1045];
for (const g of guides) {
  const s = JSON.stringify(g);
  for (const id of ids) {
    if (new RegExp('"?(?:id"?:\\s*)?' + id + '\\b').test(s) && (g.featuredProducts || []).includes(id)) {
      console.log('guia', g.id, g.title, '-> incluye', id);
    }
  }
}
// tambien buscar en el catalogo los datos
const prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
for (const p of prods) if (ids.includes(p.id)) console.log(JSON.stringify({ id: p.id, title: p.title, img: p.img, stores: p.stores }, null, 1));
