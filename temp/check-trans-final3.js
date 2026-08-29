const fs=require('fs');
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));

const patterns = [
  {re: /a el par/gi, desc: "a el -> al"},
  {re: /tu interfaz/gi, desc: "first person"},
  {re: /he encontrado/gi, desc: "first person"},
  {re: /en mi experiencia/gi, desc: "first person"},
  {re: /personalmente/gi, desc: "first person"},
  {re: /me parece/gi, desc: "first person"},
  {re: /es importante (destacar|señalar|mencionar|notar)/gi, desc: "filler"},
  {re: /cabe (destacar|señalar|mencionar)/gi, desc: "filler"},
  {re: /resulta (que|importante|interesante|claro|evidente|fundamental)/gi, desc: "filler"},
  {re: /vale la pena/gi, desc: "filler"},
  {re: /a nivel de/gi, desc: "filler"},
  {re: /en términos de/gi, desc: "filler"},
  {re: /de hecho/gi, desc: "filler"},
  {re: /por lo tanto/gi, desc: "filler"},
  {re: /sin embargo/gi, desc: "filler"},
  {re: /no obstante/gi, desc: "filler"},
  {re: /asimismo/gi, desc: "filler"},
  {re: /del mismo modo/gi, desc: "filler"},
  {re: /en definitiva/gi, desc: "filler"},
  {re: /por último/gi, desc: "filler"},
  {re: /en primer lugar/gi, desc: "filler"},
  {re: /en segundo lugar/gi, desc: "filler"},
  {re: /es (fundamental|esencial|crucial|vital|clave)/gi, desc: "filler"},
  {re: /experiencia (inmersiva|premium|única|excepcional)/gi, desc: "buzzword"},
  {re: /solución (integral|completa|definitiva|ideal)/gi, desc: "buzzword"},
  {re: /herramienta (poderosa|esencial|clave|fundamental|indispensable)/gi, desc: "buzzword"},
  {re: /(revolucionar|transformar|potenciar|maximizar|optimizar|eleva[rn])/gi, desc: "buzzword verb"},
  {re: /a la vanguardia/gi, desc: "buzzword"},
  {re: /de vanguardia/gi, desc: "buzzword"},
  {re: /pionero en/gi, desc: "buzzword"},
  {re: /cúspide/gi, desc: "buzzword"},
  {re: /estándar de oro/gi, desc: "buzzword"},
  {re: /revolucionario/gi, desc: "buzzword"},
  {re: /por de /gi, desc: "grammar error"},
  {re: /monitores de para/gi, desc: "grammar error"},
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
console.log("Total hits:", totalHits);
