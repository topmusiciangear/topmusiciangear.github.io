const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'budget-bass-like-expensive');
const s = g.sections.find(x => (x.products || [])[0] === 683);
const m = /[^.]*\$899[^.]*\./.exec(s.content);
console.log('EN: ' + m[0].trim());
const e = /[^.]*\$899[^.]*\./.exec(s.content_es);
console.log('ES: ' + e[0].trim());