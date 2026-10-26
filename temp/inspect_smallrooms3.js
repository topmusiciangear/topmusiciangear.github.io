const fs=require('fs');
const g=JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json','utf8'));
const gu=g.find(x=>x.id==='best-monitors-for-small-rooms');
console.log('productTable.columns[0]:', JSON.stringify(gu.productTable.columns[0], null, 2).slice(0,800));
console.log('verdictProsCons[0]:', JSON.stringify(gu.verdictProsCons[0], null, 2).slice(0,800));
console.log('sections[0] keys:', Object.keys(gu.sections[0]));
console.log('sections[1] heading:', gu.sections[1].heading);
console.log('sections[1] keys:', Object.keys(gu.sections[1]));
console.log('score field? sections[1].score:', gu.sections[1].score);