// EN VIVO: tarjetas vs columnas de tabla vs veredictos, para una lista de guias
const https = require('https');
function get(u){return new Promise(r=>{const q=https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r(d));});q.on('error',()=>r(''));});}
const clean = h => String(h==null?'':h).replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(n)).replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
async function pool(ids,n,fn){const o=new Array(ids.length);let i=0;await Promise.all(Array.from({length:n},async()=>{while(i<ids.length){const k=i++;o[k]=await fn(ids[k]);}}));return o;}
const ids = process.argv.slice(2);
(async()=>{
  const res = await pool(ids, 6, g => get('https://topmusiciangear.com/guides/'+g+'.html'));
  res.forEach((d,k)=>{
    const g = ids[k];
    console.log('\n######################################## ' + g);
    if (!d) { console.log('  no se pudo leer'); return; }
    // tarjetas con su id de producto
    const cards = [...d.matchAll(/openReviewModal\((\d+)\)[\s\S]{0,900}?<h3 class="guide-product-card-title">([\s\S]*?)<\/h3>/g)]
      .map(m => ({ id: m[1], t: clean(m[2]).replace(/\s*\((each|par|set|pareja)\)\s*$/i,'') }));
    const thead = (d.match(/<table class="guide-comp-table"[\s\S]*?<\/thead>/i)||[''])[0];
    const cols = [...thead.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map(m=>clean(m[1])).filter(Boolean);
    const vps = [...new Set([...d.matchAll(/<div class="verdict-product-name">([\s\S]*?)<\/div>/gi)].map(m=>clean(m[1])))];
    const heads = [...d.matchAll(/<h2 class="guide-section-heading"[^>]*>([\s\S]*?)<\/h2>/gi)].map(m=>clean(m[1]));
    console.log('  TARJETAS (' + cards.length + '):');
    cards.forEach(c => console.log('     id ' + c.id.padEnd(5) + ' ' + c.t));
    console.log('  TABLA (' + cols.length + '): ' + cols.join(' | '));
    console.log('  VEREDICTOS (' + vps.length + '): ' + vps.join(' | '));
    console.log('  SECCIONES (' + heads.length + '): ' + heads.join(' || '));
  });
})();