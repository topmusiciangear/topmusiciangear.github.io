const fs=require('fs');
const file="data/guides.json";
let g=JSON.parse(fs.readFileSync(file,"utf8"));

const fixes={
  "best-monitors-for-small-rooms": {
    sec6: (t)=>t.replace(/A el par/g, "Al par"),
    sec8: (t)=>t.replace(/A el par/g, "Al par"),
  },
  "starter-studio": {
    sec1: (t)=>t.replace(/Tu interfaz es el centro de comando\./, "La interfaz es el centro de comando."),
  },
  "pro-interfaces": {
    sec0: (t)=>t.replace(/Tu interfaz toca cada grabación/, "La interfaz afecta cada grabación"),
  },
  "tracking-headphones": {
    sec1: (t)=>t.replace(/resulta así de esenciales\./, "son esenciales."),
  },
  "best-interface": {
    verdict_es: (t)=>t.replace(/Elige la Scarlett 2i2 si tienes un presupuesto ajustado/, "La Scarlett 2i2 es ideal si el presupuesto es ajustado"),
  },
  "best-microphone": {
    sec1: (t)=>t.replace(/Usan un diafragma electrificado/, "Utilizan un diafragma electrificado"),
  },
  "budget-mics": {
    intro_es: (t)=>t.replace(/¿Necesitas micrófonos XLR profesionales para tu interfaz de audio\?/, "¿Buscas micrófonos XLR profesionales para la interfaz de audio?")
                .replace(/para tu interfaz de audio/, "para la interfaz de audio"),
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
    }else if(guide[field]){
      guide[field] = fn(guide[field]);
    }
  }
}

fs.writeFileSync(file, JSON.stringify(g,null,2));
console.log("DONE - final translation fixes applied");
