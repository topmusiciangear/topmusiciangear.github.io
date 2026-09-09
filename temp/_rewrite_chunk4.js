const fs = require("fs");
const guides = require("C:/Users/Daniel/projects/topmusiciangear/data/guides.json");

const myIds = ["active-vs-passive-pa","beat-making","best-analog-mixers","best-condenser-mics","best-electric-guitars-2026","best-instrument-mics","best-mic-for-guitar-amps","best-pa-speakers","best-samplers-drum-computers","budget-mics","daw-guide","fabfilter-vs-ozone","guitar-pedals","kh750-vs-7050c","midi-keyboards","pro-basses","pro-live-sound","pro-tools-vs-cubase","sm57-vs-md421","starter-studio","ts9-vs-bd2"];

const myGuides = guides.filter(g => myIds.includes(g.id));
const result = [];
let totalFixes = 0;
let enFixes = 0;
let esFixes = 0;

function processGuide(guide) {
  const g = JSON.parse(JSON.stringify(guide));
  let fixes = 0;
  let enf = 0;
  let esf = 0;

  function replace(path, field, search, replace) {
    const parts = path.split(".");
    let obj = g;
    for (const p of parts) {
      const m = p.match(/^(\w+)\[(\d+)\]$/);
      if (m) { obj = obj[m[1]][parseInt(m[2])]; }
      else { obj = obj[p]; }
    }
    if (typeof obj[field] === "string") {
      if (obj[field].includes(search)) {
        obj[field] = obj[field].replace(search, replace);
        fixes++;
        if (field.endsWith("_es")) esf++;
        else enf++;
      }
    }
  }

  // ==================== STARTER STUDIO ====================
  if (g.id === "starter-studio") {
    replace("sections.4", "content", "the straightforward industry standard that reveals every", "the reference monitors that reveal every");
    replace("verdictProsCons.0", "pros.0", "studio-grade conversion", "conversion you\u2019d normally find in higher-end interfaces");
    replace("verdictProsCons.4", "pros.1", "Studio-grade preamps with plenty of clean gain for dynamics", "Preamps with plenty of clean gain for dynamics");
    replace("verdictProsCons.6", "pros.0", "Proven broadcast standard since 1991", "Broadcast reference since 1991");
    replace("verdictProsCons.7", "pros.0", "Straightforward industry standard that reveals every flaw in your mix", "Flat, honest response that reveals every flaw in your mix");
    replace("sections.4", "content_es", "el estándar de la industria que revela cada defecto", "los monitores de referencia que revelan cada defecto");
    replace("verdictProsCons.7", "pros_es.0", "Estándar de la industria directo que revela cada defecto de tu mezcla", "Directo y sin adornos, revela cada defecto de tu mezcla");
  }

  // ==================== BUDGET MICS ====================
  if (g.id === "budget-mics") {
    replace("intro", null, "bulletproof dynamics", "road-tested dynamics");
    replace("verdict", null, "the versatile studio workhorse with", "the versatile studio option with");
    replace("verdictProsCons.18", "pros.1", "than the standard SM58", "than the SM58");
    replace("verdictProsCons.22", "cons.2", "Heavier than standard dynamics", "Heavier than typical dynamics");
    replace("intro_es", null, "a prueba de balas", "resistentes");
    replace("verdict_es", null, "el caballo de batalla versátil", "la opción versátil para estudio");
  }

  // ==================== BEST CONDENSER MICS ====================
  if (g.id === "best-condenser-mics") {
    replace("intro_es", null, "Los micrófonos de nivel profesional", "Los micrófonos de gama alta");
    replace("verdict", null, "the vocal mic that sets the standard", "the vocal mic every other condenser gets measured against");
    replace("productTable.rows.0", "values.0.value", "The studio standard vocal", "The reference condenser for vocals");
    replace("sections.2", "content", "essential for ribbon-style techniques", "key for ribbon-style techniques");
  }

  // ==================== GUITAR PEDALS ====================
  if (g.id === "guitar-pedals") {
    replace("sections.0", "heading", "Essential Pedal Categories", "The Four Pedal Categories Every Player Needs");
    replace("sections.0", "content", "is the standard for fast, accurate tuning", "is the go-to for fast, accurate tuning");
    replace("featuredSnippet", "faq_a3_en", "it is the standard for a reason", "it does the job well and that\u2019s why it sells");
    replace("featuredSnippet", "faq_a4_en", "the essential wah that defined the sound of rock gui", "the wah pedal that shaped the sound of rock gui");
    replace("sections.0", "heading_es", "Categorías esenciales de pedales", "Los cuatro pedales que todo guitarrista necesita");
  }

  // ==================== DAW GUIDE ====================
  if (g.id === "daw-guide") {
    replace("sections.1", "content", "is the standard for electronic music production", "is the go-to for electronic music production");
    replace("featuredSnippet", "text_en", "is the gold standard for electronic music production and live performance", "is the leading choice for electronic music production and live performance");
    replace("featuredSnippet", "faq_a3_en", "is the industry standard for commercial recording", "is what most commercial recording studios expect");
    replace("verdictProsCons.0", "pros.3", "The gold standard workflow for electronic musicians", "The go-to workflow for electronic musicians");
    replace("verdictProsCons.3", "pros.0", "The standard in professional studios worldwide", "Expected in professional studios worldwide");
    replace("verdictProsCons.3", "pros.3", "Essential for audio post-production careers", "Required for audio post-production careers");
    replace("verdictProsCons.5", "cons.2", "Not the industry standard — collaboration is harder", "Not what studios typically run — collaboration is harder");
    replace("sections.1", "content_es", "es el estándar para producció", "es la opción principal para producció");
    replace("conclusion_es", null, "Pro Tools es imprescindible para el trabajo", "Pro Tools es necesario para el trabajo");
    replace("featuredSnippet", "faq_a3_es", "es el estándar de la industria para grabación", "es lo que esperan los estudios de grabación profesionales");
    replace("verdictProsCons.5", "cons_es.2", "No es el estándar de la industria — la colaboración es más difícil", "No es lo que esperan los estudios comerciales — la colaboración es más difícil");
  }

  // ==================== MIDI KEYBOARDS ====================
  if (g.id === "midi-keyboards") {
    replace("sections.0", "content", "Unlike a standard keyboard, a MIDI controller sends", "Unlike a piano, a MIDI controller sends");
  }

  // ==================== SM57 VS MD421 ====================
  if (g.id === "sm57-vs-md421") {
    replace("description", null, "One is the workhorse, one is the", "One is the do-everything mic, the other is the");
    replace("description_es", null, "Uno es el caballo de batalla", "Uno es el que va a todas partes");
    replace("verdictProsCons.1", "cons.0", "Standard versions lack the low-cut switch found on later variants", "The basic model lacks the low-cut switch found on later variants");
  }

  // ==================== PRO TOOLS VS CUBASE ====================
  if (g.id === "pro-tools-vs-cubase") {
    replace("sections.0", "content", "it is the industry standard for recording, editing, and session compatibility", "it is what professional studios expect for recording, editing, and session compatibility");
    replace("sections.3", "content", "is the standard you cannot avoid", "is the tool you\u2019ll need to know");
    replace("conclusion", null, "Pro Tools remains essential for", "Pro Tools is still necessary for");
    replace("featuredSnippet", "text_en", "offering the industry standard for reco", "offering what professional studios expect for reco");
    replace("featuredSnippet", "key1", "The Industry Standard for Recording and Mixing", "The DAW Studios Expect for Recording and Mixing");
    replace("featuredSnippet", "faq_a2_en", "is the industry standard for recording and post-production", "is what most recording and post-production studios run");
    replace("verdictProsCons.0", "pros.0", "Industry-standard for professional studios worldwide session compatibility with major facilities", "Expected by professional studios worldwide \u2014 session compatibility with major facilities");
    replace("verdictProsCons.0", "pros.3", "essential for dialog editing workflow", "critical for dialog editing workflow");
    replace("comparison.rows.11", "val1", "industry standard", "widely expected by studios");
    replace("sections.0", "content_es", "es el estándar de la industria para grabación, edición y compatibilidad de sesiones", "es lo que los estudios profesionales esperan para grabación, edición y compatibilidad de sesiones");
    replace("featuredSnippet", "key1_es", "Estándar de la Industria con Edición de Audio Precisa", "El DAW que esperan los Estudios para Grabación y Edición");
    replace("featuredSnippet", "faq_a1_es", "el estándar de la industria para grabación y edición", "lo que los estudios de grabación y edición esperan");
    replace("featuredSnippet", "faq_a2_es", "es el estándar de la industria para grabación y postproducción", "es lo que la mayoría de estudios de grabación y postproducción usan");
    replace("comparison.rows.11", "val1_es", "estándar de la industria", "lo que esperan los estudios");
    replace("verdictProsCons.0", "pros_es.0", "Estándar de la industria en estudios profesionales: compatibilidad de sesiones con las principales instalaciones", "Lo esperan los estudios profesionales: compatibilidad de sesiones con las principales instalaciones");
  }

  // ==================== FABFILTER VS OZONE ====================
  if (g.id === "fabfilter-vs-ozone") {
    replace("sections.0", "content", "and intuitive interface set the standard. Pro-C", "and intuitive interface defined what a modern EQ can be. Pro-C");
    replace("featuredSnippet", "text_en", "offering the gold standard", "offering the tools");
    replace("featuredSnippet", "key1", "The Gold Standard for Surgical Mixing", "The Toolbox for Surgical Mixing");
    replace("featuredSnippet", "faq_a1_en", "are the gold standard for surgical EQ, compress", "are what most engineers reach for in surgical EQ, compress");
    replace("verdictProsCons.0", "pros_es.4", "sin igual", "que no encontrarás en otro plugin");
  }

  // ==================== BEST MIC FOR GUITAR AMPS ====================
  if (g.id === "best-mic-for-guitar-amps") {
    replace("verdictProsCons.1", "cons.0", "practically essential", "a real necessity");
    replace("verdictProsCons.1", "cons_es.0", "prácticamente imprescindible", "una necesidad real");
  }

  // ==================== BEST PA SPEAKERS ====================
  if (g.id === "best-pa-speakers") {
    replace("sections.0", "content", "the touring standard that you", "the speaker you");
    replace("sections.2", "heading", "the Professional Standard Powered Speaker", "the Go-To Powered Speaker for Professional Audio?");
    replace("sections.2", "content", "is the most trusted powered speaker in professional audio", "is the speaker you see most often in professional audio rigs");
    replace("sections.2", "content", "it\u2019s the professional standard", "it\u2019s what working pros choose");
    replace("conclusion", null, "The QSC K12.2 is the touring standard that professionals trust worldwide.", "The QSC K12.2 is what working professionals trust on tour.");
    replace("verdict", null, "the pro standard that rental houses", "the go-to for rental houses");
    replace("verdict", null, "the touring standard", "the touring reference");
    replace("featuredSnippet", "faq_q2_en", "the industry standard", "the go-to choice for professionals");
    replace("featuredSnippet", "faq_a6_en", "is the industry standard for mobile DJ", "is the speaker most mobile DJs carry");
    replace("verdictProsCons.1", "pros.3", "the touring standard found at every venue", "the speaker you find at every venue");
    replace("verdict_es", null, "el estándar pro en el que confían", "la opción que eligen");
    replace("verdict_es", null, "el caballo de batalla económico", "la opción económica que funciona");
    replace("featuredSnippet", "faq_q2_es", "el estándar de la industria", "la opción preferida por los profesionales");
    replace("featuredSnippet", "faq_a6_es", "es el estándar de la industria para DJs móviles", "es lo que usan la mayoría de DJs móviles");
  }

  // ==================== BEST ANALOG MIXERS ====================
  if (g.id === "best-analog-mixers") {
    replace("sections.0", "content", "is the industry standard for small-format mixing", "is the most common choice for small-format mixing");
    replace("featuredSnippet", "text_en", "is the industry standard for small-format analog mixing", "is the analog mixer most small venues and podcasts rely on");
    replace("verdictProsCons.0", "pros.0", "Industry-standard 10-channel analog mixer", "The go-to 10-channel analog mixer");
    replace("sections.0", "content_es", "el estándar de la industria con 10 canales", "la opción más común para 10 canales");
    replace("sections.2", "content_es", "El ZEDi-10FX trae ADN de gama alta a un precio accesible.", "El ZEDi-10FX lleva la herencia de gama alta de Allen & Heath a un precio accesible.");
    replace("verdictProsCons.0", "pros_es.0", "Mezclador analógico estándar de la industria de 10 canales con 4 preamps D-PRE", "El mezclador analógico de 10 canales con 4 preamps D-PRE que más se usa");
  }

  // ==================== ACTIVE VS PASSIVE PA ====================
  if (g.id === "active-vs-passive-pa") {
    replace("sections.0", "content", "Active speakers are the modern standard for portable PA systems", "Active speakers are what most portable PA systems use today");
    replace("sections.4", "content", "is the industry standard for pro powered speakers", "is the speaker most pro powered rigs are built around");
    replace("featuredSnippet", "key2_en", "Industry standard pro PA", "The go-to pro PA speaker");
    replace("featuredSnippet", "faq_a3_en", "Yes, it is the industry standard", "Yes, it\u2019s the speaker most pros default to");
    replace("verdictProsCons.1", "pros.0", "Industry standard for professional sound", "The go-to choice for professional sound");
    replace("verdictProsCons.2", "cons.0", "Not the industry-standard benchmark the QSC K12.2 carries on pro stages", "Doesn\u2019t carry the same on-stage reputation as the QSC K12.2");
    replace("verdictProsCons.3", "pros.0", "proven, road-tested passive workhorse", "proven, road-tested passive rig");
    replace("sections.4", "content_es", "el estándar de la industria para altavoces activos profesionales", "el altavoz activo que más se ve en rigs profesionales");
    replace("featuredSnippet", "faq_a3_es", "es el estándar de la industria", "es el altavoz que más se usa");
    replace("verdictProsCons.1", "pros_es.0", "Estándar de la industria", "La opción preferida por los profesionales");
    replace("verdictProsCons.2", "cons_es.0", "No es el punto de referencia estándar de la industria que el QSC K12.2 ostenta en escenarios profesionales", "No tiene la misma presencia en escenarios profesionales que el QSC K12.2");
    replace("verdictProsCons.3", "pros_es.0", "caballo de batalla pasivo probado en la carretera", "pasivo probado en la carretera");
  }

  // ==================== BEST SAMPLERS DRUM COMPUTERS ====================
  if (g.id === "best-samplers-drum-computers") {
    replace("sections.1", "content", "unlocks endless rhythmic possibilities", "gives you endless rhythmic options");
    replace("sections.3", "content", "remains the ultimate live drum machine for electronic performers", "remains the most popular live drum machine for electronic performers");
    replace("sections.1", "content_es", "desbloquea infinitas posibilidades rítmicas", "te da opciones rítmicas casi ilimitadas");
    replace("sections.3", "content_es", "sigue siendo la máquina de batería en vivo definitiva", "sigue siendo la caja de ritmos en vivo por excelencia");
    replace("featuredSnippet", "faq_a3_es", "la mejor máquina de batería para electr", "la mejor caja de ritmos para electr");
  }

  // ==================== TS9 VS BD2 ====================
  if (g.id === "ts9-vs-bd2") {
    replace("conclusion", null, "Both pedals are essential in their own right.", "Both pedals earn their spot on the board.");
    replace("sections.2", "content_es", "es el estándar de la industria por una razón", "funciona bien con casi cualquier setup y por eso se vende tanto");
    replace("conclusion_es", null, "Ambos pedales son esenciales.", "Ambos pedales valen la pena.");
  }

  // ==================== PRO BASS ====================
  if (g.id === "pro-basses") {
    replace("verdictProsCons.4", "pros.1", "Slim-taper neck with rolled fingerboard edges makes complex runs feel effortless", "Slim-taper neck with rolled fingerboard edges makes complex runs feel smooth");
    replace("verdictProsCons.4", "pros_es.1", "hace que los pasajes complejos sean sin esfuerzo", "hace que los pasajes complejos se sientan fluidos");
  }

  // ==================== PRO LIVE SOUND ====================
  if (g.id === "pro-live-sound") {
    replace("title", null, "Industry-Standard Console Duel", "Two Iconic Digital Consoles Compared");
    replace("intro", null, "Two industry-standard digital mixers for live sound.", "Two of the most-used digital mixers for live sound.");
    replace("conclusion", null, "the X32 Compact remains the benchmark.", "the X32 Compact remains the reference.");
    replace("conclusion", null, "The X32 Compact offers incredible value", "The X32 Compact offers great value");
    replace("title_es", null, "duelo de consolas estándar de la industria", "Dos consolas digitales icónicas comparadas");
    replace("intro_es", null, "Dos mezcladores digitales estándar de la industria para sonido en vivo", "Dos de los mezcladores digitales más usados en sonido en vivo");
  }

  // ==================== BEAT MAKING ====================
  if (g.id === "beat-making") {
    replace("sections.2", "content", "a keyboard is essential for chords, basslines, and melodies.", "a keyboard is useful for chords, basslines, and melodies.");
    replace("sections.2", "content_es", "un teclado es esencial para acordes", "un teclado sirve para acordes");
    replace("sections.4", "content", "handles loud performances effortlessly", "handles loud performances without breaking a sweat");
    replace("sections.4", "content_es", "maneja interpretaciones fuertes sin esfuerzo", "maneja interpretaciones fuertes sin problemas");
    replace("sections.5", "content", "is the gold standard for beat-making", "is the DAW most beat-makers default to");
    replace("sections.5", "content_es", "es el estándar de referencia para hacer beats", "es la DAW que la mayoría de beatmakers elige");
    replace("verdictProsCons.3", "pros.1", "studio-grade conversion", "conversion you\u2019d normally find in pricier interfaces");
    replace("verdictProsCons.3", "pros.3", "Loopback makes streaming and routing effortless", "Loopback makes streaming and routing straightforward");
    replace("verdictProsCons.4", "pros.3", "Studio-standard reliability", "Road-tested reliability");
    replace("verdictProsCons.5", "pros.0", "Broadcast-standard vocal sound", "The vocal sound broadcasters rely on");
    replace("verdictProsCons.6", "pros.2", "Industry-standard workflow for electronic and beat-based music", "The workflow electronic and beat-based producers rely on");
    replace("featuredSnippet", "faq_q1_es", "¿Es el Akai MPC One G2 la mejor máquina de beats", "¿Es el Akai MPC One G2 la mejor opción para hacer beats");
    replace("verdictProsCons.0", "pros_es.0", "Máquina de beats independiente — sin necesidad de ordenador", "Standalone beat maker — no computer needed");
    replace("verdictProsCons.6", "pros_es.2", "Flujo de trabajo estándar de la industria para música electrónica y de beats", "El flujo de trabajo que usan los productores de electrónica y beats");
  }

  // ==================== BEST INSTRUMENT MICS ====================
  if (g.id === "best-instrument-mics") {
    replace("verdictProsCons.0", "pros.2", "Indestructible, affordable, and incredible on guitar cabs", "Indestructible, affordable, and great on guitar cabs");
    replace("verdictProsCons.6", "cons.1", "Premium price for studio-grade versatility", "Premium price for the versatility it offers");
    replace("verdictProsCons.7", "pros.0", "The industry-standard figure-8 ribbon for amps", "The figure-8 ribbon most engineers reach for on amps");
    replace("verdictProsCons.13", "cons.2", "Premium price over the standard SM58", "Premium price over the SM58");
    replace("conclusion_es", null, "No existe un único \u2018mejor micrófono\u2019 — existe el micro adecuado para cada instrumento", "No hay un único \u2018mejor micrófono\u2019 — cada instrumento tiene su mic ideal");
    replace("verdictProsCons.0", "pros_es.2", "Indestructible, asequible e increíble en gabinetes", "Indestructible, asequible y fantástico en gabinetes");
    replace("verdictProsCons.2", "cons_es.2", "Tono dinámico especializado más que un todoterreno", "Tono dinámico especializado más que un micrófono polivalente");
    replace("verdictProsCons.7", "pros_es.0", "La cinta figura-8 estándar de la industria para amplificadores", "La cinta figura-8 que más se usa en amplificadores");
  }

  // ==================== BEST ELECTRIC GUITARS 2026 ====================
  if (g.id === "best-electric-guitars-2026") {
    replace("intro", null, "From budget-friendly Squiers to pro-level Fenders", "From budget-friendly Squiers to high-end Fenders");
    replace("sections.2", "content", "is the benchmark for value", "is the reference point for value");
    replace("sections.6", "content", "is the modern benchmark", "is the modern reference");
    replace("sections.6", "content", "upper-fret access effortless", "upper-fret access smooth and painless");
    replace("verdictProsCons.2", "pros.3", "The benchmark \u2018best value\u2019 electric guitar for over 30 years", "The \u2018best value\u2019 electric guitar reference for over 30 years");
    replace("verdictProsCons.5", "pros.2", "24 frets and 25-inch scale for effortless upper-fret access", "24 frets and 25-inch scale for easy upper-fret access");
    replace("verdictProsCons.6", "pros.1", "Deep C neck and sculpted heel for effortless playability", "Deep C neck and sculpted heel that feels natural from the first chord");
    replace("sections.4", "content_es", "la mantiene sin complicaciones", "la mantiene estable");
    replace("sections.6", "content_es", "acceso a los trastes altos sea sin esfuerzo", "acceso a los trastes altos sea cómodo");
    replace("featuredSnippet", "faq_a2_es", "la bestia todoterreno del rango", "una opción que funciona muy bien para su rango");
    replace("verdictProsCons.4", "pros_es.2", "El puente hardtail de 6 selletas mantiene la afinación sin complicaciones", "El puente hardtail de 6 selletas mantiene la afinación estable");
    replace("verdictProsCons.5", "pros_es.2", "24 trastes y escala de 25\u2033 para acceso sin esfuerzo a los trastes altos", "24 trastes y escala de 25\u2033 para llegar cómodo a los trastes altos");
    replace("verdictProsCons.6", "pros_es.1", "Mástil Deep C y talón esculpido para una tocabilidad sin esfuerzo", "Mástil Deep C y talón esculpido que se siente natural desde el primer acorde");
  }

  // ==================== KH750 VS 7050C ====================
  if (g.id === "kh750-vs-7050c") {
    replace("intro", null, "workhorse", "staple");
    replace("intro_es", null, "caballo de batalla", "pieza clave");
    replace("sections.1", "heading_es", "sin complicaciones", "directos");
    replace("sections.3", "content_es", "sin complicaciones", "sin vueltas");
    replace("conclusion_es", null, "sin esfuerzo", "sin vueltas");
  }

  // ==================== BEST CONDENSER MICS (fix replacement order) ====================
  if (g.id === "best-condenser-mics") {
    // Already handled above
  }

  result.push(g);
  totalFixes += fixes;
  enFixes += enf;
  esFixes += esf;
}

// Process in original order
guides.forEach(g => {
  if (myIds.includes(g.id)) {
    processGuide(g);
  }
});

const outputPath = "C:/Users/Daniel/projects/topmusiciangear/temp/_nat_chunk4.json";
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), "utf8");

console.log("Total guides processed: " + result.length);
console.log("Total fixes: " + totalFixes);
console.log("EN fixes: " + enFixes);
console.log("ES fixes: " + esFixes);

try {
  JSON.parse(fs.readFileSync(outputPath, "utf8"));
  console.log("JSON validation: PASSED");
} catch (e) {
  console.error("JSON validation: FAILED", e.message);
}
