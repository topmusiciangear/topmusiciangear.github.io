const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

['bridge-cast-x-vs-rodecaster', 'bridgecast-x-vs-rodecaster-pro2', 'rodecaster-pro2-vs-bridgecast-x'].forEach(id => {
  const gg = g.find(x => x.id === id);
  const html = fs.readFileSync(B + 'guides/' + id + '.html', 'utf8');
  const can = (html.match(/rel="canonical" href="([^"]+)"/) || [])[1];
  const ref = (html.match(/http-equiv="refresh" content="[^;]+; url=([^"]+)"/) || [])[1];
  console.log(id);
  console.log('  en guides.json: ' + (gg ? 'SI (' + (gg.title || '').slice(0, 50) + ')' : 'NO'));
  console.log('  canonical: ' + can);
  console.log('  refresh  : ' + ref);
  console.log('  AUTO-REDIRECCION: ' + (can && ref && can === ref && can.includes(id) ? 'SI *** BUCLE ***' : 'no'));
});
