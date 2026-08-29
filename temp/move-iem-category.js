const fs=require('fs');
const file="data/guides.json";
let g=JSON.parse(fs.readFileSync(file,"utf8"));

// Move existing IEM guides to new category "in_ear_monitors"
const iemIds=["ew-iem-g4-twin-vs-psm300","best-wireless-iems","ie900-vs-se846"];
for(const id of iemIds){
  const guide=g.find(x=>x.id===id);
  if(guide){
    guide.category="in_ear_monitors";
    console.log(`Moved ${id} to in_ear_monitors`);
  }
}

fs.writeFileSync(file, JSON.stringify(g,null,2));
console.log("DONE - categories updated");
