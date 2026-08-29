const fs=require('fs');
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));

// Deep audit: collect all Spanish texts with their guide id, field, and the exact problematic phrase
const patterns = [
  // False friends / literal translations
  {re: /\bactualmente\b/gi, cat: "false friend", note: "\"actualmente\" = currently, use \"en la actualidad\""},
  {re: /\baplicación\b/gi, cat: "false friend", note: "\"aplicación\" = application (job), use \"app\" or \"solicitud\""},
  {re: /\bcarácter\b/gi, cat: "false friend", note: "\"carácter\" = character (person), use \"carácter\" only for personality"},
  {re: /\bcompromiso\b/gi, cat: "false friend", note: "\"compromiso\" = commitment, use \"compromiso\" OK for obligation"},
  {re: /\bdisponible\b/gi, cat: "literal", note: "often overused, use \"disponible\" sparingly"},
  {re: /\beventualmente\b/gi, cat: "false friend", note: "\"eventualmente\" = possibly, use \"finalmente\" or \"al final\""},
  {re: /\bexitoso\b/gi, cat: "false friend", note: "\"exitoso\" = successful (person), use \"con éxito\" for things"},
  {re: /\bmasivo\b/gi, cat: "false friend", note: "\"masivo\" = massive, use \"en masa\" or \"a gran escala\""},
  {re: /\boportunidad\b/gi, cat: "literal", note: "overused for \"chance\""},
  {re: /\bpreliminar\b/gi, cat: "literal", note: "often \"preliminary\""},
  {re: /\brealizar\b/gi, cat: "false friend", note: "\"realizar\" = to realize (understand), use \"llevar a cabo\" or \"hacer\""},
  {re: /\bservicio\b/gi, cat: "literal", note: "overused for \"service\""},
  {re: /\bsoportar\b/gi, cat: "false friend", note: "\"soportar\" = tolerate, use \"sostener\" or \"admitir\" for support"},
  {re: /\btráfico\b/gi, cat: "literal", note: "\"traffic\" web = \"tráfico\" OK"},
  
  // Awkward literal translations
  {re: /en orden a/gi, cat: "literal", fix: "para"},
  {re: /a nivel de/gi, cat: "filler", fix: "en / en el ámbito de"},
  {re: /en términos de/gi, cat: "filler", fix: "en / sobre"},
  {re: /dar una oportunidad/gi, cat: "literal", fix: "dar la oportunidad / brindar la oportunidad"},
  {re: /hacer una diferencia/gi, cat: "literal", fix: "marcar la diferencia / marcar diferencia"},
  {re: /poner atención/gi, cat: "literal", fix: "prestar atención"},
  {re: /dar cuenta/gi, cat: "literal", fix: "darse cuenta / percatarse"},
  {re: /tomar una decisión/gi, cat: "literal", fix: "tomar una decisión OK / decidirse"},
  {re: /hacer sentido/gi, cat: "literal", fix: "tener sentido"},
  {re: /en la mano/gi, cat: "literal", fix: "disponible / a mano"},
  {re: /bajo control/gi, cat: "literal", fix: "controlado"},
  {re: /en mente/gi, cat: "literal", fix: "en mente OK / presente"},
  {re: /a tiempo/gi, cat: "literal", fix: "puntual / a tiempo OK"},
  {re: /por supuesto/gi, cat: "filler", fix: "claro / desde luego"},
  {re: /al final del día/gi, cat: "literal", fix: "al final / en definitiva"},
  {re: /punto de vista/gi, cat: "literal", fix: "perspectiva / óptica"},
  {re: /en cuanto a/gi, cat: "filler", fix: "sobre / respecto a"},
  {re: /con respecto a/gi, cat: "filler", fix: "respecto a / sobre"},
  {re: /en cuanto al/gi, cat: "filler", fix: "sobre el / en cuanto al OK"},
  
  // AI-sounding filler phrases
  {re: /es importante (destacar|señalar|mencionar|notar|recordar|considerar|subrayar)\b/gi, cat: "filler"},
  {re: /cabe (destacar|señalar|mencionar|recordar)\b/gi, cat: "filler"},
  {re: /resulta (que|que es|importante|interesante|claro|evidente|fundamental|útil)\b/gi, cat: "filler"},
  {re: /vale la pena\b/gi, cat: "filler"},
  {re: /a nivel de\b/gi, cat: "filler"},
  {re: /en términos de\b/gi, cat: "filler"},
  {re: /\bde hecho\b/gi, cat: "filler"},
  {re: /\bpor lo tanto\b/gi, cat: "filler"},
  {re: /\bsin embargo\b/gi, cat: "filler"},
  {re: /\bno obstante\b/gi, cat: "filler"},
  {re: /\basimismo\b/gi, cat: "filler"},
  {re: /del mismo modo\b/gi, cat: "filler"},
  {re: /\ben definitiva\b/gi, cat: "filler"},
  {re: /\bpor último\b/gi, cat: "filler"},
  {re: /\ben primer lugar\b/gi, cat: "filler"},
  {re: /\ben segundo lugar\b/gi, cat: "filler"},
  {re: /\bes (fundamental|esencial|crucial|vital|clave)\b/gi, cat: "filler"},
  {re: /resulta (que|que es|importante|interesante|claro|evidente|fundamental|útil)\b/gi, cat: "filler"},
  
  // AI buzzwords
  {re: /experiencia (inmersiva|premium|única|excepcional|de usuario)\b/gi, cat: "buzzword"},
  {re: /solución (integral|completa|definitiva|ideal|perfecta)\b/gi, cat: "buzzword"},
  {re: /herramienta (poderosa|esencial|clave|fundamental|indispensable|imprescindible)\b/gi, cat: "buzzword"},
  {re: /\b(revolucionar|transformar|potenciar|maximizar|optimizar|elevar|impulsar)\b/gi, cat: "buzzword verb"},
  {re: /a la vanguardia\b/gi, cat: "buzzword"},
  {re: /de vanguardia\b/gi, cat: "buzzword"},
  {re: /pionero en\b/gi, cat: "buzzword"},
  {re: /\bcúspide\b/gi, cat: "buzzword"},
  {re: /estándar de oro\b/gi, cat: "buzzword"},
  {re: /\brevolucionario\b/gi, cat: "buzzword"},
  {re: /game.changer/gi, cat: "anglicism"},
  {re: /game.changing/gi, cat: "anglicism"},
  {re: /state.of.the.art/gi, cat: "anglicism"},
  
  // Literal English phrasing
  {re: /en tu\s+(estudio|casa|habitación|ordenador|DAW|setup|equipo|sistema|casco|micrófono|guitarra|bajo|teclado|controlador|auriculares?|monitores?|altavoz|preamplificador|interfaz)\b/gi, cat: "literal 'in your'"},
  {re: /para tu\s+(estudio|casa|habitación|ordenador|DAW|setup|equipo|sistema)\b/gi, cat: "literal 'for your'"},
  {re: /con tu\s+(micrófono|guitarra|bajo|teclado|controlador|auriculares?|interfaz|DAW)\b/gi, cat: "literal 'with your'"},
  {re: /tus\s+(mezclas|grabaciones|canciones|temas|auriculares|monitores|altavoces|cables|plugins|grabaciones|necesidades|expectativas)\b/gi, cat: "literal 'your'"},
  {re: /a tu\s+(manera|forma|estilo|gusto|ritmo|necesidad|presupuesto|discreción)\b/gi, cat: "literal 'your'"},
  {re: /de tu\s+(estudio|casa|equipo|sistema|micrófono|guitarra|sonido|tono)\b/gi, cat: "literal 'of your'"},
  {re: /para tu\s+(gusto|necesidad|presupuesto|estilo)\b/gi, cat: "literal 'for your'"},
  
  // Literal verb translations
  {re: /revela exactamente/gi, cat: "literal 'reveals exactly'"},
  {re: /revelan lo que hay/gi, cat: "literal 'reveal what\'s there'"},
  {re: /entra en cualquier/gi, cat: "literal 'enter any'"},
  {re: /cambia lo que/gi, cat: "literal 'changes what'"},
  {re: /tocar en vivo/gi, cat: "literal 'play live'"},
  {re: /diseño de sonido\b/gi, cat: "literal 'sound design'"},
  {re: /flujo de trabajo\b/gi, cat: "literal 'workflow'"},
  {re: /punto dulce\b/gi, cat: "anglicism 'sweet spot'"},
  {re: /calidad.precio/gi, cat: "anglicism 'quality/price'"},
  {re: /punto dulce/gi, cat: "anglicism 'sweet spot'"},
  
  // Grammar errors
  {re: /A el par/gi, cat: "grammar", fix: "Al par"},
  {re: /A el /gi, cat: "grammar", fix: "Al "},
  {re: /De el /gi, cat: "grammar", fix: "Del "},
  {re: /Tu interfaz\b/gi, cat: "literal 'your interface'"},
  {re: /Tu (micrófono|guitarra|bajo|teclado|ordenador|setup|estudio)\b/gi, cat: "literal 'your'"},
  {re: /tus (mezclas|grabaciones|necesidades|expectativas|oídos|manos|dedos)\b/gi, cat: "literal 'your'"},
  {re: /para tu (estudio|setup|equipo|sistema|DAW|ordenador)\b/gi, cat: "literal 'for your'"},
  {re: /en tu (estudio|casa|ordenador|DAW|setup|equipo)\b/gi, cat: "literal 'in your'"},
  
  // Overused filler
  {re: /es importante (destacar|señalar|mencionar|notar|recordar|considerar|subrayar)\b/gi, cat: "filler"},
  {re: /cabe (destacar|señalar|mencionar|recordar)\b/gi, cat: "filler"},
  {re: /resulta (que|que es|importante|interesante|claro|evidente|fundamental|útil)\b/gi, cat: "filler"},
  {re: /vale la pena\b/gi, cat: "filler"},
  {re: /a nivel de\b/gi, cat: "filler"},
  {re: /en términos de\b/gi, cat: "filler"},
  {re: /\bde hecho\b/gi, cat: "filler"},
  {re: /\bpor lo tanto\b/gi, cat: "filler"},
  {re: /\bsin embargo\b/gi, cat: "filler"},
  {re: /\bno obstante\b/gi, cat: "filler"},
  {re: /\basimismo\b/gi, cat: "filler"},
  {re: /del mismo modo\b/gi, cat: "filler"},
  {re: /\ben definitiva\b/gi, cat: "filler"},
  {re: /\bpor último\b/gi, cat: "filler"},
  {re: /\ben primer lugar\b/gi, cat: "filler"},
  {re: /\ben segundo lugar\b/gi, cat: "filler"},
  {re: /\bes (fundamental|esencial|crucial|vital|clave)\b/gi, cat: "filler"},
  {re: /resulta (que|que es|importante|interesante|claro|evidente|fundamental|útil)\b/gi, cat: "filler"},
  
  // Buzzwords
  {re: /experiencia (inmersiva|premium|única|excepcional|de usuario)\b/gi, cat: "buzzword"},
  {re: /solución (integral|completa|definitiva|ideal|perfecta)\b/gi, cat: "buzzword"},
  {re: /herramienta (poderosa|esencial|clave|fundamental|indispensable|imprescindible)\b/gi, cat: "buzzword"},
  {re: /\b(revolucionar|transformar|potenciar|maximizar|optimizar|elevar|impulsar)\b/gi, cat: "buzzword verb"},
  {re: /a la vanguardia\b/gi, cat: "buzzword"},
  {re: /de vanguardia\b/gi, cat: "buzzword"},
  {re: /pionero en\b/gi, cat: "buzzword"},
  {re: /\bcúspide\b/gi, cat: "buzzword"},
  {re: /estándar de oro\b/gi, cat: "buzzword"},
  {re: /\brevolucionario\b/gi, cat: "buzzword"},
  {re: /game.changer/gi, cat: "anglicism"},
  {re: /game.changing/gi, cat: "anglicism"},
  {re: /state.of.the.art/gi, cat: "anglicism"},
  {re: /best.in.class/gi, cat: "anglicism"},
];

