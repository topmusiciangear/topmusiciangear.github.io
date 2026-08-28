const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\guides.json','utf8'));

function checkSentenceCase(text) {
  if (!text) return [];
  const violations = [];
  const words = text.split(' ');
  for (let i = 1; i < words.length; i++) {
    const w = words[i];
    if (!w || w.length < 2) continue;
    // Check if first char is uppercase
    if (w[0] >= 'A' && w[0] <= 'Z') {
      // Skip known allowed words
      const allowed = /^(USB|XLR|DSL|EQ|PA|DAW|SM|AT|AKG|DT|HD|ATH|MD|EW|SSL|API|UA|KRK|DAW|MIDI|IEM|PA|RAE|AI|MP3|WAV|MIDI|VST|AU|AAX|MPE|ADSR|OSC|LFO|FX|DI|DIY|B_stock|Hi|Lo|Hi|Lo)$/i;
      if (allowed.test(w)) continue;
      // Skip product model names (contain digits)
      if (/\d/.test(w)) continue;
      // Skip words with hyphens that are model names
      if (w.includes('-') && /\d/.test(w)) continue;
      violations.push(w);
    }
  }
  return violations;
}

let totalViolations = 0;

for (const g of guides) {
  if (!g.sections) continue;
  for (let si = 0; si < g.sections.length; si++) {
    const sec = g.sections[si];
    
    // Check title_es
    const v1 = checkSentenceCase(sec.title_es);
    if (v1.length > 0) {
      console.log(`${g.id} sec${si}.title_es: "${sec.title_es}"`);
      console.log(`  Bad caps: ${v1.join(', ')}`);
      totalViolations += v1.length;
    }
    
    // Check FAQ questions
    if (sec.faq) {
      for (let fi = 0; fi < sec.faq.length; fi++) {
        const v2 = checkSentenceCase(sec.faq[fi].question_es);
        if (v2.length > 0) {
          console.log(`${g.id} sec${si}.faq${fi}.question_es: "${sec.faq[fi].question_es}"`);
          console.log(`  Bad caps: ${v2.join(', ')}`);
          totalViolations += v2.length;
        }
      }
    }
    
    // Check product titles
    if (sec.products) {
      for (const p of sec.products) {
        const v3 = checkSentenceCase(p.title_es);
        if (v3.length > 0) {
          console.log(`${g.id} product "${p.title_es}"`);
          console.log(`  Bad caps: ${v3.join(', ')}`);
          totalViolations += v3.length;
        }
      }
    }
  }
}

console.log('\nTotal violations: ' + totalViolations);
