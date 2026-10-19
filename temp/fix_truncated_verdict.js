// Completa la frase cortada del veredicto de budget-usb-mics:
// "the Razer Seiren V3 Mini is the compact pick at;" -> "at $60;".
// El precio sale de data/products.json (id del Razer Seiren V3 Mini).
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

fs.writeFileSync(B + 'temp/guides.before_rzfix.json', JSON.stringify(guides, null, 2), 'utf8');

const g = guides.find(x => x.id === 'budget-usb-mics');
const razer = products.find(p => (p.title || '').includes('Seiren V3 Mini'));
console.log('Precio del Razer Seiren V3 Mini en catalogo: ' + razer.price);

const antes = g.verdict;
const roto = 'the Razer Seiren V3 Mini is the compact pick at;';
const bueno = 'the Razer Seiren V3 Mini is the compact pick at $' + razer.price + ';';

if (antes.indexOf(roto) === -1) {
  console.log('AVISO: no se encontro la frase rota. Revisar manualmente.');
  process.exit(1);
}

g.verdict = antes.replace(roto, bueno);

// El texto ES equivalente tambien esta cortado
if (g.verdict_es && /es el compacto a;|compacto a;/i.test(g.verdict_es)) {
  g.verdict_es = g.verdict_es.replace(/(a);/, 'a $' + razer.price + ';');
  console.log('verdict_es corregido');
}

console.log('\nANTES:\n' + antes.substring(0, 340));
console.log('\nAHORA:\n' + g.verdict.substring(0, 340));

// Comprobar que no queda ningun "at;" huerfano en ninguna guia
const todos = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
let huérfanos = 0;
todos.forEach(x => {
  ['verdict', 'conclusion', 'verdict_es', 'conclusion_es', 'intro', 'intro_es'].forEach(f => {
    if (typeof x[f] === 'string' && /\b(at|para|a|de|el|la) ;/.test(x[f])) {
      huérfanos++;
      console.log('  FRASE ROTA en ' + x.id + '.' + f + ': ...' +
        (x[f].match(/.{0,45}\b(at|para|a|de|el|la) ;/) || [''])[0] + '...');
    }
  });
});
console.log('\nFrases rotas tipo "X ;" en todo el corpus: ' + huérfanos);

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('Backup: temp/guides.before_rzfix.json');
console.log('data/guides.json escrito.');
