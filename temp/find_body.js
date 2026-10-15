const https = require('https');
const fs = require('fs');
function get(u){return new Promise(r=>{const q=https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r(d));});q.on('error',()=>r(''));});}
(async()=>{
  const d = await get('https://topmusiciangear.com/guides/best-digital-pianos.html');
  fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/live_piano.html', d, 'utf8');
  // clases de los div que envuelven el contenido
  const clases = [...new Set([...d.matchAll(/<div class="(guide-[a-z-]+)"/g)].map(m=>m[1]))];
  console.log('clases guide-*: ' + clases.join(', '));
  const m = d.match(/<div class="guide-content">([\s\S]*?)<div class="guide-faq">/i);
  console.log('\nextraccion guide-content -> guide-faq: ' + (m ? m[1].length + ' chars' : 'NO MATCH'));
  const m2 = d.match(/id="sec-1"[\s\S]{0,400}/);
  console.log('\n--- 400 chars tras el primer h2 de seccion ---');
  console.log(m2 ? m2[0] : 'nada');
})();