const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

// ---------- products.json ----------
const pp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(pp, 'utf8'));
const set = (id, img, stores) => {
  const p = products.find(x => x.id === id);
  if (!p) { console.log(id + ' no existe'); process.exit(1); }
  if (img) { p.img = img; p.image = img; }
  Object.assign(p.stores, stores || {});
  console.log(id + ' ' + p.title);
  console.log('  img: ' + p.img);
  console.log('  stores: ' + Object.keys(p.stores).join(', '));
};
set(1012, 'https://r2.gear4music.com/media/86/862628/1200/preview.jpg',
  { gear4music: 'https://www.gear4music.com/Recording-and-Computers/Zynaptiq-Pitchmap/52GK' });
set(1010, 'https://r2.gear4music.com/media/119/1193109/1200/preview.jpg',
  { gear4music: 'https://www.gear4music.com/Recording-and-Computers/Audiomodern-Playbeat-4/71UL' });
set(1009, 'https://banners.pluginboutique.com/py7p3xx6rk4ry7i10ywnp66ayqnh', null);
fs.writeFileSync(pp, JSON.stringify(products, null, 2), 'utf8');

// ---------- build-guides.js: precios ----------
const eur = v => (v / 1.0084).toFixed(2);
const gbp = v => ((v / 1.0084) * 0.7959).toFixed(2);

let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
function cambiar(id, nueva) {
  const re = new RegExp('\\n' + id + ': \\{prices:\\{[^\\n]*\\},pbCur:\\{[^\\n]*\\},?\\},?');
  const m = bg.match(re);
  if (!m) { console.log('NO encontrada la entrada ' + id); process.exit(1); }
  if (bg.split(m[0]).length - 1 !== 1) { console.log('AMBIGUA ' + id); process.exit(1); }
  bg = bg.replace(m[0], nueva);
  console.log(id + ' -> ' + nueva.trim());
}
cambiar(1012, '\n1012: {prices:{pluginboutique:"\u20AC173.00",gear4music:"\u00A365.00"},pbCur:{us:"$' + eur(173) + '",uk:"\u00A3' + gbp(173) + '"}},');
cambiar(1010, '\n1010: {prices:{pluginboutique:"\u20AC89.75",gear4music:"\u00A365.00"},pbCur:{us:"$89.00",uk:"\u00A370.84"}},');
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
console.log('\nPB 1012 -> $' + eur(173) + ' / \u00A3' + gbp(173));