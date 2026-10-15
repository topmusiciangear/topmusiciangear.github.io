const https = require('https');
const clean = h => String(h).replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
function get(u){return new Promise(r=>{const q=https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r(d));});q.on('error',()=>r(''));});}
// muestra representativa: una guia con secciones de categoria, una vs, y una normal
[['best-digital-pianos','Roland FP-30X'],['active-vs-passive-pa','Mackie SRT215'],['live-sound-pa','EV ZLX-12P-G2'],['guitar-pedals','Boss TU-3'],['stream-controllers','RØDE RØDECaster Pro II']].forEach(()=>{});
(async()=>{
  const CASOS = [['best-digital-pianos','Roland FP-30X'],['active-vs-passive-pa','Mackie SRT215'],['live-sound-pa','EV ZLX-12P-G2 Powered Speaker'],['guitar-pedals','Boss TU-3 Chromatic Tuner'],['stream-controllers','RØDE RØDECaster Pro II'],['di-box','LR Baggs Para Acoustic DI']];
  for (const [gid, prod] of CASOS) {
    const d = await get('https://topmusiciangear.com/guides/'+gid+'.html');
    const heads=[...d.matchAll(/<h2 class="guide-section-heading"[^>]*>([\s\S]*?)<\/h2>/gi)].map(m=>clean(m[1]));
    console.log('\n### ' + gid + '  ->  ' + prod);
    heads.forEach((h,i)=>console.log('   '+(i+1)+'. '+h));
  }
})();