let totalHits = 0;
const issues = [];

for(const guide of g){
  const check = (text, field) => {
    if(!text) return;
    for(const p of patterns){
      const match = text.match(p.re);
      if(match){
        issues.push({
          guide: guide.id,
          field,
          category: p.cat,
          match: match[0],
          context: text.substring(Math.max(0, match.index-40), match.index + match[0].length + 60).replace(/\n/g,' ').trim(),
          fix: p.fix || ""
        });
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

// Group by category
const byCat = {};
for(const i of issues){
  (byCat[i.category] = byCat[i.category] || []).push(i);
}

console.log("=== DEEP SPANISH TRANSLATION AUDIT ===");
console.log("Total issues:", totalHits);
console.log("\n=== BY CATEGORY ===");
for(const [cat, arr] of Object.entries(byCat)){
  console.log(`\n${cat.toUpperCase()} (${arr.length}):`);
  // Show unique matches per category
  const uniq = [...new Map(arr.map(x => [x.match, x])).values()];
  uniq.slice(0, 10).forEach(x => console.log(`  "${x.match}" in ${x.guide}.${x.field}: ${x.context.substring(0,100)}...`));
  if(arr.length > 10) console.log(`  ... and ${arr.length - 10} more`);
}

console.log("\n=== TOP OFFENDING GUIDES ===");
const byGuide = {};
for(const i of issues){ (byGuide[i.guide] = byGuide[i.guide] || []).push(i); }
const sorted = Object.entries(byGuide).sort((a,b)=>b[1].length-a[1].length);
sorted.slice(0,15).forEach(([g, arr])=>console.log(`  ${g}: ${arr.length} issues`));
