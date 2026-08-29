const fs=require('fs');
const guides=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const patterns = [
  {re: /A el par/gi, desc: "a el -> al"},
  {re: /relación relación/gi, desc: "duplicate"},
  {re: /Tu interfaz/gi, desc: "first person"},
  {re: /a nivel de/gi, desc: "filler"},
  {re: /en términos de/gi, desc: "filler"},
  {re: /sin embargo/gi, desc: "filler"},
  {re: /es (fundamental|esencial|crucial|vital|clave)\b/gi, desc: "filler"},
  {re: /estándar de oro/gi, desc: "buzzword"},
  {re: /revolucionario/gi, desc: "buzzword"},
  {re: /flujo de trabajo/gi, desc: "anglicism workflow"},
  {re: /calidad.precio/gi, desc: "anglicism"},
  {re: /punto dulce/gi, desc: "anglicism"},
  {re: /diseño de sonido/gi, desc: "anglicism"},
];
let h=0;
for(const guide of guides){
  const c=(t,f)=>{if(!t)return;for(const p of patterns){if(p.re.test(t)){console.log(`[${guide.id}] ${f}|${p.desc}: "${t.substring(0,100)}"`);h++;break;}}};
  c(guide.intro_es,"intro");c(guide.conclusion_es,"concl");c(guide.verdict_es,"verd");
  guide.sections?.forEach((s,i)=>c(s.content_es,s.title_es||"sec"+i));
}
console.log("Total:",h);
