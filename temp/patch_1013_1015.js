const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

// ---------- 1. build-guides.js: TEST_SHOP_BTN ----------
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const reps = [
  ['\n1014: {prices:{pluginboutique:"€301.51"},pbCur:{us:"$299.00",uk:"£237.97"}},',
   '\n1014: {prices:{pluginboutique:"€301.51",gear4music:"£269.50"},pbCur:{us:"$299.00",uk:"£237.97"}},'],
  ['\n1015: {prices:{pluginboutique:"€704.87"},pbCur:{us:"$699.00",uk:"£556.33"}},',
   '\n1015: {prices:{pluginboutique:"€704.87",gear4music:"£547.00",zzounds:"$699.00",andertons:"£547.00",musicstore:"€629.00"},pbCur:{us:"$699.00",uk:"£556.33"}},']
];
reps.forEach(([a, b]) => {
  if (!bg.includes(a)) { console.log('NO ENCONTRADO: ' + a.trim().slice(0, 20)); process.exit(1); }
  if (bg.indexOf(a) !== bg.lastIndexOf(a)) { console.log('AMBIGUO: ' + a.trim().slice(0, 20)); process.exit(1); }
  bg = bg.replace(a, b);
});
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
console.log('build-guides.js: 1014 + 1015 actualizados');

// ---------- 2. products.json ----------
const pp = B + 'data/products.json';
const raw = fs.readFileSync(pp, 'utf8');
const products = JSON.parse(raw);
const imgKey = products.find(p => p.id === 1013).image !== undefined ? 'image' : 'img';

function patch(id, fn) {
  const p = products.find(x => x.id === id);
  if (!p) { console.log('producto ' + id + ' NO existe'); process.exit(1); }
  fn(p);
  console.log(id + ' ' + p.title + ' -> ' + JSON.stringify({ img: p[imgKey], stores: Object.keys(p.stores || {}) }));
}

// 1013 MeldwayGrand: foto PB banner
patch(1013, p => { p[imgKey] = 'https://banners.pluginboutique.com/ptnotkmxcgncqbh5xzau13vw5bje'; });

// 1014 Kontakt 8: + Gear4music (version completa, NO update)
patch(1014, p => {
  p.stores = p.stores || {};
  p.stores.gear4music = 'https://www.gear4music.com/Recording-and-Computers/Native-Instruments-Kontakt-8/6NPI';
});

// 1015 V Collection 11 Pro: foto G4M + 4 tiendas
patch(1015, p => {
  p[imgKey] = 'https://r2.gear4music.com/media/121/1211824/1200/preview.jpg';
  p.stores = p.stores || {};
  p.stores.gear4music = 'https://www.gear4music.com/Recording-and-Computers/Arturia-V-Collection-11-Pro/73TV';
  p.stores.zzounds = 'https://www.zzounds.com/item--ARAVCOLL11PRO';
  p.stores.andertons = 'https://www.andertons.co.uk/arturia-vcollection-11-pro--esd/';
  p.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/Arturia-V-Collection-11-Pro/art-PCM0018468-000';
});

fs.writeFileSync(pp, JSON.stringify(products, null, 2), 'utf8');
console.log('\nproducts.json escrito (clave imagen: "' + imgKey + '")');