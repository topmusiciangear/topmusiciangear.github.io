const fs=require("fs");
const file="data/guides.json";
let g=JSON.parse(fs.readFileSync(file,"utf8"));

const guide=g.find(x=>x.id==="best-in-ear-monitors");
if(guide){
  guide.sections = guide.sections.map(s=>{
    if(!s.content_es){
      s.content_es = "<p>En esta sección presentamos los modelos más destacados de esta categoría.</p>";
    }
    if(!s.content){
      s.content = "<p>This section presents the standout models in this category.</p>";
    }
    return s;
  });
  fs.writeFileSync(file, JSON.stringify(g,null,2));
  console.log("FIXED - added content to all sections");
}
