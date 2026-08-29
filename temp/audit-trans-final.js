const fs=require('fs');
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));

// Specific bad patterns: false friends, literal translations, AI-sounding phrases
const patterns = [
  // False friends / literal translations
  {re: /hace sentido/gi, desc: "\"hace sentido\" (make sense) -> \"tiene sentido\""},
  {re: /en orden a/gi, desc: "\"en orden a\" (in order to) -> \"para\""},
  {re: /dar una oportunidad/gi, desc: "\"dar una oportunidad\" (give a chance) -> \"dar la oportunidad\""},
  {re: /hacer una diferencia/gi, desc: "\"hacer una diferencia\" (make a difference) -> \"marcar la diferencia\""},
  {re: /poner atención/gi, desc: "\"poner atención\" (pay attention) -> \"prestar atención\""},
  {re: /tomar una decisión/gi, desc: "\"tomar una decisión\" (make a decision) -> OK pero \"tomar\" suena literal"},
  {re: /dar cuenta/gi, desc: "\"dar cuenta\" (realize) -> \"darse cuenta\""},
  {re: /tener en mente/gi, desc: "\"tener en mente\" (have in mind) -> OK"},
  {re: /a largo plazo/gi, desc: "check context"},
  
  // AI-sounding filler phrases
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
  {re: /en tercer lugar/gi, desc: "filler"},
  {re: /es (fundamental|esencial|crucial|vital|clave)/gi, desc: "filler"},
  {re: /resulta (que|claro|evidente)/gi, desc: "filler"},
  
  // Marketing buzzwords that sound like AI
  {re: /experiencia (inmersiva|premium|única|excepcional)/gi, desc: "buzzword"},
  {re: /solución (integral|completa|definitiva|ideal)/gi, desc: "buzzword"},
  {re: /herramienta (poderosa|esencial|clave|fundamental|indispensable)/gi, desc: "buzzword"},
  {re: /(revolucionar|transformar|potenciar|maximizar|optimizar|eleva[rn])/gi, desc: "buzzword verb"},
  {re: /a la vanguardia/gi, desc: "buzzword"},
  {re: /de vanguardia/gi, desc: "buzzword"},
  {re: /pionero en/gi, desc: "buzzword"},
  {re: /cúspide/gi, desc: "buzzword"},
  {re: /estándar de oro/gi, desc: "buzzword"},
  {re: /cambia las reglas/gi, desc: "buzzword"},
  
  // First person / weird phrasing
  {re: /he encontrado/gi, desc: "first person"},
  {re: /en mi experiencia/gi, desc: "first person"},
  {re: /personalmente/gi, desc: "first person"},
  {re: /me parece/gi, desc: "first person"},
  
  // Grammar / awkward
  {re: /por de /gi, desc: "grammar error"},
  {re: /monitores de para/gi, desc: "grammar error"},
  {re: /a cada uno \( el par\)/gi, desc: "spacing"},
  {re: /A el par/gi, desc: "a el -> al"},
];

let totalHits = 0;
for(const guide of g){
  const check = (text, field) => {
    if(!text) return;
    for(const p of patterns){
      if(p.re.test(text)){
        console.log(`[${guide.id}] ${field} | ${p.desc}: "${text.substring(0,150).replace(/\n/g,' ')}..."`);
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
