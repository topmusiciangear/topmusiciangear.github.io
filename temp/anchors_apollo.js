const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'apollo-vs-babyface');
console.log('links en conclusion/sec3:');
[...s.conclusion_es.matchAll(/<a href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].forEach(m => {
  const id = m[1].replace('/guides/', '').replace('_es.html', '');
  const dest = g.find(y => y.id === id);
  console.log('  ' + id + '  texto: "' + m[2] + '"  | titulo: "' + (dest ? dest.title_es : 'NO EXISTE') + '"');
});
const t = JSON.stringify(s);
const i = t.indexOf('nuestra guía de la mejor interfaz');
console.log('\nsec3 link: ' + JSON.stringify(t.slice(i - 120, i + 60)));
