const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

console.log('=== title_es / titleTag_es con "(Pros" ===');
guides.forEach(g => {
  for (const f of ['title_es', 'titleTag_es']) {
    if (typeof g[f] === 'string' && /\(Pros/i.test(g[f])) {
      console.log('  ' + g.id + '.' + f + ': ' + g[f]);
    }
  }
});

console.log('\n=== title_es con mayusculas sospechosas (mas de 2 palabras capitalizadas) ===');
guides.forEach(g => {
  if (typeof g.title_es !== 'string') return;
  const palabras = g.title_es.split(/\s+/);
  const comunes = ['de', 'la', 'el', 'en', 'y', 'a', 'los', 'las', 'un', 'una', 'para', 'con', 'por', 'del', 'al', 'su', 'sus', 'que', 'es', 'o', 'e', 'u'];
  const capitalizadas = palabras.filter(p => {
    const limpia = p.replace(/[^\p{L}]/gu, '');
    if (!limpia) return false;
    if (comunes.includes(limpia.toLowerCase())) return false;
    return /^[A-ZÁÉÍÓÚÑ]/.test(limpia);
  });
  if (capitalizadas.length > 2) {
    console.log('  ' + g.id + ': ' + g.title_es);
  }
});
