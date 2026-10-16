const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
['starter-studio.html', 'starter-studio_es.html'].forEach(f => {
  const d = fs.readFileSync(B + f, 'utf8');
  const tbl = (d.match(/<table[\s\S]*?<\/table>/) || [''])[0];
  const first = (tbl.match(/<td[^>]*class="label"[^>]*>([\s\S]*?)<\/td>/) || [])[1] || '';
  console.log(f + ' -> primera etiqueta: "' + first.replace(/<[^>]+>/g, '').trim() + '"');
  console.log('   restos largos: ' + (d.match(/What Each Build Is For|Para qué sirve cada montaje/g) || []).length);
});
