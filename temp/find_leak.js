const fs=require('fs');
const B='C:/Users/Daniel/projects/topmusiciangear/';
const g=JSON.parse(fs.readFileSync(B+'data/guides.json','utf8'));
const gu=g.find(x=>x.id==='best-monitors');
const t=JSON.stringify(gu);
const idx=t.indexOf('Mejores monitores de estudio para salas pequeñas'.replace('ñ','\u00f1')? 'Mejores monitores de estudio para salas peque');
console.log('idx', idx);
if(idx!==-1) console.log(t.slice(Math.max(0,idx-120), idx+120));