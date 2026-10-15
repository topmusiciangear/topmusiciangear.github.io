const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const g = guides.find(x => x.id === 'starter-studio');
// volcar el intro EN crudo para ver el HTML exacto
console.log('=== INTRO EN CRUDO ===');
console.log(JSON.stringify(g.intro));
console.log('');
console.log('=== INTRO ES CRUDO ===');
console.log(JSON.stringify(g.intro_es));