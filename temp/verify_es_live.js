const https = require('https');
function get(u){return new Promise(r=>{const q=https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r(d));});q.on('error',()=>r(''));});}
const clean = h => String(h).replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
(async()=>{
  for (const gid of ['live-sound-pa','active-vs-passive-pa']) {
    const d = await get('https://topmusiciangear.com/guides/'+gid+'_es.html');
    const cards=[...new Set([...d.matchAll(/guide-product-card-title[^>]*>([\s\S]*?)<\/h3>/g)].map(m=>clean(m[1]).replace(/\s*\(cada uno\)\s*$/,'')))];
    console.log('### ' + gid + '_es');
    cards.forEach(c=>console.log('  '+c));
    // buscar el DBR12
    const i = d.indexOf('Yamaha DBR12');
    if (i > -1) {
      const chunk = d.slice(i, i+1200);
      const desc = (chunk.match(/guide-product-card-desc[^>]*>([\s\S]*?)<\/p>/i)||[])[1]||'';
      console.log('  DBR12 desc_es: ' + clean(desc).slice(0,180));
    }
    console.log('');
  }
})();