const fs=require('fs');
const B='C:/Users/Daniel/projects/topmusiciangear/';
const g=JSON.parse(fs.readFileSync(B+'data/guides.json','utf8'));
const gu=g.find(x=>x.id==='beginner-bass-guitars');
const s=gu.sections.find(x=>x.heading==='');
console.log('empty section:', JSON.stringify(s).slice(0,300));
// find by id
console.log('sections headings:', gu.sections.map((x,i)=>i+':'+x.heading).join(' | '));