const fs=require('fs');
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
// Check intro_es, sections content for common AI-sounding patterns
const patterns=[
  /es importante destacar/i,
  /cabe mencionar/i,
  /en cuanto a/i,
  /de hecho/i,
  /por su parte/i,
  /en términos de/i,
  /a nivel de/i,
  /dicho esto/i,
  /por lo tanto/i,
  /sin embargo/i,
  /no obstante/i,
  /asimismo/i,
  /del mismo modo/i,
  /en definitiva/i,
  /por último/i,
  /en primer lugar/i,
  /en segundo lugar/i,
  /en tercer lugar/i,
  /es fundamental/i,
  /es esencial/i,
  /es crucial/i,
  /resulta interesante/i,
  /vale la pena mencionar/i,
  /tiene sentido/i,
  /dar el salto/i,  // false friend "make the jump"
  /a la vanguardia/i,
  /de vanguardia/i,
  /pionero en/i,
  /revolucionar/i,
  /transformar/i,
  /potenciar/i,
  /maximizar/i,
  /optimizar/i,
];
let hits=0;
for(const guide of g){
  const check=(text, field)=>{ if(!text) return; for(const re of patterns){ if(re.test(text)){ console.log(`[${guide.id}] ${field}: "${text.substring(0,120)}..."`); hits++; break; } } };
  check(guide.intro_es, "intro_es");
  check(guide.conclusion_es, "conclusion_es");
  check(guide.verdict_es, "verdict_es");
  if(guide.sections){
    guide.sections.forEach((s,i)=>{ check(s.content_es||s.content, `sec[${i}]`); });
  }
}
console.log("Total pattern hits:", hits);
