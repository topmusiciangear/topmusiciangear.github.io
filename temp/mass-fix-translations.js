const fs=require('fs');
const file="data/guides.json";
let g=JSON.parse(fs.readFileSync(file,"utf8"));

function fixText(t){
  if(!t) return t;
  let s=t;
  
  // Grammar: a el -> al, de el -> del
  s=s.replace(/\bA el\b/g, "Al").replace(/\bDE el\b/g, "Del")
    .replace(/\ba el\b/g, "al").replace(/\bde el\b/g, "del")
    .replace(/\bA el par\b/g, "Al par").replace(/\ba el par\b/g, "al par");
  
  // Remove literal "tu/tus" in technical contexts - make impersonal
  s=s.replace(/\bTu interfaz\b/g, "La interfaz")
    .replace(/\btu interfaz\b/g, "la interfaz")
    .replace(/\btu (micrófono|guitarra|bajo|teclado|controlador|DAW|setup|estudio|ordenador|equipo|sistema|casco|auriculares?|monitores?|altavoz|preamplificador|compresor|ecualizador|reverberación|delay|plugin|software|grabación|mezcla|masterización|sonido|tono)\b/gi, "el $1")
    .replace(/\btus (mezclas|grabaciones|necesidades|expectativas|oídos|manos|dedos|micrófonos|instrumentos|auriculares|monitores|altavoces|cables|plugins)\b/gi, "las $1")
    .replace(/\btus (micrófonos|instrumentos|auriculares|monitores|altavoces|cables)\b/gi, "los $1")
    .replace(/\bpara tu (estudio|setup|equipo|sistema|DAW|ordenador|sistema)\b/gi, "para la $1")
    .replace(/\ben tu (estudio|casa|ordenador|DAW|setup|equipo|sistema)\b/gi, "en el $1")
    .replace(/\bcon tu (micrófono|guitarra|bajo|teclado|controlador|auriculares?|interfaz|DAW)\b/gi, "con el $1")
    .replace(/\bde tu (estudio|micrófono|guitarra|sonido|tono|equipo|sistema)\b/gi, "del $1")
    .replace(/\ba tu (manera|forma|estilo|gusto|ritmo|necesidad|presupuesto|discreción)\b/gi, "a la $1")
    .replace(/\bpara tu (gusto|necesidad|presupuesto|estilo)\b/gi, "para el $1");
  
  // Filler phrases -> remove or simplify
  s=s.replace(/\bes importante (destacar|señalar|mencionar|notar|recordar|considerar|subrayar)\b/gi, "")
    .replace(/\bcabe (destacar|señalar|mencionar|recordar)\b/gi, "")
    .replace(/\bresulta (que|que es|importante|interesante|claro|evidente|fundamental|útil)\b/gi, "")
    .replace(/\bvale la pena\b/gi, "merece la pena")
    .replace(/\ba nivel de\b/gi, "en")
    .replace(/\ben términos de\b/gi, "en")
    .replace(/\bde hecho\b/gi, "en realidad")
    .replace(/\bpor lo tanto\b/gi, "por tanto")
    .replace(/\bsin embargo\b/gi, "pero")
    .replace(/\bno obstante\b/gi, "aun así")
    .replace(/\basimismo\b/gi, "también")
    .replace(/\bdel mismo modo\b/gi, "igualmente")
    .replace(/\ben definitiva\b/gi, "en resumen")
    .replace(/\bpor último\b/gi, "finalmente")
    .replace(/\ben primer lugar\b/gi, "primero")
    .replace(/\ben segundo lugar\b/gi, "segundo")
    .replace(/\bes (fundamental|esencial|crucial|vital|clave)\b/gi, "es $1")
    .replace(/\bresulta (que|que es|importante|interesante|claro|evidente|fundamental|útil)\b/gi, "");
  
  // Buzzwords -> natural Spanish
  s=s.replace(/\bestándar de oro\b/gi, "referencia")
    .replace(/\brevolucionario\b/gi, "innovador")
    .replace(/\bcúspide\b/gi, "cima")
    .replace(/\bde vanguardia\b/gi, "avanzado")
    .replace(/\ba la vanguardia\b/gi, "a la cabeza")
    .replace(/\bpionero en\b/gi, "líder en")
    .replace(/\brevolucionar\b/gi, "transformar")
    .replace(/\btransformar\b/gi, "cambiar")
    .replace(/\bpotenciar\b/gi, "mejorar")
    .replace(/\bmaximizar\b/gi, "aprovechar al máximo")
    .replace(/\boptimizar\b/gi, "optimizar")
    .replace(/\belevar\b/gi, "subir")
    .replace(/\bimpulsar\b/gi, "impulsar")
    .replace(/\bherramienta (poderosa|esencial|clave|fundamental|indispensable|imprescindible)\b/gi, "herramienta")
    .replace(/\bsolución (integral|completa|definitiva|ideal|perfecta)\b/gi, "solución")
    .replace(/\bexperiencia (inmersiva|premium|única|excepcional|de usuario)\b/gi, "experiencia")
    .replace(/\bsolución (integral|completa|definitiva|ideal|perfecta)\b/gi, "solución")
    .replace(/\brevolucionario\b/gi, "innovador")
    .replace(/\bgame.?changer/gi, "punto de inflexión")
    .replace(/\bgame.?changing/gi, "innovador")
    .replace(/\bstate.?of.?the.?art/gi, "última generación");
  
  // Anglicisms -> natural Spanish
  s=s.replace(/calidad.precio/gi, "relación calidad-precio")
    .replace(/punto dulce/gi, "punto óptimo")
    .replace(/flujo de trabajo/gi, "proceso")
    .replace(/diseño de sonido/gi, "diseño sonoro")
    .replace(/tocar en vivo/gi, "actuar en directo")
    .replace(/cambia lo que/gi, "cambia")
    .replace(/bajo control/gi, "controlado")
    .replace(/punto dulce/gi, "punto óptimo")
    .replace(/a tu manera/gi, "a tu modo");
  
  // False friends
  s=s.replace(/\bactualmente\b/gi, "en la actualidad")
    .replace(/\baplicación\b/gi, "app")
    .replace(/\beventualmente\b/gi, "finalmente")
    .replace(/\bexitoso\b/gi, "con éxito")
    .replace(/\bmasivo\b/gi, "a gran escala")
    .replace(/\brealizar\b/gi, "llevar a cabo")
    .replace(/\bsoportar\b/gi, "sostener");
  
  // Literal translations
  s=s.replace(/revela exactamente/gi, "muestra con precisión")
    .replace(/revelan lo que hay/gi, "muestran lo que hay")
    .replace(/entra en cualquier/gi, "funciona en cualquier")
    .replace(/cambia lo que/gi, "cambia")
    .replace(/tocar en vivo/gi, "actuar en directo")
    .replace(/diseño de sonido/gi, "diseño sonoro")
    .replace(/flujo de trabajo/gi, "proceso")
    .replace(/punto dulce/gi, "punto óptimo")
    .replace(/calidad.precio/gi, "relación calidad-precio")
    .replace(/punto dulce/gi, "punto óptimo")
    .replace(/tocar en vivo/gi, "actuar en directo");
  
  // Clean up double spaces and empty sentences
  s=s.replace(/\.\s*\./g, ".")
    .replace(/\s+/g, " ")
    .replace(/^\s*[.,;:]\s*/g, "")
    .replace(/\s*[.,;:]\s*$/g, "");
  
  return s;
}

function fixGuideText(g){
  const fields = ["intro_es", "conclusion_es", "verdict_es"];
  for(const f of fields){
    if(g[f]) g[f] = fixText(g[f]);
  }
  if(g.sections){
    for(const s of g.sections){
      if(s.content_es) s.content_es = fixText(s.content_es);
      if(s.title_es) s.title_es = fixText(s.title_es);
    }
  }
  return g;
}

let totalChanges=0;
for(const guide of g){
  const before = JSON.stringify(guide);
  fixGuideText(guide);
  const after = JSON.stringify(guide);
  if(before !== after) totalChanges++;
}

fs.writeFileSync(file, JSON.stringify(g,null,2));
console.log("Guides modified:", totalChanges);
