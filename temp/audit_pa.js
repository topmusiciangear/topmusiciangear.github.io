const https = require('https');
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const clean = h => String(h==null?'':h).replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
function get(u){return new Promise(r=>{const q=https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r(d));});q.on('error',()=>r(''));});}
const P = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const arr = Array.isArray(P)?P:P.products;
const byTitle = {}; arr.forEach(p=>byTitle[p.title]=p);

(async()=>{
  for (const gid of ['live-sound-pa','active-vs-passive-pa']) {
    const d = await get('https://topmusiciangear.com/guides/'+gid+'.html');
    console.log('\n############################################### ' + gid);
    console.log('H1: ' + clean((d.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)||[,''])[1]));
    const cards=[...d.matchAll(/openReviewModal\((\d+)\)[\s\S]{0,900}?<h3 class="guide-product-card-title">([\s\S]*?)<\/h3>/g)]
      .map(m=>({id:m[1], t:clean(m[2]).replace(/\s*\(each\)\s*$/,'')}));
    const cols=[...((d.match(/<table class="guide-comp-table"[\s\S]*?<\/thead>/i)||[''])[0]).matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map(m=>clean(m[1])).filter(Boolean);
    const vps=[...d.matchAll(/<div class="verdict-product-name">([\s\S]*?)<\/div>/gi)].map(m=>clean(m[1]));
    const heads=[...d.matchAll(/<h2 class="guide-section-heading"[^>]*>([\s\S]*?)<\/h2>/gi)].map(m=>clean(m[1]));
    console.log('\nTARJETAS (' + cards.length + '):');
    cards.forEach(c=>{
      const cat = byTitle[c.t];
      console.log('  id ' + c.id.padEnd(4) + ' ' + c.t);
      console.log('        en catalogo: ' + (cat ? 'id '+cat.id : '*** NO EXISTE ***'));
    });
    console.log('\nTABLA (' + cols.length + '): ' + cols.join(' | '));
    console.log('\nVEREDICTOS (' + vps.length + '): ' + vps.join(' | '));
    console.log('\nREVIEWS (' + heads.length + '):');
    heads.forEach((h,i)=>console.log('  ' + (i+1) + '. ' + h));
    console.log('\n--- CRUCE ---');
    cards.forEach(c=>{
      const enTabla = cols.some(x=>clean(x).toLowerCase()===c.t.toLowerCase());
      const enVp = vps.some(x=>clean(x).toLowerCase()===c.t.toLowerCase());
      const enRev = heads.some(h=>h.toLowerCase().indexOf(c.t.split(' ')[0].toLowerCase())>-1 && h.toLowerCase().indexOf(c.t.split(' ').slice(-1)[0].toLowerCase().replace(/[^a-z0-9]/gi,''))>-1);
      console.log('  ' + (enTabla?'tabla ':'  -   ') + ' ' + (enVp?'veredicto ':'   -      ') + ' ' + (enRev?'review':'  -    ') + '  ' + c.t);
    });
  }
})();