const https = require('https');
const clean = h => String(h).replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
function get(u){return new Promise(r=>{const q=https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r(d));});q.on('error',()=>r(''));});}
const CASOS = [
  ['mixing-plugins','REFERENCE 3'],
  ['ableton-vs-fl-studio','FL Studio All Plugins Edition'],
  ['best-compact-mixers','SQ-Rack'],
  ['wireless-lapel-mics','DJI Mic 3'],
  ['wireless-lapel-mics','DJI Mic Mini 2'],
  ['rode-wireless-pro-vs-dji-mic-2','DJI Mic 3'],
];
(async()=>{
  for (const [gid, nombre] of CASOS) {
    const d = await get('https://topmusiciangear.com/guides/'+gid+'.html');
    const cards=[...new Set([...d.matchAll(/<h3 class="guide-product-card-title">([\s\S]*?)<\/h3>/g)].map(m=>clean(m[1])))];
    const cols=[...((d.match(/<table class="guide-comp-table"[\s\S]*?<\/thead>/i)||[''])[0]).matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map(m=>clean(m[1])).filter(Boolean);
    const vps=[...new Set([...d.matchAll(/<div class="verdict-product-name">([\s\S]*?)<\/div>/gi)].map(m=>clean(m[1])))];
    console.log('\n### ' + gid + '   buscando "' + nombre + '"');
    console.log('   TARJETAS: ' + cards.join(' | '));
    console.log('   TABLA   : ' + cols.join(' | '));
    console.log('   VEREDICT: ' + vps.join(' | '));
    const enCards = cards.some(c=>c.toLowerCase().indexOf(nombre.toLowerCase())>-1);
    console.log('   -> ¿el nombre aparece literalmente en alguna tarjeta? ' + (enCards?'SI':'NO'));
  }
})();