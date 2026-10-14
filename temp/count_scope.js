const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));

let faqs = 0, prosCons = 0, verdicts = 0, conclusions = 0;
guides.forEach(g => {
  if (g.faqs) faqs += g.faqs.length;
  if (g.verdictProsCons) prosCons += g.verdictProsCons.length;
  if (g.verdict) verdicts++;
  if (g.conclusion) conclusions++;
});

console.log('Total guias:', guides.length);
console.log('FAQs totales:', faqs);
console.log('Pros/Cons totales:', prosCons);
console.log('Veredictos totales:', verdicts);
console.log('Conclusiones totales:', conclusions);
console.log('');
console.log('Guia IDs:');
guides.forEach(g => console.log('  ' + g.id));