const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'monitor-setup');
console.log('CONCLUSION:\n' + (s.conclusion_es || '(vacia)').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
