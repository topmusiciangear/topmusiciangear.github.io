const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const arr = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const list = Array.isArray(arr)?arr:arr.products;

// ids que menciona el usuario + los que ya estan en la guia
const BUSCAR = [18, 3, 26, 19, 167, 170, 277, 330, 39, 58, 25, 15, 16, 17, 53, 54, 55, 328, 5, 20, 4, 2, 1, 50, 51, 52];
console.log('=== PRECIOS EN CATALOGO ===');
BUSCAR.forEach(id=>{
  const p = list.find(x=>x.id===id);
  if (!p) { console.log('  id ' + id + ': NO EXISTE'); return; }
  const stores = p.stores ? Object.keys(p.stores) : [];
  console.log('\nid ' + id + ': ' + p.title);
  console.log('   price canonico: $' + p.price);
  console.log('   descripcion: ' + String(p.desc||'').slice(0,80));
  console.log('   tiendas: ' + stores.join(', '));
});

// precios TEST_SHOP_BTN de los mismos
const bs = fs.readFileSync(BASE+'build-guides.js','utf8');
console.log('\n\n=== PRECIOS EN TEST_SHOP_BTN (build-guides.js) ===');
BUSCAR.forEach(id=>{
  const re = new RegExp('\\n  ' + id + ':\\s*\\{prices:\\{([^}]*)\\}');
  const m = bs.match(re);
  if (m) console.log('  id ' + id + ': ' + m[1].trim());
});