const https = require('https');
const clean = h => String(h).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
function get(u){return new Promise(r=>{const q=https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r(d));});q.on('error',()=>r(''));});}
const CASOS = ['sidechain-modulation-plugins','pro-plugins','adams3h-vs-focal-trio11','yamaha-mg-vs-behringer-xenyx','fix-clipping-scarlett','best-samplers-drum-computers','c414-vs-u87','beatmaker-plugins'];
(async()=>{
  for (const g of CASOS) {
    const d = await get('https://topmusiciangear.com/guides/'+g+'.html');
    if (!d) { console.log('\n### ' + g + ': no leida'); continue; }
    console.log('\n############ ' + g);
    const cards = [...new Set([...d.matchAll(/<h3 class="guide-product-card-title">([\s\S]*?)<\/h3>/g)].map(m=>clean(m[1])))];
    const thead = (d.match(/<table class="guide-comp-table"[\s\S]*?<\/thead>/i)||[''])[0];
    const cols = [...thead.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map(m=>clean(m[1])).filter(Boolean);
    const vps = [...new Set([...d.matchAll(/<div class="verdict-product-name">([\s\S]*?)<\/div>/gi)].map(m=>clean(m[1])))];
    console.log('  TARJETAS (' + cards.length + '): ' + cards.join(' | '));
    console.log('  TABLA    (' + cols.length + '): ' + (cols.join(' | ') || '(sin tabla)'));
    console.log('  VEREDIC. (' + vps.length + '): ' + (vps.join(' | ') || '(sin veredictos)'));
  }
})();