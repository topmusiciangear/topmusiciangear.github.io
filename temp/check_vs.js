const https = require('https');
const clean = h => String(h).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
function get(u){return new Promise(r=>{https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r(d));});});}
(async()=>{
 for (const g of ['sm57-vs-sm58','j48-vs-rndi','best-headphones-for-mixing','best-in-ear-monitors']) {
  const b = await get('https://topmusiciangear.com/guides/'+g+'.html');
  console.log('\n===== ' + g);
  [...b.matchAll(/<h2 class="guide-section-heading"[^>]*>([\s\S]*?)<\/h2>/gi)].forEach((m,i)=>
    console.log('  ' + (i+1) + '. ' + clean(m[1])));
 }
})();