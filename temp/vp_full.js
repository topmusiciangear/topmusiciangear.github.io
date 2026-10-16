fetch('https://banners.pluginboutique.com/h9eygdlz3rn706h6wgtf97gryzsq', { method: 'HEAD' })
  .then(r => console.log('nectar banner: ' + r.status + ' | ' + r.headers.get('content-type')))
  .catch(e => console.log('ERROR: ' + e.message));
const guides = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = guides.find(x => x.id === 'vocal-plugins');
console.log('TABLE: ' + JSON.stringify(g.productTable));
console.log('INTRO FULL: ' + g.intro);
console.log('VERDICT FULL: ' + g.verdict);
console.log('CONCLUSION: ' + (g.conclusion || '').slice(0, 600));
