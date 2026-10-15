const https = require('https');
function get(u){return new Promise(r=>{const q=https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r(d));});q.on('error',()=>r(''));});}
const clean = h => String(h).replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
(async()=>{
  const d = await get('https://topmusiciangear.com/guides/active-vs-passive-pa_es.html');
  // localizar el h3 de la tarjeta DBR12
  const m = d.match(/guide-product-card-title[^>]*>([\s\S]*?)<\/h3>/g) || [];
  let idx = -1;
  for (const h of m) { if (/Yamaha DBR12/.test(h)) { idx = d.indexOf(h); break; } }
  console.log('tarjeta encontrada: ' + (idx>-1));
  const chunk = d.slice(idx, idx+4000);
  //清单 de elementos con clase
  const els = [...chunk.matchAll(/class="([^"]{3,60})"/g)].map(x=>x[1]);
  const uniq = [...new Set(els)];
  console.log('clases en el bloque: ' + uniq.join(' | '));
  // cualquier texto tras el h3
  const after = clean(chunk).slice(0, 700);
  console.log('\ntras el título:\n' + after);
})();