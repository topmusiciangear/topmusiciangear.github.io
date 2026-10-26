const fs=require('fs');
const B='C:/Users/Daniel/projects/topmusiciangear/';
const g=JSON.parse(fs.readFileSync(B+'data/guides.json','utf8'));
const gu=g.find(x=>x.id==='beginner-bass-guitars');
gu.sections[1].heading='Ibanez GSR200: Soundgear Comfort for Beginners';
fs.writeFileSync(B+'data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('done');