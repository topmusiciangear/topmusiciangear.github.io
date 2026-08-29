const fs=require('fs');
const file="data/guides.json";
let g=JSON.parse(fs.readFileSync(file,"utf8"));

const fixes={
  "best-monitors-for-small-rooms": {
    sec6: (t)=>t.replace(/A el par/g, "Al par"),
    sec8: (t)=>t.replace(/A el par/g, "Al par"),
  },
  "best-microphone": {
    sec0: (t)=>t.replace(/Usan un diafragma/, "Utilizan un diafragma"),
  },
};

for(const [guideId, guideFixes] of Object.entries(fixes)){
  const guide=g.find(x=>x.id===guideId);
  if(!guide){console.log("NOT FOUND:",guideId); continue;}
  for(const [field, fn] of Object.entries(guideFixes)){
    if(field.startsWith("sec")){
      const idx=parseInt(field.replace("sec",""));
      if(guide.sections[idx] && guide.sections[idx].content_es){
        guide.sections[idx].content_es = fn(guide.sections[idx].content_es);
      }
    }
  }
}

fs.writeFileSync(file, JSON.stringify(g,null,2));
console.log("DONE");
