const https = require('https');
const clean = h => String(h).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
function get(u){return new Promise(r=>{const q=https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r(d));});q.on('error',()=>r(''));});}
(async()=>{
  for (const g of ['c414-vs-u87','adams3h-vs-focal-trio11','beat-making']) {
    const d = await get('https://topmusiciangear.com/guides/'+g+'.html');
    console.log('\n######################################## ' + g);
    if (!d) { console.log('  no leida'); continue; }
    console.log('  H1: ' + clean((d.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)||[,''])[1]));
    const cards=[...new Set([...d.matchAll(/<h3 class="guide-product-card-title">([\s\S]*?)<\/h3>/g)].map(m=>clean(m[1])))];
    console.log('  TARJETAS ('+cards.length+'): '+cards.join(' | '));
    const thead=(d.match(/<table class="guide-comp-table"[\s\S]*?<\/thead>/i)||[''])[0];
    const cols=[...thead.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map(m=>clean(m[1])).filter(Boolean);
    console.log('  TABLA ('+cols.length+'): '+(cols.join(' | ')||'(sin tabla)'));
    const vps=[...new Set([...d.matchAll(/<div class="verdict-product-name">([\s\S]*?)<\/div>/gi)].map(m=>clean(m[1])))];
    console.log('  VEREDICTOS ('+vps.length+'): '+(vps.join(' | ')||'(ninguno)'));
    const heads=[...d.matchAll(/<h2 class="guide-section-heading"[^>]*>([\s\S]*?)<\/h2>/gi)].map(m=>clean(m[1]));
    console.log('  SECCIONES ('+heads.length+'):');
    heads.forEach((h,i)=>console.log('     '+(i+1)+'. '+h));
    // cuantas tarjetas tienen tarjeta de compra con bloque de review?
    console.log('  productos con bloque guide-section-prods: '+(d.match(/guide-section-prods/g)||[]).length);
  }
})();