const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'starter-studio');

console.log('=== CAMPOS DE TITULO ACTUALES ===');
['title', 'title_es', 'titleTag', 'titleTag_es', 'badge', 'description', 'description_es', 'image'].forEach(k =>
  console.log('  ' + (k + ':').padEnd(16) + JSON.stringify(s[k])));

console.log('\n  longitud del titulo EN : ' + s.title.length);
console.log('  longitud del titulo ES : ' + s.title_es.length);

console.log('\n=== CONVENCION DE MAYUSCULAS "HOME STUDIO" EN LOS TITULOS ES ===');
const hs = g.filter(x => /home studio/i.test((x.title_es || '') + (x.titleTag_es || '')));
hs.forEach(x => console.log('  ' + x.id.padEnd(28) + (x.title_es || '')));
console.log('  ---');
console.log('  con "Home Studio" (2 iniciales mayus): ' + g.filter(x => /Home Studio/.test(x.title_es || '')).length);
console.log('  con "home studio" (minusculas)     : ' + g.filter(x => /home studio/.test(x.title_es || '') && !/Home Studio/.test(x.title_es || '')).length);

console.log('\n=== REFERENCIAS AL TITULO ANTIGUO POR TODO EL SITIO ===');
const raw = fs.readFileSync(B + 'data/guides.json', 'utf8');
['Home Studio on a Budget', 'Three Tiers, What to Buy', 'Home studio por niveles', 'qué comprar y en qué orden'].forEach(k => {
  const n = raw.split(k).length - 1;
  console.log('  "' + k + '": ' + n + ' en guides.json');
  if (n) {
    let i = -1;
    while ((i = raw.indexOf(k, i + 1)) > -1) {
      const antes = raw.lastIndexOf('"id":', i);
      const idM = raw.slice(Math.max(0, i - 4000), i).match(/"id"\s*:\s*"([^"]+)"/g);
      console.log('        cerca de: ' + (idM ? idM[idM.length - 1] : '?'));
    }
  }
});

// los HTML generados
const html = fs.readdirSync(B + 'guides').filter(f => f.endsWith('.html'));
const limpio = html.filter(f => {
  const d = fs.readFileSync(B + 'guides/' + f, 'utf8');
  return /Home Studio on a Budget|Home studio por niveles/.test(d);
});
console.log('\n  HTML que contiene el titulo antiguo: ' + limpio.length + (limpio.length ? ' -> ' + limpio.slice(0, 6).join(', ') : ''));
