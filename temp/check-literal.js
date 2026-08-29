const fs=require('fs');
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));

const patterns = [
  // Literal translations from English
  {re: /\btu (interfaz|micrófono|guitarra|bajo|teclado|controlador|auriculares?|monitores?|altavoz|preamplificador|compresor|ecualizador|reverberación|delay|plugin|DAW|software|ordenador|estudio|grabación|mezcla|masterización|sonido|tone|tono)\b/gi, desc: "tu + noun (literal 'your')"},
  {re: /\b(tus|tus)\s+(micrófonos|instrumentos|auriculares|monitores|altavoces|cables|plugins|plugins|grabaciones|mezclas|canciones|temas)\b/gi, desc: "tus + plural (literal 'your')"},
  {re: /\b(en tu|para tu|con tu|desde tu|hacia tu)\s+(estudio|casa|habitación|ordenador|DAW|setup|equipo|sistema)\b/gi, desc: "en tu / para tu (literal 'in your')"},
  {re: /\b(a tu|de tu|por tu)\s+(manera|forma|estilo|gusto|necesidad|presupuesto)\b/gi, desc: "a tu / de tu (literal 'to your')"},
  {re: /\bresulta (que|que es|interesante|claro|evidente|útil|importante)\b/gi, desc: "resulta que/resulta interesante (filler)"},
  {re: /\bes importante (destacar|señalar|mencionar|notar|recordar|considerar)\b/gi, desc: "es importante destacar (filler)"},
  {re: /\bcabe (destacar|señalar|mencionar|recordar)\b/gi, desc: "cabe destacar (filler)"},
  {re: /\bvale la pena\b/gi, desc: "vale la pena (filler)"},
  {re: /\ba nivel de\b/gi, desc: "a nivel de (filler)"},
  {re: /\ben términos de\b/gi, desc: "en términos de (filler)"},
  {re: /\bde hecho\b/gi, desc: "de hecho (filler)"},
  {re: /\bpor lo tanto\b/gi, desc: "por lo tanto (filler)"},
  {re: /\bsin embargo\b/gi, desc: "sin embargo (filler)"},
  {re: /\bno obstante\b/gi, desc: "no obstante (filler)"},
  {re: /\basimismo\b/gi, desc: "asimismo (filler)"},
  {re: /\bdel mismo modo\b/gi, desc: "del mismo modo (filler)"},
  {re: /\ben definitiva\b/gi, desc: "en definitiva (filler)"},
  {re: /\bpor último\b/gi, desc: "por último (filler)"},
  {re: /\ben primer lugar\b/gi, desc: "en primer lugar (filler)"},
  {re: /\ben segundo lugar\b/gi, desc: "en segundo lugar (filler)"},
  {re: /\bes (fundamental|esencial|crucial|vital|clave)\b/gi, desc: "es fundamental/esencial (filler)"},
  {re: /\bexperiencia (inmersiva|premium|única|excepcional)\b/gi, desc: "buzzword"},
  {re: /\bsolución (integral|completa|definitiva|ideal)\b/gi, desc: "buzzword"},
  {re: /\bherramienta (poderosa|esencial|clave|fundamental|indispensable)\b/gi, desc: "buzzword"},
  {re: /\b(revolucionar|transformar|potenciar|maximizar|optimizar|elevar)\b/gi, desc: "buzzword verb"},
  {re: /\ba la vanguardia\b/gi, desc: "buzzword"},
  {re: /\bde vanguardia\b/gi, desc: "buzzword"},
  {re: /\bpionero en\b/gi, desc: "buzzword"},
  {re: /\bcúspide\b/gi, desc: "buzzword"},
  {re: /\bestándar de oro\b/gi, desc: "buzzword"},
  {re: /\brevolucionario\b/gi, desc: "buzzword"},
  {re: /\b(revelar|revela|revelan)\s+(exactamente|lo que hay)\b/gi, desc: "revela exactamente (literal reveal exactly)"},
  {re: /\b(entrar en|entra en)\s+(cualquier|todo)\b/gi, desc: "entra en cualquier (literal enter any)"},
  {re: /\b(cambia|change)\s+(lo que|lo que necesitas)\b/gi, desc: "cambia lo que (literal changes what)"},
  {re: /\b(tocar en vivo|toca en vivo)\b/gi, desc: "tocar en vivo (literal play live)"},
  {re: /\b(diseño de sonido|sound design)\b/gi, desc: "diseño de sonido (literal)"},
  {re: /\b(flujo de trabajo|workflow)\b/gi, desc: "flujo de trabajo (literal workflow)"},
  {re: /\b(punto dulce|sweet spot)\b/gi, desc: "punto dulce (literal sweet spot)"},
  {re: /\b(calidad-precio|quality-price)\b/gi, desc: "calidad-precio (literal)"},
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
