const https = require('https');
function get(u){return new Promise(r=>{const q=https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r(d));});q.on('error',()=>r(''));});}
const clean = h => String(h).replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
(async()=>{
  for (const gid of ['live-sound-pa_es','active-vs-passive-pa_es']) {
    const d = await get('https://topmusiciangear.com/guides/'+gid+'.html');
    // encontrar el bloque de la tarjeta del DBR12
    const i = d.indexOf('Yamaha DBR12');
    if (i < 0) { console.log(gid + ': no aparece DBR12'); continue; }
    const chunk = d.slice(Math.max(0,i-200), i+3000);
    // cualquier <p> o clase con "desc" / "text" cerca
    const ps = [...chunk.matchAll(/<(p|div|span)[^>]*class="[^"]*(?:desc|text|card)[^"]*"[^>]*>([\s\S]*?)<\/\1>/gi)].map(m=>clean(m[2])).filter(Boolean).slice(0,6);
    console.log('### ' + gid + ' — textos de la tarjeta DBR12:');
    ps.forEach(p=>console.log('  • ' + p.slice(0,220)));
    if (!ps.length) {
      // volcar crudo alrededor
      const raw = chunk.replace(/\s+/g,' ').slice(0,900);
      console.log('  [crudo] ' + raw);
    }
    console.log('');
  }
})();