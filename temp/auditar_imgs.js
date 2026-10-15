const fs = require('fs');
const p = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));

// agrupar por dominio
const dom = {};
p.forEach(x => {
  const u = x.img || '';
  if (!u) return;
  let d;
  try { d = new URL(u).hostname; } catch (e) { d = '(invalida)'; }
  (dom[d] = dom[d] || []).push({ id: x.id, t: x.title, u });
});

console.log('=== IMAGENES POR DOMINIO (' + p.filter(x => x.img).length + ' productos) ===');
Object.entries(dom).sort((a, b) => b[1].length - a[1].length).forEach(([d, l]) =>
  console.log('  ' + String(l.length).padStart(4) + '  ' + d));

console.log('\n=== LOS QUE NO SON G4M (candidatos a estar rotos) ===');
const otros = p.filter(x => x.img && !/r2\.gear4music\.com/.test(x.img));
console.log('  total: ' + otros.length);
otros.forEach(x => {
  let d = ''; try { d = new URL(x.img).hostname; } catch (e) { d = '(invalida)'; }
  console.log('  ' + String(x.id).padStart(4) + '  ' + d.padEnd(30) + ' ' + x.title);
});

// volcar a JSON para comprobarlas con curl
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/otros_imgs.json',
  JSON.stringify(otros.map(x => ({ id: x.id, t: x.title, img: x.img })), null, 1));
console.log('\nlista guardada en temp/otros_imgs.json');
