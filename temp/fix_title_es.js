const fs=require('fs');
const B='C:/Users/Daniel/projects/topmusiciangear/';
const g=JSON.parse(fs.readFileSync(B+'data/guides.json','utf8'));
const gu=g.find(x=>x.id==='best-monitors-for-small-rooms');
gu.titleTag_es='Mejores monitores para salas pequeñas y sin tratar';
gu.title_es='Mejores monitores para salas pequeñas y sin tratar';
fs.writeFileSync(B+'data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('done');