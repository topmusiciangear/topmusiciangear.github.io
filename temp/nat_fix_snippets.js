const fs = require('fs');
const d = require('../temp/_nat_chunk1.json');

let fixes = 0;

const fixed = d.map(g => {
  if (!g.featuredSnippet) return g;
  const fs = { ...g.featuredSnippet };
  
  // best-headphones: estándar de oro in text_es
  if (fs.text_es && fs.text_es.includes('estándar de oro')) {
    fs.text_es = fs.text_es.replace('estándar de oro para monitoreo cerrado', 'referencia en monitoreo cerrado');
    fixes++;
    console.log('Fixed best-headphones text_es: estándar de oro');
  }
  
  // stage-mics: estándar mundial in text_es
  if (fs.text_es && fs.text_es.includes('estándar mundial')) {
    fs.text_es = fs.text_es.replace('el estándar mundial para voces en vivo', 'el micrófono más usado para voces en vivo');
    fixes++;
    console.log('Fixed stage-mics text_es: estándar mundial');
  }
  
  // stage-mics: eleva tu in faq_a4_es — this is technical ("eleva tu señal"), 
  // but the cliche list flags it. Replace with more neutral phrasing.
  if (fs.faq_a4_es && fs.faq_a4_es.includes('eleva tu señal')) {
    fs.faq_a4_es = fs.faq_a4_es.replace('eleva tu señal por encima del umbral de acople', 'saca tu señal por encima del umbral de acople');
    fixes++;
    console.log('Fixed stage-mics faq_a4_es: eleva tu señal');
  }
  
  return { ...g, featuredSnippet: fs };
});

fs.writeFileSync(__dirname + '/_nat_chunk1.json', JSON.stringify(fixed, null, 2), 'utf8');

try {
  JSON.parse(fs.readFileSync(__dirname + '/_nat_chunk1.json', 'utf8'));
  console.log('\nJSON OK');
} catch(e) {
  console.error('\nJSON ERROR:', e.message);
}
console.log('Featured snippet fixes:', fixes);
