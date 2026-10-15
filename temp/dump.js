const https = require('https');
const clean = h => String(h).replace(/<[^>]+>/g, ' ').replace(/&amp;/g,'&').replace(/\s+/g, ' ').trim();
function get(u){return new Promise(r=>{https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r(d));});});}
(async()=>{
 for (const g of process.argv.slice(2)) {
  const b = await get('https://topmusiciangear.com/guides/'+g+'.html');
  console.log('\n===== ' + g + '  (' + clean((b.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)||['',''])[1]) + ')');
  console.log('-- SECCIONES:');
  [...b.matchAll(/<h2 class="guide-section-heading"[^>]*>([\s\S]*?)<\/h2>/gi)].forEach((m,i)=>
    console.log('   ' + (i+1) + '. ' + clean(m[1])));
  console.log('-- VEREDICTOS (con su longest 1er parrafo):');
  const vg = b.match(/<div class="guide-verdict-grid">([\s\S]*?)<\/div><\/div>/i);
  if (vg) [...vg[1].matchAll(/<div class="verdict-product-name">([\s\S]*?)<\/div>/gi)].forEach(m=>
    console.log('   * ' + clean(m[1])));
 }
})();