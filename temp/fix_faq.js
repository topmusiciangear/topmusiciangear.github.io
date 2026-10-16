const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
let fixed = 0;
guides.forEach(gd => {
  (gd.faq || []).forEach(f => {
    if ('q_a' in f) { f.a = f.q_a; delete f.q_a; fixed++; }
    if ('q_a_es' in f) { f.a_es = f.q_a_es; delete f.q_a_es; fixed++; }
  });
});
fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('FAQ keys normalizadas: ' + fixed);
// verify none left
const guides2 = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
let left = 0;
guides2.forEach(gd => (gd.faq || []).forEach(f => { if ('q_a' in f || 'q_a_es' in f) left++; }));
console.log('restantes q_a: ' + left);
