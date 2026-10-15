const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const clean = h => String(h==null?'':h).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
[['best-reverb-delay'],['best-synthesizers'],['best-stage-keyboards'],['nord-stage-4-vs-montage-m8x'],['best-looper-pedals']].forEach(([g])=>{
  ['.html','_es.html'].forEach(suf=>{
    const f = BASE + 'guides/' + g + suf;
    if (!fs.existsSync(f)) { console.log(g+suf+': no existe'); return; }
    const d = fs.readFileSync(f,'utf8');
    const cards = [...d.matchAll(/openReviewModal\((\d+)\)[\s\S]{0,900}?<h3 class="guide-product-card-title">([\s\S]*?)<\/h3>/g)].map(m=>({id:m[1],t:clean(m[2])}));
    const t = (d.match(/<table class="guide-comp-table"[\s\S]*?<\/thead>/i)||[''])[0];
    const cols = [...t.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map(m=>clean(m[1])).filter(Boolean);
    const vps = [...new Set([...d.matchAll(/<div class="verdict-product-name">([\s\S]*?)<\/div>/g)].map(m=>clean(m[1])))];
    const filas = (d.match(/<tr><td class="label">/g)||[]).length;
    const mont = cards.filter(c=>/montage/i.test(c.t));
    console.log('\n### ' + g + suf + '   tarjetas ' + cards.length + ' | tabla ' + cols.length + ' | veredictos ' + vps.length + ' | filas ' + filas);
    if (/reverb/.test(g)) {
      const rc = cols.indexOf('Boss RC-5 Loop Station');
      console.log('   RC-5 en la tabla: ' + (rc > -1 ? 'si, columna ' + rc : 'NO'));
      console.log('   RC-5 en veredictos: ' + (vps.includes('Boss RC-5 Loop Station') ? 'si' : 'NO'));
      const fila = d.match(/<tr><td class="label">Estimated Price[\s\S]*?<\/tr>/i);
      if (fila) console.log('   precio RC-5: ' + (fila[0].match(/<td class="val">([^<]*)<\/td>/g)||[]).slice(5,6).join('').replace(/<[^>]+>/g,' ').trim());
      console.log('   tabla: ' + cols.join(' | '));
    }
    if (mont.length) console.log('   Montage: ' + mont.map(m=>'id '+m.id).join(', '));
  });
});
// RC-5 veredicto 4+4
const d = fs.readFileSync(BASE+'guides/best-reverb-delay.html','utf8');
const col = d.match(/<div class="verdict-product-name">Boss RC-5 Loop Station<\/div>([\s\S]*?)<\/div><\/div>/i);
if (col) {
  console.log('\n=== VEREDICTO RC-5 (EN) ===');
  console.log('pros: ' + (col[1].match(/<li>([^<]*)<\/li>/g)||[]).slice(0,4).map(s=>clean(s)).join(' / '));
  const cons = col[1].split('verdict-cons-list')[1] || '';
  console.log('cons: ' + (cons.match(/<li>([^<]*)<\/li>/g)||[]).slice(0,4).map(s=>clean(s)).join(' / '));
}