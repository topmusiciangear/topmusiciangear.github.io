const fs=require('fs');
const B='C:/Users/Daniel/projects/topmusiciangear/';
const g=JSON.parse(fs.readFileSync(B+'data/guides.json','utf8'));
const gu=g.find(x=>x.id==='beginner-bass-guitars');
console.log('found:', !!gu);
if(gu) console.log('headings:', gu.sections.map((x,i)=>i+':'+JSON.stringify(x.heading)).join(' | '));