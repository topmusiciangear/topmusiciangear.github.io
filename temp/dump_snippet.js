const fs = require('fs');
const gs = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = gs.find(x => x.id === 'best-studio-monitors-under-150');
console.log('featuredSnippet:', JSON.stringify(g.featuredSnippet, null, 1).slice(0, 900));
console.log('\nfeaturedProducts:', JSON.stringify(g.featuredProducts));
console.log('\nverdict lead (first 500):', g.verdict.slice(0, 500));
console.log('\nverdict_es lead (first 500):', g.verdict_es.slice(0, 500));
console.log('\nconclusion (first 400):', g.conclusion.slice(0, 400));
console.log('\nconclusion_es (first 400):', g.conclusion_es.slice(0, 400));
