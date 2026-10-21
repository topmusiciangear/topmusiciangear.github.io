const fs = require('fs');
const es = fs.readFileSync('guides/monitor-setup_es.html', 'utf8');
const en = fs.readFileSync('guides/monitor-setup.html', 'utf8');

function verdictText(s) {
  const i = s.indexOf('<div class="verdict-text">');
  const j = s.indexOf('</div>', i);
  return s.slice(i, j).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}
console.log('=== VEREDICTO ES ===\n' + verdictText(es));
console.log('\n=== VEREDICTO EN ===\n' + verdictText(en));

console.log('\nmidfield en cuerpo ES:', (es.match(/midfield/gi) || []).length);
console.log('"en el suelo" en ES:', (es.match(/en el suelo/gi) || []).length);
console.log('"sobre soportes de suelo" en ES:', (es.match(/sobre soportes de suelo/gi) || []).length);
console.log('"campo medio" en ES:', (es.match(/campo medio/gi) || []).length);
console.log('"en este orden" en ES:', (es.match(/en este orden/gi) || []).length);

const furn = fs.readFileSync('guides/studio-furniture_es.html', 'utf8');
console.log('\nstudio-furniture ES contiene "con los monitores sobre soportes de suelo":', furn.includes('con los monitores sobre soportes de suelo'));
const sub = fs.readFileSync('guides/studio-subwoofers-setup_es.html', 'utf8');
console.log('studio-subwoofers ES contiene "campo medio Trio11":', sub.includes('campo medio Trio11'));
