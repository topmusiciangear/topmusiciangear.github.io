const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\guides.json','utf8'));

// Words that are allowed to be capitalized (proper nouns, acronyms, product names)
const allowed = new Set([
  'USB','XLR','DSL','EQ','PA','DAW','SM','AT','AKG','DT','HD','ATH','MD','EW','SSL','API','UA','KRK','ADAM',
  'Yamaha','Fender','Gibson','Marshall','Boss','Roland','Shure','Sennheiser','Rode','Beyerdynamic','Ibanez','PRS','Taylor',
  'Korg','Elektron','Zoom','TC','Vox','Ampeg','Mackie','Midas','Behringer','Pioneer','Alesis','Novation','Arturia','Native',
  'Casio','Nord','Sequential','Moog','Wurlitzer','Hammond','Les Paul','Telecaster','Stratocaster','Jazzmaster','Precision',
  'Mustang','SG','Squier','Epiphone','ESP','Schecter','Jackson','Charvel','LTD','Gretsch','Martin','Takamine','Cort','Sigma',
  'Guild','Kurzweil','Elgato','FabFilter','iZotope','Waves','Kontakt','Komplete','Logic Pro','Ableton','Cubase','Pro Tools',
  'Studio One','Reaper','Bitwig','Reason','Steinberg','Cakewalk','Ardour','LMMS','Zed','Aston','Focusrite','Universal Audio',
  'Neumann','Audio-Technica','Beyerdynamic','K&M','Mogami','Music Man','Sterling','Hofner','Schecter','HeadRush','IK Multimedia',
  'Positive Grid','Enya Nova','Lava Music','DPA','RCF','Electro-Voice','LD Systems','Mackie','MOTU','Antelope','RME','SSL',
  'Waves','Arturia','Native Instruments','Plugin Boutique','Baby Audio','Devious Machines','Mastering The Mix','Excite Audio',
  'Minimal Audio','D16 Group','Cable','Soporte','Micrófono','Audio-Technica','Telecaster','Stratocaster','Jazz Bass','Precision Bass',
  'American Professional','American Ultra','Player II','Classic Vibe','Affinity Series','Sonic','Debut Series','Boden',
  'Launchkey','Circuit Tracks','Digitakt','TR-8S','TR-8S','Model:Cycles','OB-6','Fireface','Babyface','Volt','Scarlett',
  'Apollo','Axe-Fx','Kemper','Quad Cortex','Profiler','FM3','FM9','AX8','Helix','HX','Pod','Boss','Line 6','Fractal Audio',
  'Kemper','Neural DSP','Positive Grid','Spark','MEGA','Katana','Blues Junior','AC30','DSL','DSL40CR','Rocket Bass','Rumble',
  'BLX','EW-D','EW 100','EW-IEM','PSM300','ULXD','EW100','K52','Q2U','SM57','SM58','SM7B','RE20','MD 421','AT2020','AT2035',
  'AT875R','AT875','M50x','M40x','DT770','DT990','DT 770','DT 990','HD490','HD 490','K371','K240','SR850','MDR-7506',
  'NT1','NT1-A','NTG','PodMic','ATR2100','AT2020USB','SM7B','SM58','SM57','SM58','XM8500','K688','RE20','Procaster','SM7',
  'TLM','U 87','C414','C214','NTG','HS5','HS7','HS8','Rokit','A7V','Eris','T5V','5C','BX5','KRK','Yamaha','Adam Audio',
  'PreSonus','Mackie','JBL','QSC','EV','RCF','dB Technologies','Alto','ZenPro','Behringer','Alesis','Crown','QSC','Yamaha',
  'Mackie','Soundcraft','Allen & Heath','Midas','Behringer','Zoom','Tascam','BOSS','Korg','Akai','Arturia','Novation','Roland',
  'Casio','Nord','Yamaha','Kurzweil','Alesis','M-Audio','Native Instruments','IK Multimedia','Reason Studios','Avid',
  'Steinberg','Image-Line','PreSonus','Bitwig','Cockos','Apple','MOTU','Universal Audio','RME','MOTU','Focusrite','Audient',
  'Antelope','Chord','SSL','Neve','API','Warm Audio','Heritage','Blackstar','Fender','Gibson','PRS','Ibanez','ESP','Schecter',
  'Jackson','Charvel','LTD','Gretsch','Epiphone','Squier','Yamaha','Casio','Korg','Roland','Nord','Sequential','Moog',
  'Elektron','Teenage Engineering','Polyend','Synthstrom','Akai','Korg','Roland','Yamaha','Access','Waldorf','Novation',
  'DSI','Tom Oberheim','Moog','Kurzweil','Roland','Yamaha','Korg','Sequential','ASM','Hydrasynth','AVS','Audiothingies',
  'Dreadbox','Erica Synths','Make Noise','Mutable Instruments','Tip Top Audio','Doepfer','Malekko','Intellijel','Eurorack',
  'Behringer','Korg','Roland','Yamaha','Arturia','Novation','Akai','Native Instruments','IK Multimedia','Waves','FabFilter',
  'iZotope','Soundtoys','Valhalla','U-He','Arturia','u-he','Softube','Plugin Alliance','Slate Digital','McDSP','Waves Factory',
  'Spitfire Audio','Orchestral Tools','Native Instruments','EastWest','Output','Heavyocity','Sample Logic','Cinesamples',
  'East West','Spitfire','Orchestral Tools','Tokyo Scoring Strings','CSS','CSSS','CSS2','CSS3','Berlin Strings','Albion',
  'Actions','Momentary','Flashback','Moon Pool','Big Sky','MXR','Dunlop','Ernie Ball','Fender','Gibson','PRS','Ibanez',
  'D'Addario','Ernie Ball','Elixir','DR','Rotosound','Thomastik','D'Addario','Fender','Gibson','PRS','Ibanez','ESP',
  'Furman','ART','Palmer','Two Notes','Torpedo','Boss','Roland','Korg','Zoom','TC Electronic','Mooer','Hotone','NUX',
  'Joy', 'DR','Zildjian','Sabian','Meinl','Paiste','Istanbul','Dream','Soultone','Turkish','Mehmet','Istanbul Agop',
  'Tama','Pearl','DW','Yamaha','Mapex','Sonor','Ludwig','Gretsch','Slingerland','Rogers','Camco','Yamaha','Tama','Pearl',
  'LP','Latin Percussion','Meinl','Toca','Tycoon','Pearl','Tama','DW','Yamaha','Mapex','Sonor','Gretsch','Ludwig',
  'EAST','WEST','Big Sky','BigSky','Timeline','Flint','El Capistan','DIG','Volante','Lexicon','Strymon','Eventide','TC',
  'Electro-Harmonix','EHX','Boss','Roland','Korg','Akai','Arturia','Novation','Native Instruments','Ableton','FL Studio',
  'Cubase','Pro Tools','Studio One','Logic Pro','Reason','Bitwig','Reaper','Digital Performer','Cakewalk',
  // After colon patterns
  'Subwoofer','Monitores','Auriculares','Controladores','Micrófono','Guitarra','Bajo','Teclado','Sintetizador','Caja de ritmos',
  'Pedales','Amplificador','Mezcladora','Altavoces','Interfaces','Drum Pad','Groovebox','Sampler',
  // Month names
  'Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre',
  'January','February','March','April','May','June','July','August','September','October','November','December'
]);

