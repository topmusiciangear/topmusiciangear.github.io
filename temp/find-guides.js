const fs=require('fs');
const g=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
const pats=[
  /USB econ|USB barat|11 mejor/i,
  /XLR.*\$\s?200|\$\s?200.*XLR|9 mejor/i,
  /bajos por menos|\$500.*baj|bass.*\$500/i,
  /monitor.*por menos de \$500|\$500.*monitor/i,
  /auricular.*abierto|open.handle|abierto: gu/i,
  /econ.micos por menos|por menos de \$100/i
];
for(const item of g){
  const t=item.title_es + ' || ' + item.title;
  const id=item.id||'';
  for(let i=0;i<pats.length;i++){
    if(pats[i].test(t)){ console.log(`${i} | ${id} | ${item.title} | ${item.title_es}`); break; }
  }
}
