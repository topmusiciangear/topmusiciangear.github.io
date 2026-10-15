const https = require('https');
function get(u){return new Promise(r=>{const q=https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r({s:s.statusCode,d:d}));});q.on('error',()=>r({s:0,d:''}));});}
const clean = h => String(h).replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
(async()=>{
  for (const gid of ['scarlett-vs-volt','dxr-vs-prx','best-samplers-drum-computers','best-reverb-delay','stream-controllers','di-box']) {
    const r = await get('https://topmusiciangear.com/guides/'+gid+'.html');
    if (r.s!==200) { console.log(gid+': HTTP '+r.s); continue; }
    const heads = [...r.d.matchAll(/<h2 class="guide-section-heading"[^>]*>([\s\S]*?)<\/h2>/gi)].map(m=>clean(m[1]));
    console.log('### ' + gid);
    heads.forEach((h,i)=>console.log('  '+(i+1)+'. '+h));
    console.log('');
  }
})();