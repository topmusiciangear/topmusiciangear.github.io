const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
[['best-pa-speakers.html','PA (primario Amazon)'],['beatmaker-plugins.html','plugins (primario Plugin Boutique)'],['starter-studio.html','home studio']].forEach(([f, etiqueta]) => {
  const d = fs.readFileSync(BASE + 'guides/' + f, 'utf8');
  const tabla = (d.match(/<table class="guide-comp-table"[\s\S]*?<\/tbody>/i)||[''])[0];
  console.log('\n### ' + f + '  (' + etiqueta + ')');
  console.log('  TABLA comparativa:');
  console.log('     data-price= : ' + (tabla.match(/data-price=/g)||[]).length);
  console.log('     data-pb-*   : ' + (tabla.match(/data-pb-/g)||[]).length);
  console.log('     texto fijo  : ' + (tabla.match(/<td class="val">[^<]*<\/td>/g)||[]).slice(0,4).map(s=>s.replace(/<[^>]+>/g,'')).join('  '));
  console.log('  BOTONES (tarjetas):');
  console.log('     data-price= : ' + (d.match(/data-price=/g)||[]).length);
  console.log('     data-pb-eu-p: ' + (d.match(/data-pb-eu-p/g)||[]).length);
  console.log('     data-pb-us-p: ' + (d.match(/data-pb-us-p/g)||[]).length);
  console.log('     data-pb-uk-p: ' + (d.match(/data-pb-uk-p/g)||[]).length);
  const pb = d.match(/data-pb-eu-p="([^"]*)"[^>]*data-pb-us-p="([^"]*)"[^>]*data-pb-uk-p="([^"]*)"/);
  if (pb) console.log('     ejemplo PB  : EU ' + pb[1] + ' / US ' + pb[2] + ' / UK ' + pb[3]);
});