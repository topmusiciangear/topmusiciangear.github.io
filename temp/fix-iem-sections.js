const fs=require("fs");
const file="data/guides.json";
let g=JSON.parse(fs.readFileSync(file,"utf8"));

const guide=g.find(x=>x.id==="best-in-ear-monitors");
if(guide){
  // Fix sections - add content to empty sections or remove them
  guide.sections = guide.sections.map(s=>{
    if((!s.products || s.products.length===0) && (!s.content_es && !s.content)){
      // Add placeholder content
      return {
        ...s,
        content_es: "<p>Esta sección está en desarrollo. Pronto añadiremos más modelos y comparativas detalladas.</p>",
        content: "<p>This section is under development. More models and detailed comparisons coming soon.</p>"
      };
    }
    return s;
  });
  fs.writeFileSync("data/guides.json", JSON.stringify(g,null,2));
  console.log("FIXED - added placeholder content to empty sections");
}
