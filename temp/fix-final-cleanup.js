const fs=require('fs');
const file="data/guides.json";
let g=JSON.parse(fs.readFileSync(file,"utf8"));

function fixText(t){
  if(!t) return t;
  let s=t;
  
  // Fix "relación relación" duplicates
  s=s.replace(/relación relación relación calidad.precio/gi, "relación calidad-precio")
    .replace(/relación relación calidad.precio/gi, "relación calidad-precio")
    .replace(/relación calidad.precio/gi, "relación calidad-precio")
    .replace(/relación relación calidad\/precio/gi, "relación calidad-precio")
    .replace(/relación calidad\/precio/gi, "relación calidad-precio")
    .replace(/relación calidad.precio/gi, "relación calidad-precio");
  
  // Fix "A el par" -> "Al par"
  s=s.replace(/A el par/gi, "Al par").replace(/a el par/gi, "al par");
  
  // Fix remaining filler "es clave" etc
  s=s.replace(/\bes (clave|fundamental|esencial|crucial|vital)\b/gi, "es $1");
  
  // Fix filler "sin embargo" -> "pero"
  s=s.replace(/\bsin embargo\b/gi, "pero");
  
  // Fix "a el" -> "al"
  s=s.replace(/\bA el\b/g, "Al").replace(/\ba el\b/g, "al")
    .replace(/\bDE el\b/g, "Del").replace(/\bde el\b/g, "del");
  
  // Clean up
  s=s.replace(/\s+/g, " ").trim();
  return s;
}

function fixGuide(g){
  ["intro_es","conclusion_es","verdict_es"].forEach(f=>{ if(g[f]) g[f]=fixText(g[f]); });
  if(g.sections){
    g.sections.forEach(s=>{ if(s.content_es) s.content_es=fixText(s.content_es); if(s.title_es) s.title_es=fixText(s.title_es); });
  }
  return g;
}

let c=0;
for(const guide of g){
  const b=JSON.stringify(guide);
  fixGuide(guide);
  if(b!==JSON.stringify(guide)) c++;
}
fs.writeFileSync("data/guides.json", JSON.stringify(g,null,2));
console.log("Modified:", c);
