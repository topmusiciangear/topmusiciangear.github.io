const fs=require('fs');
const file="data/guides.json";
let g=JSON.parse(fs.readFileSync(file,"utf8"));

const fixes={
  // Fix clear grammar errors: "A el par" -> "Al par"
  "best-monitors-for-small-rooms": {
    sec6: (t)=>t.replace(/A el par/g, "Al par"),
    sec8: (t)=>t.replace(/A el par/g, "Al par"),
  },
  // Fix "Tu interfaz" -> "La interfaz" where not addressing reader directly
  "starter-studio": {
    sec1: (t)=>t.replace(/Tu interfaz es el centro de comando\./, "La interfaz es el centro de comando."),
  },
  "pro-interfaces": {
    sec0: (t)=>t.replace(/Tu interfaz toca cada grabación que haces/, "La interfaz afecta cada grabación"),
  },
  // Fix awkward literal translations in budget-mics intro
  "budget-mics": {
    intro_es: (t)=>t.replace(/¿Necesitas micrófonos XLR profesionales para tu interfaz de audio\?/, "¿Buscas micrófonos XLR profesionales para tu interfaz de audio?"),
  },
  // Fix "resulta" filler in tracking-headphones
  "tracking-headphones": {
    sec1: (t)=>t.replace(/resulta así de esenciales\./, "son esenciales."),
  },
  // Fix "Tu interfaz" in budget-mics intro
  "budget-mics": {
    intro_es: (t)=>t.replace(/para tu interfaz de audio\?/, "para la interfaz de audio?"),
  },
  // Fix awkward "Tu" in best-interface verdict
  "best-interface": {
    verdict_es: (t)=>t.replace(/Elige la Scarlett 2i2 si tienes un presupuesto ajustado/, "La Scarlett 2i2 es ideal si el presupuesto es ajustado"),
  },
  // Fix "Usan" -> "Utilizan" / "Emplean" in best-microphone
  "best-microphone": {
    sec1: (t)=>t.replace(/Usan un diafragma electrificado/, "Utilizan un diafragma electrificado"),
  },
  // Fix "Los uso para grabar" -> "Se usan para grabar"
  "best-headphones": {
    sec1: (t)=>t.replace(/Se usan para grabar voces/, "Se usan para grabar voces"), // already fixed
  },
};

for(const [guideId, guideFixes] of Object.entries(fixes)){
  const guide=g.find(x=>x.id===guideId);
  if(!guide){console.log("NOT FOUND:",guideId); continue;}
  for(const [field, fn] of Object.entries(guideFixes)){
    if(field.startsWith("sec")){
      const idx=parseInt(field.replace("sec",""));
      if(guide.sections[idx] && guide.sections[idx].content_es){
        const before=guide.sections[idx].content_es;
        guide.sections[idx].content_es = fn(before);
        if(before!==guide.sections[idx].content_es) console.log("FIXED:",guideId,field);
      }
    }else if(guide[field]){
      const before=guide[field];
      guide[field] = fn(before);
      if(before!==guide[field]) console.log("FIXED:",guideId,field);
    }
  }
}

fs.writeFileSync(file, JSON.stringify(g,null,2));
console.log("DONE - translation fixes applied");
