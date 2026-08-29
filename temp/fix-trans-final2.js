const fs=require('fs');
const file="data/guides.json";
let g=JSON.parse(fs.readFileSync(file,"utf8"));

const fixes={
  // Fix remaining "A el par" -> "Al par"
  "best-monitors-for-small-rooms": {
    sec6: (t)=>t.replace(/A el par/g, "Al par"),
    sec8: (t)=>t.replace(/A el par/g, "Al par"),
  },
  // Fix first person -> impersonal
  "starter-studio": {
    sec1: (t)=>t.replace(/Tu interfaz es el centro de comando\./, "La interfaz es el centro de comando."),
  },
  "tracking-headphones": {
    sec1: (t)=>t.replace(/resulta así de esenciales\./, "resultan esenciales."),
  },
  "best-drum-machine": {
    conclusion_es: (t)=>t.replace(/es la mejor opción/, "es la opción recomendada"),
  },
  // Fix "estándar de oro" -> "estándar de referencia" in remaining
  "best-headphones": {
    sec1: (t)=>t.replace(/es el estándar de oro para monitoreo cerrado\./, "es el estándar de referencia para monitoreo cerrado."),
    sec6: (t)=>t.replace(/el estándar de oro científico/, "el estándar científico de referencia"),
  },
  "pro-headphones": {
    intro_es: (t)=>t.replace(/que marcan el rendimiento/, "que definen el rendimiento"),
    sec0: (t)=>t.replace(/establecen el estándar\./, "marcan la pauta."),
  },
  "vocal-plugins": {
    sec1: (t)=>t.replace(/es el estándar de oro/, "es el estándar de referencia"),
  },
  "best-reverb-delay": {
    sec4: (t)=>t.replace(/es una reverberación de referencia/, "es una reverberación de referencia profesional"),
  },
  "xr18-vs-cq18t": {
    verdict_es: (t)=>t.replace(/ha sido el estándar durante años/, "ha sido la referencia durante años"),
  },
  "pro-plugins": {
    sec1: (t)=>t.replace(/El estándar de oro/, "El estándar de referencia"),
  },
  "best-ribbon-mics": {
    verdict_es: (t)=>t.replace(/es el estándar de oro/, "es el estándar de referencia"),
  },
  // Fix buzzword verbs
  "guitar-bass-amps": {
    sec0: (t)=>t.replace(/Los amplificadores de tubo producen distorsión armónica cuando se/, "Los amplificadores de tubo generan distorsión armónica al"),
  },
  "dxr-vs-prx": {
    sec1: (t)=>t.replace(/es un sistema PA todo-en-uno revolucionario\./, "es un sistema PA todo-en-uno innovador."),
    sec3: (t)=>t.replace(/Si necesitas un altavoz autoamplificado tradicional que se integre con sistemas PA existentes y escale para eventos más grandes/, "Si buscas un altavoz autoamplificado tradicional que se integre con sistemas PA existentes y escale para eventos mayores"),
  },
  "pro-microphones": {
    sec0: (t)=>t.replace(/representan la cima del diseño/, "representan lo mejor del diseño"),
    sec2: (t)=>t.replace(/Un micrófono innovador de doble circuito/, "Un micrófono de doble circuito innovador"),
  },
  "pro-mixers": {
    conclusion_es: (t)=>t.replace(/sirven a diferentes segmentos/, "cubren distintos segmentos").replace(/es un mezclador ultracompacto/, "es un mezclador ultracompacto"),
    sec0: (t)=>t.replace(/a distintos precios con distintas fortalezas/, "a distintos precios con diferentes fortalezas"),
  },
  "best-amp-modelers": {
    sec0: (t)=>t.replace(/Elige entre captures y modelos/, "Elige entre captures y modelado"),
  },
  "best-reverb-delay": {
    sec4: (t)=>t.replace(/es una reverberación de referencia para profesionales/, "es una reverberación de referencia para uso profesional"),
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
