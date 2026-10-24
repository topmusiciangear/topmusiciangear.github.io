// Escaneo de problemas de texto en las secciones de la guía
const fs = require('fs');
const raw = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');
const g = JSON.parse(raw);
const gu = g.find(x => x.id === 'best-monitors-for-small-rooms');

const pats = [
  'top pick', 'best value', 'Best value', 'principal recomendación', 'mejor relación calidad-precio',
  '( )', ' each)', ' a pair)', 'hard to beat the price', 'This critical', 'the top pick of this guide',
  'game-changer', 'seamless', 'worth noting'
];
gu.sections.forEach((s, i) => {
  ['content', 'content_es'].forEach(f => {
    const t = s[f] || '';
    pats.forEach(p => {
      let idx = 0, c = 0;
      while ((idx = t.indexOf(p, idx)) !== -1) {
        console.log('sec[' + i + '].' + f + ' | "' + p + '" → …' + t.slice(Math.max(0, idx - 60), idx + 70).replace(/\n/g, ' ') + '…');
        idx += p.length; c++;
      }
    });
  });
});
console.log('scan done');
