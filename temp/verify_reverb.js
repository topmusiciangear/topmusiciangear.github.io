const https = require('https');
function get(u){return new Promise(r=>{const q=https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r(d));});q.on('error',()=>r(''));});}
const clean = h => String(h).replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(n)).replace(/\s+/g,' ').trim();
(async()=>{
  const d = await get('https://topmusiciangear.com/guides/best-reverb-delay.html');
  const es = await get('https://topmusiciangear.com/guides/best-reverb-delay_es.html');

  console.log('=== VEREDICTOS (nombre exacto en vivo) ===');
  [...d.matchAll(/<div class="verdict-product-name">([\s\S]*?)<\/div>/gi)]
    .forEach((m,i)=>console.log('  ' + (i+1) + '. ' + clean(m[1])));

  console.log('\n=== H2 DE SECCION (EN) ===');
  const h2 = [...d.matchAll(/<h2 class="guide-section-heading"[^>]*>([\s\S]*?)<\/h2>/gi)].map(m=>clean(m[1]));
  h2.forEach((h,i)=>console.log('  ' + (i+1) + '. ' + h));

  console.log('\n=== H2 DE SECCION (ES) ===');
  [...es.matchAll(/<h2 class="guide-section-heading"[^>]*>([\s\S]*?)<\/h2>/gi)]
    .forEach((m,i)=>console.log('  ' + (i+1) + '. ' + clean(m[1])));

  console.log('\n=== COLUMNAS DE LA TABLA ===');
  const thead = (d.match(/<table class="guide-comp-table"[\s\S]*?<\/thead>/i)||[''])[0];
  [...thead.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map(m=>clean(m[1])).filter(Boolean)
    .forEach((t,i)=>console.log('  ' + (i+1) + '. ' + t));

  console.log('\n=== TARJETAS DE PRODUCTO (con su id) ===');
  const cards = [...d.matchAll(/openReviewModal\((\d+)\)[\s\S]{0,900}?<h3 class="guide-product-card-title">([\s\S]*?)<\/h3>/gi)];
  cards.forEach((m,i)=>console.log('  ' + (i+1) + '. id ' + m[1] + '  ' + clean(m[2])));

  console.log('\n=== ¿aparece "Habit" en algun sitio? ===');
  console.log('  en H2 EN   : ' + h2.filter(h=>/habit/i.test(h)).join(' | ') || 'NO');
  console.log('  en H2 ES   : ' + [...es.matchAll(/<h2 class="guide-section-heading"[^>]*>([\s\S]*?)<\/h2>/gi)].map(m=>clean(m[1])).filter(h=>/habit/i.test(h)).join(' | ') || 'NO');
  console.log('  en toda la pagina EN: ' + ((d.match(/habit/gi)||[]).length) + ' apariciones');
  const idx = d.toLowerCase().indexOf('habit');
  if (idx>0) console.log('  contexto: ...' + clean(d.slice(idx-300, idx+200)) + '...');
})();