const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');

console.log('=== la guia nueva tiene campo faqs? ===');
console.log('  ' + (g.faqs ? 'SI, ' + g.faqs.length + ' FAQs' : 'NO, no tiene campo faqs'));

const conFaq = guides.filter(x => x.faqs && x.faqs.length);
console.log('\nguias del sitio con FAQs: ' + conFaq.length + ' de ' + guides.length);

// la pagina generada tiene FAQ?
const s = fs.readFileSync(B + 'guides/best-home-studio-speakers.html', 'utf8');
const m = s.match(/faq/i);
console.log('\nla pagina generada menciona "faq": ' + (m ? m.length + ' veces' : 'NO'));

// buscar en las paginas si hay un bloque FAQ global que hable de estos monitores
console.log('\n=== otras paginas que mencionan los productos nuevos en un FAQ ===');
const fs2 = require('fs');
const rutas = ['guides/best-home-studio-speakers.html', 'guides/best-home-studio-speakers_es.html',
  'guides/best-monitors.html', 'guides/budget-monitors.html', 'index.html'];
rutas.forEach(r => {
  try {
    const t = fs2.readFileSync(B + r, 'utf8');
    const faqIdx = t.search(/class="[^"]*faq/i);
    console.log('  ' + r.padEnd(46) + (faqIdx >= 0 ? 'tiene bloque FAQ en ' + faqIdx : 'sin bloque FAQ'));
  } catch (e) { console.log('  ' + r + ': no existe'); }
});
