const fs = require('fs');
const path = require('path');
const gPath = path.join(__dirname, '../data/guides.json');
const g = JSON.parse(fs.readFileSync(gPath, 'utf8'));

const pbLink = 'https://www.pluginboutique.com/articles/2073?a_aid=6a01e859cbe1a';
const pbEN = '\n\n<span style="color:#f59e0b;font-size:13px">Selected Plugin Boutique purchases include a free gift — choose from a selection based on your spending level <a href="' + pbLink + '" target="_blank" rel="noopener noreferrer">Learn more</a></span>';
const pbES = ' <span style="color:#f59e0b;font-size:13px">Ciertas compras en Plugin Boutique incluyen un regalo gratis — elige entre una selección según tu nivel de gasto <a href="' + pbLink + '" target="_blank" rel="noopener noreferrer">Más información</a></span>';

// 1. Fix existing guides: add affiliate param to existing PB links (EN + ES)
g.forEach(item => {
  if (item.conclusion_es && item.conclusion_es.includes('regalo gratis')) {
    if (item.conclusion) {
      item.conclusion = item.conclusion.replace(
        /href="https:\/\/www\.pluginboutique\.com\/articles\/2073"/g,
        'href="' + pbLink + '"'
      );
    }
    if (item.conclusion_es) {
      item.conclusion_es = item.conclusion_es.replace(
        /href="https:\/\/www\.pluginboutique\.com\/articles\/2073"/g,
        'href="' + pbLink + '"'
      );
    }
    console.log('Fixed affiliate link:', item.id);
  }
});

// 2. Add PB section to 3 missing guides
['ai-tools-plugins', 'sidechain-modulation-plugins', 'beatmaker-plugins'].forEach(id => {
  const item = g.find(x => x.id === id);
  if (item && !item.conclusion_es.includes('regalo gratis')) {
    if (item.conclusion && !item.conclusion.includes('free gift')) {
      item.conclusion += pbEN;
    }
    if (item.conclusion_es && !item.conclusion_es.includes('regalo gratis')) {
      item.conclusion_es += pbES;
    }
    console.log('Added PB gift section:', id);
  }
});

fs.writeFileSync(gPath, JSON.stringify(g, null, 2), 'utf8');
console.log('Done!');
