const g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const d = g.find(x => x.id === 'guitar-bass-amps');
const f = d.featuredSnippet;
Object.keys(f).filter(k => /^faq/.test(k)).forEach(k => {
  const v = f[k];
  if (/RB-210|Rumble 200|Spark LIVE/.test(v)) console.log('###', k, '\n', v, '\n');
});
