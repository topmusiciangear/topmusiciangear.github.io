// Limpia fix-clipping-scarlett: solo contenido instruccional puro.
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

fs.writeFileSync(B + 'temp/guides.before_clean2.json', JSON.stringify(guides, null, 2), 'utf8');

const g = guides.find(x => x.id === 'fix-clipping-scarlett');

g.verdict = '';
g.verdict_es = '';
g.conclusion = '';
g.conclusion_es = '';

if (g.sections && g.sections.length) {
  g.sections.forEach(s => {
    if (s.content) {
      s.content = s.content
        .replace(/Cloudlifter/gi, 'un booster de ganancia limpia')
        .replace(/Electro-Voice RE20/gi, 'un micrófono de salida baja')
        .replace(/Universal Audio Apollo Twin X Gen 2/gi, 'una interfaz con previos de mayor ganancia')
        .replace(/Audient iD14 MkII/gi, 'una interfaz con previos de mayor ganancia');
      if (s.content_es) {
        s.content_es = s.content_es
          .replace(/Cloudlifter/gi, 'un booster de ganancia limpia')
          .replace(/Electro-Voice RE20/gi, 'un micrófono de salida baja')
          .replace(/Universal Audio Apollo Twin X Gen 2/gi, 'una interfaz con previos de mayor ganancia')
          .replace(/Audient iD14 MkII/gi, 'una interfaz con previos de mayor ganancia');
      }
    }
  });
}

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('Backup: temp/guides.before_clean2.json');
console.log('data/guides.json escrito.');
console.log('verdict: "' + g.verdict + '"');
console.log('verdict_es: "' + g.verdict_es + '"');
console.log('conclusion: "' + g.conclusion + '"');
console.log('conclusion_es: "' + g.conclusion_es + '"');
console.log('productTable: ' + JSON.stringify(g.productTable));