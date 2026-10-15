const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
['intro', 'intro_es', 'description', 'description_es', 'featuredSnippet', 'conclusion', 'conclusion_es', 'verdict', 'verdict_es']
  .forEach(k => {
    if (!s[k]) { console.log('\n--- ' + k + ': (vacio) ---'); return; }
    console.log('\n--- ' + k + ' ---');
    console.log(s[k]);
  });
