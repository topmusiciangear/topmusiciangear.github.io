const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
// buscar guias con "24" y "32" canales en el titulo
guides.filter(g=>/24|32/.test(g.title||'') && /channel|canal/i.test((g.title||'')+(g.title_es||'')))
  .forEach(g=>{
    console.log('id: ' + g.id);
    console.log('  title:      ' + g.title + '   [' + (g.title||'').length + ']');
    console.log('  title_es:   ' + g.title_es + '   [' + (g.title_es||'').length + ']');
    console.log('  titleTag:   ' + g.titleTag + '   [' + (g.titleTag||'').length + ']');
    console.log('  titleTag_es:' + g.titleTag_es + '   [' + (g.titleTag_es||'').length + ']');
    console.log('  description:     ' + g.description);
    console.log('  description_es:  ' + g.description_es);
    console.log('');
  });
// tambien en el HTML generado
const f = BASE+'guides/best-32-channel-digital-mixers.html';
if (fs.existsSync(f)) {
  const d = fs.readFileSync(f,'utf8');
  console.log('=== HTML EN ===');
  console.log('  title: ' + ((d.match(/<title>([^<]*)<\/title>/)||[])[1]));
  console.log('=== HTML ES ===');
  const fes = BASE+'guides/best-32-channel-digital-mixers_es.html';
  if (fs.existsSync(fes)) {
    const de = fs.readFileSync(fes,'utf8');
    console.log('  title: ' + ((de.match(/<title>([^<]*)<\/title>/)||[])[1]));
    console.log('  h1:    ' + ((de.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)||[])[1]||'').replace(/<[^>]+>/g,'').trim());
  }
}