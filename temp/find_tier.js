const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const g = guides.find(x => x.id === 'starter-studio');
const s = g.sections[3];
console.log('heading: ' + s.heading_es);
const i = s.content_es.indexOf('tier');
console.log('contexto: ...' + s.content_es.slice(Math.max(0,i-120), i+120) + '...');