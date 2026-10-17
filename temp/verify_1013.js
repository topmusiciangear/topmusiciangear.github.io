const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const h = fs.readFileSync(B + 'guides/best-piano-keyboard-vsts.html', 'utf8');
const names = ['MeldaProduction MeldwayGrand', 'Native Instruments Kontakt 8', 'Arturia V Collection 11 Pro'];
names.forEach(name => {
  const i = h.indexOf('guide-product-card-title">' + name);
  if (i < 0) { console.log('=== ' + name + ': NO encontrada'); return; }
  // la card empieza antes del h3: retroceder al inicio del article/card
  const start = h.lastIndexOf('guide-product-card', i - 1);
  const s = h.slice(Math.max(0, start - 2500), i + 2500);
  const img = [...s.matchAll(/<img[^>]+src="([^"]+)"/g)].map(m => m[1]).filter(u => !/logo|avatar/i.test(u));
  const prim = (s.match(/data-pb-eu-p="([^"]*)"[^>]*>/) || []);
  const g4m = /data-store="gear4music"/.test(s) || /gear4music\.com/.test(s);
  const zz = /zzounds\.com/.test(s);
  const ms = /musicstore\.com/.test(s);
  const an = /andertons\.co\.uk/.test(s);
  console.log('=== ' + name);
  console.log('  img: ' + (img[img.length - 1] || 'sin img'));
  console.log('  pb-eu: ' + (prim[1] || 'n/a'));
  console.log('  gear4music: ' + g4m + ' | zzounds: ' + zz + ' | musicstore: ' + ms + ' | andertons: ' + an);
});
// precios en el mapa embebido
const sb = fs.readFileSync(B + 'js/shop-buttons.js', 'utf8');
['1013', '1014', '1015'].forEach(id => {
  const m = sb.match(new RegExp('\\n' + id + ': \\{prices:\\{[^}]*\\}[^\\n]*'));
  console.log('\nshop-buttons.js ' + id + ': ' + (m ? m[0].trim() : 'NO ENCONTRADA'));
});