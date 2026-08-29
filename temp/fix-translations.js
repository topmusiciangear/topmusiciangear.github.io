const fs=require('fs');
const file="data/guides.json";
let g=JSON.parse(fs.readFileSync(file,"utf8"));

// 1. budget-usb-mics
const usb=g.find(x=>x.id==="budget-usb-mics");
if(usb){
  // Fix intro: change from "deja el USB a un lado" to proper USB guide intro
  usb.intro_es = "¿Buscas un micrófono USB listo para conectar y grabar sin interfaz de audio? Esta guía cubre los 11 mejores micrófonos USB por menos de $100, probados para streaming, podcasting y home studio.";
  // Fix sections: replace "Por el " at start with "El " or "La "
  usb.sections.forEach(s=>{
    if(s.content_es){
      s.content_es = s.content_es.replace(/^<strong>Por el /gm, "<strong>El ")
                                 .replace(/^<strong>Por la /gm, "<strong>La ");
    }
  });
}

// 2. budget-mics
const bm=g.find(x=>x.id==="budget-mics");
if(bm){
  // Fix conclusion: "nueve" -> "19"
  bm.conclusion_es = bm.conclusion_es.replace(/los nueve mejores/gi, "los 19 mejores")
                                     .replace(/\bnueve\b/gi, "19");
  // Fix intro: proper XLR guide intro (not linking to USB)
  bm.intro_es = "¿Necesitas micrófonos XLR profesionales para tu interfaz de audio? Esta guía cubre los 19 mejores micrófonos XLR por menos de $200, desde dinámicos de escenario hasta condensadores de estudio.";
}

// 3. best-electric-under-500 (now best-basses under $700)
const bass=g.find(x=>x.id==="best-electric-under-500");
if(bass){
  bass.intro_es = "No necesitas gastar mucho para conseguir un gran bajo. Aquí están los 4 mejores bajos de Schecter, ESP, Hofner y Yamaha, cada uno con calidad increíble a su precio.";
  // Fix broken HTML in sections
  bass.sections.forEach(s=>{
    if(s.content_es){
      s.content_es = s.content_es
        .replace(/<p><strong><\/p><p>/g, "<p><strong>")
        .replace(/<\/p><p>/g, "");
    }
  });
}

// 4. budget-monitors
const bmon=g.find(x=>x.id==="budget-monitors");
if(bmon){
  bmon.intro_es = "No necesitas monitores caros para hacer grandes mezclas.";
  bmon.sections.forEach(s=>{
    if(s.content_es){
      s.content_es = s.content_es
        .replace(/monitores de para/g, "monitores para")
        .replace(/A cada uno \( el par\)/g, "A cada uno (el par)")
        .replace(/A el par/g, "Al par")
        .replace(/A cada uno/g, "A cada uno");
    }
  });
}

// 5. open-headphones
const ohp=g.find(x=>x.id==="open-headphones");
if(ohp){
  ohp.intro_es = ohp.intro_es.replace(/lo más parecido que he encontrado/, "lo más parecido a escuchar");
}

fs.writeFileSync(file, JSON.stringify(g,null,2));
console.log("DONE - translation fixes applied");
