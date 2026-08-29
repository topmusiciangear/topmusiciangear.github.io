const fs=require('fs');
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));

const patterns = [
  {re: /A el par/gi, desc: "a el -> al"},
  {re: /Tu interfaz/gi, desc: "first person"},
  {re: /resulta así de esenciales/gi, desc: "resulta filler"},
  {re: /Usan un diafragma/gi, desc: "literal usan"},
  {re: /a nivel de/gi, desc: "filler"},
  {re: /en términos de/gi, desc: "filler"},
  {re: /es fundamental|es esencial|es crucial|es vital|es clave/gi, desc: "filler"},
  {re: /estándar de oro/gi, desc: "buzzword"},
  {re: /revolucionario/gi, desc: "buzzword"},
  {re: /flujo de trabajo/gi, desc: "anglicism workflow"},
  {re: /calidad.precio/gi, desc: "anglicism quality-price"},
  {re: /punto dulce/gi, desc: "anglicism sweet spot"},
  {re: /diseño de sonido/gi, desc: "anglicism sound design"},
  {re: /tocar en vivo/gi, desc: "anglicism play live"},
  {re: /calidad-precio/gi, desc: "anglicism quality/price"},
];

let totalHits = 0;
for(const guide of g){
  const check = (text, field) => {
    if(!text) return;
    for(const p of patterns){
      if(p.re.test(text)){
        console.log(`[${guide.id}] ${field} | ${p.desc}: "${text.substring(0,120).replace(/\n/g,' ')}..."`);
        totalHits++;
        break;
      }
    }
  };
  check(guide.intro_es, "intro_es");
  check(guide.conclusion_es, "conclusion_es");
  check(guide.verdict_es, "verdict_es");
  if(guide.sections){
    guide.sections.forEach((s,i)=>{ check(s.content_es||s.content, `sec[${i}]`); });
  }
}
console.log("Total remaining issues:", totalHits);
