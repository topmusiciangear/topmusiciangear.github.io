const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');

Object.keys(guia).forEach(k => {
  if (/faq/i.test(k)) {
    const v = guia[k];
    console.log('\n' + k + ':');
    console.log('  ' + String(v).slice(0, 400));
  }
});
