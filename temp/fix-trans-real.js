const fs=require('fs');
const file="data/guides.json";
let g=JSON.parse(fs.readFileSync(file,"utf8"));

const fixes={
  "best-monitors-for-small-rooms": {
    sec6: (t)=>t.replace(/A el par/g, "Al par"),
    sec8: (t)=>t.replace(/A el par/g, "Al par"),
  },
  "best-headphones": {
    sec1: (t)=>t.replace(/Los uso para grabar voces/, "Se usan para grabar voces"),
    sec6: (t)=>t.replace(/es el estándar de oro moderno/, "es el estándar de referencia moderno"),
  },
  "tracking-headphones": {
    sec1: (t)=>t.replace(/son así de esenciales/, "resultan esenciales"),
  },
  "best-drum-machine": {
    conclusion_es: (t)=>t.replace(/es mi mejor elección/, "es la mejor opción").replace(/difícil de igualar/, "difícil de igualar"),
  },
  "best-samplers-drum-computers": {
    sec1: (t)=>t.replace(/he usado/, "se ha probado"),
  },
  "best-ribbon-mics": {
    verdict_es: (t)=>t.replace(/es el estándar de oro/, "es el estándar de referencia"),
  },
  "pro-headphones": {
    intro_es: (t)=>t.replace(/definen el rendimiento/, "marcan el rendimiento"),
    sec0: (t)=>t.replace(/marcan el estándar/, "establecen el estándar"),
    sec2: (t)=>t.replace(/El estándar de oro/, "El estándar de referencia"),
  },
  "pro-microphones": {
    intro_es: (t)=>t.replace(/es un micrófono revolucionario/, "es un micrófono innovador"),
    sec0: (t)=>t.replace(/representan la cúspide/, "representan la cima").replace(/el condensador de estudio más/, "un condensador de estudio de los más"),
    sec2: (t)=>t.replace(/Un micrófono revolucionario/, "Un micrófono innovador"),
  },
  "pro-interfaces": {
    sec0: (t)=>t.replace(/a nivel profesional/, "en entorno profesional"),
    sec2: (t)=>t.replace(/la legendaria estabilidad/, "la reconocida estabilidad"),
  },
  "pro-synths": {
    conclusion_es: (t)=>t.replace(/representan la cúspide/, "representan la cima").replace(/el sintetizador analógico más potente/, "uno de los sintetizadores analógicos más potentes"),
  },
  "pro-plugins": {
    sec1: (t)=>t.replace(/El estándar de oro/, "El estándar de referencia"),
  },
  "pro-mixers": {
    conclusion_es: (t)=>t.replace(/sirven a diferentes segmentos/, "cubren diferentes segmentos").replace(/es un mezclador ultracompacto/, "es un mezclador ultracompacto"),
    sec0: (t)=>t.replace(/a diferentes precios con diferentes fortalezas/, "a distintos precios con distintas fortalezas"),
  },
  "beat-making": {
    sec5: (t)=>t.replace(/es el estándar de oro/, "es el estándar de referencia"),
  },
  "best-amp-modelers": {
    sec0: (t)=>t.replace(/Decide entre captures y modelos/, "Elige entre captures y modelos"),
  },
  "best-reverb-delay": {
    sec4: (t)=>t.replace(/es la reverberación definitiva/, "es una reverberación de referencia"),
  },
  "best-digital-pianos": {
    sec0: (t)=>t.replace(/Los factores clave son/, "Los factores determinantes son"),
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
console.log("DONE - translation fixes applied");
