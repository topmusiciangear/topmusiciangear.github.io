const https = require('https');
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const clean = h => String(h).replace(/<[^>]+>/g, ' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
function get(u){
  return new Promise(r=>{
    const req = https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{
      let d=''; s.on('data',c=>d+=c); s.on('end',()=>r({s:s.statusCode,d:d}));
    });
    req.on('error',()=>r({s:0,d:''}));
  });
}
const gids = fs.readFileSync(BASE+'temp/live_pending.txt','utf8').split('\n')
  .map(l => { const p = l.trim().split('|')[0].replace(/^\d+\.\s*/, '').trim(); return /^[a-z0-9-]+$/.test(p) ? p : null; })
  .filter(Boolean);
(async()=>{
 console.log('guias a comprobar: ' + gids.length);
 for (const g of gids) {
   const [en, es] = await Promise.all([
     get(`https://topmusiciangear.com/guides/${g}.html`),
     get(`https://topmusiciangear.com/guides/${g}_es.html`)
   ]);
   const nE = (en.d.match(/<h2 class="guide-section-heading"/g)||[]).length;
   const nS = (es.d.match(/<h2 class="guide-section-heading"/g)||[]).length;
   const vE = new Set([...en.d.matchAll(/<div class="verdict-product-name">([\s\S]*?)<\/div>/g)].map(m=>clean(m[1]))).size;
   const vS = new Set([...es.d.matchAll(/<div class="verdict-product-name">([\s\S]*?)<\/div>/g)].map(m=>clean(m[1]))).size;
   const fE = (en.d.match(/class="guide-faq-item"/g)||[]).length;
   const fS = (es.d.match(/class="guide-faq-item"/g)||[]).length;
   const ok = (nE===nS && vE===vS && fE===fS);
   console.log((ok?'OK   ':'DIFF ') + g.padEnd(32) +
     ' secciones EN/ES ' + nE + '/' + nS +
     ' | veredictos ' + vE + '/' + vS +
     ' | FAQs ' + fE + '/' + fS);
 }
})();