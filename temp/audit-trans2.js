const fs=require('fs');
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
// Check specific problematic patterns
const badPatterns=[
  /hace sentido/i,           // "make sense" -> "tiene sentido" is OK but "hace sentido" is literal
  /en orden a/i,             // "in order to" -> "para"
  /a tiempo/i,               // "on time" sometimes wrong
  /en la mano/i,             // "on hand" -> "disponible"
  /tomar una decisión/i,     // "make a decision" -> "tomar" is OK
  /dar una oportunidad/i,    // "give a chance" -> "dar" OK
  /hacer una diferencia/i,   // "make a difference" -> "marcar la diferencia"
  /tener lugar/i,            // "take place" -> "tener lugar" OK
  /poner atención/i,         // "pay attention" -> "prestar atención"
  /dar cuenta/i,             // "realize" -> "darse cuenta"
  /tomar en cuenta/i,        // "take into account" -> OK
  /en términos de/i,         // often AI filler
  /a nivel de/i,             // often AI filler
  /de hecho/i,               // often AI filler
  /es importante (destacar|señalar|mencionar)/i,
  /cabe (destacar|mencionar|señalar)/i,
  /resulta (que|importante|interesante|claro|evidente)/i,
  /vale la pena/i,
  /dar el salto/i,
  /a la vanguardia/i,
  /de vanguardia/i,
  /pionero en/i,
  /revolucionar/i,
  /transformar/i,
  /potenciar/i,
  /maximizar/i,
  /optimizar/i,
  /experiencia (de|inmersiva|premium|única)/i,
  /solución (integral|completa|definitiva)/i,
  /herramienta (poderosa|esencial|clave|fundamental)/i,
];
let hits=0;
for(const guide of g){
  const check=(text, field)=>{ if(!text) return; for(const re of badPatterns){ if(re.test(text)){ console.log(`[${guide.id}] ${field}: "${text.substring(0,150)}..."`); hits++; break; } } };
  check(guide.intro_es, "intro_es");
  check(guide.conclusion_es, "conclusion_es");
  check(guide.verdict_es, "verdict_es");
  if(guide.sections){
    guide.sections.forEach((s,i)=>{ check(s.content_es||s.content, `sec[${i}]`); });
  }
}
console.log("Total:", hits);