function isAllowed(word) {
  const clean = word.replace(/[^a-zA-Z0-9áéíóúñüÁÉÍÓÚÑÜ]/g, '');
  if (allowed.has(clean)) return true;
  if (allowed.has(word)) return true;
  // Product model names (contains numbers mixed with letters like SM57, AT2020)
  if (/[A-Z][a-z]*\d+/.test(word)) return true;
  if (/\d+[A-Z]/.test(word)) return true;
  return false;
}

function checkText(text, guideId, field) {
  if (!text) return [];
  const violations = [];
  // Split by sentence-ending punctuation
  const sentences = text.split(/(?<=[.!?¿])\s+/);
  for (const sentence of sentences) {
    const words = sentence.split(/\s+/);
    for (let i = 1; i < words.length; i++) {
      const w = words[i];
      if (!w || w.length < 2) continue;
      if (w[0] !== w[0].toUpperCase() || w[0] === w[0].toLowerCase()) continue;
      if (isAllowed(w)) continue;
      // Skip HTML tags
      if (w.startsWith('<') || w.startsWith('/')) continue;
      // Skip accented words starting with capital after sentence start
      violations.push({ guideId, field, sentence: sentence.substring(0, 80), word: w, pos: i });
    }
  }
  return violations;
}

let allViolations = [];

for (const g of guides) {
  // esTitle
  let v = checkText(g.esTitle, g.id, 'esTitle');
  allViolations.push(...v);
  
  // esDescription
  v = checkText(g.esDescription, g.id, 'esDescription');
  allViolations.push(...v);
  
  // Section headings
  if (g.sections) {
    for (let si = 0; si < g.sections.length; si++) {
      const sec = g.sections[si];
      v = checkText(sec.title_es, g.id, `sec${si}.title_es`);
      allViolations.push(...v);
      
      // FAQ questions
      if (sec.faq) {
        for (let fi = 0; fi < sec.faq.length; fi++) {
          v = checkText(sec.faq[fi].question_es, g.id, `sec${si}.faq${fi}.question_es`);
          allViolations.push(...v);
        }
      }
      
      // Products
      if (sec.products) {
        for (const p of sec.products) {
          v = checkText(p.title_es, g.id, `product.title_es`);
          allViolations.push(...v);
          // Product description
          if (p.description_es) {
            v = checkText(p.description_es, g.id, `product.description_es`);
            allViolations.push(...v);
          }
          // productTable
          if (p.productTable) {
            for (const [key, val] of Object.entries(p.productTable)) {
              v = checkText(val.es, g.id, `productTable.${key}`);
              allViolations.push(...v);
            }
          }
        }
      }
    }
  }
}

console.log('Total ES Title Case violations:', allViolations.length);
console.log('\nViolations by guide:');
const byGuide = {};
for (const v of allViolations) {
  if (!byGuide[v.guideId]) byGuide[v.guideId] = [];
  byGuide[v.guideId].push(v);
}
for (const [guideId, violations] of Object.entries(byGuide)) {
  console.log(`\n${guideId} (${violations.length} violations):`);
  for (const v of violations) {
    console.log(`  ${v.field}: "${v.word}" in "${v.sentence}"`);
  }
}
