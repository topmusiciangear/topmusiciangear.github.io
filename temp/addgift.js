const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const EN = '\n\n<span style="color:#f59e0b;font-size:13px">Selected Plugin Boutique purchases include a free gift — choose from a selection based on your spending level <a href="https://www.pluginboutique.com/articles/2073?a_aid=6a01e859cbe1a" target="_blank" rel="noopener noreferrer">Learn more</a></span>';
const ES = ' <span style="color:#f59e0b;font-size:13px">Ciertas compras en Plugin Boutique incluyen un regalo gratuito — elige entre una selección según cuánto gastes <a href="https://www.pluginboutique.com/articles/2073?a_aid=6a01e859cbe1a" target="_blank" rel="noopener noreferrer">Más información</a></span>';
let n = 0;
guides.forEach(g => {
  if (g.category !== 'plugins') return;
  if (!(g.conclusion || '').includes('articles/2073')) { g.conclusion = (g.conclusion || '') + EN; n++; }
  if (!(g.conclusion_es || '').includes('articles/2073')) { g.conclusion_es = (g.conclusion_es || '') + ES; n++; }
});
fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('notas añadidas: ' + n);
