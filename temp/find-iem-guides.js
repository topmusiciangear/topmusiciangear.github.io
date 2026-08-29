const fs=require('fs');
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));

// Find the IEM guides
const iemIds=["ew-iem-g4-vs-psm300","wireless-iems","ie900-vs-se846"];
for(const id of iemIds){
  const guide=g.find(x=>x.id===id);
  if(guide){
    console.log(`${id}: category="${guide.category}" | title_es="${guide.title_es}"`);
  }else{
    console.log(`${id}: NOT FOUND`);
  }
}
