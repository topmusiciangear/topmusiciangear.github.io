const fs = require('fs');

const en = fs.readFileSync('guides/monitor-setup.html', 'utf8');
const es = fs.readFileSync('guides/monitor-setup_es.html', 'utf8');
const prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

for (const id of [646, 651]) {
  const p = prods.find(x => x.id === id);
  console.log(id + ' | ' + p.title + ' | ' + p.title_es + ' | ' + p.img);
}

for (const [name, s] of [['EN', en], ['ES', es]]) {
  console.log('\n=== ' + name + ' ===');
  console.log('nombre nuevo ISO:', (s.match(/IsoAcoustics ISO-200 Studio Monitor Stands \(Pair\)/g) || []).length);
  console.log('nombre nuevo MS:', (s.match(/Ultimate Support MS-100 Studio Monitor Stands \(Pair\)/g) || []).length);
  console.log('nombres viejos:', (s.match(/IsoAcoustics ISO-200 \(Pair\)|Ultimate Support MS-100 \(Pair\)/g) || []).length);
  console.log('prosa "Stands use":', s.includes('Studio Monitor Stands use a patented'));
  console.log('prosa "Stands carry":', s.includes('Studio Monitor Stands carry 34 kg'));
  console.log('conteo "Studio Monitor Stands":', (s.match(/Studio Monitor Stands/g) || []).length);
}

const esNew = (es.match(/Soportes de monitor IsoAcoustics ISO-200 \(par\)/g) || []).length;
const esNew2 = (es.match(/Soportes de monitor Ultimate Support MS-100 \(par\)/g) || []).length;
console.log('\nES nombres nuevos:', esNew, esNew2);
console.log('ES prosa "Los soportes ... usan":', es.includes('Los soportes IsoAcoustics ISO-200 (par) usan'));
console.log('ES prosa "los soportes ... soportan":', es.includes('los soportes Ultimate Support MS-100 (par) soportan'));
console.log('ES restos "(Pair)":', (es.match(/\(Pair\)/g) || []).length);

// Alt text de la imagen del producto
const i = en.indexOf('IsoAcoustics ISO-200 Studio Monitor Stands');
if (i > -1) console.log('\ncontexto EN tarjeta:', en.slice(i - 300, i + 350).replace(/\s+/g, ' '));
