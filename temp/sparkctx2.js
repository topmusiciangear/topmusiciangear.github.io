const G = require('../data/guides.json');
const g = G.find(x => x.id === 'best-bass-amps');
['conclusion', 'conclusion_es', 'verdict', 'verdict_es', 'description', 'description_es'].forEach(f => {
  const v = g[f] || '';
  if (/Spark/.test(v)) console.log(f + ': ' + JSON.stringify(v).slice(0, 900));
  else console.log(f + ': no Spark');
});
const sn = g.featuredSnippet || {};
Object.keys(sn).filter(k => /^faq_/.test(k)).forEach(k => { if (/Spark/.test(sn[k])) console.log('SNIP ' + k + ': ' + JSON.stringify(sn[k]).slice(0, 300)); });