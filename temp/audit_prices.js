// AUDIT DE PRECIOS EN BOTONES: HTML local (todas las guias) + muestra en vivo
const fs = require('fs');
const https = require('https');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

function get(u){return new Promise(r=>{const q=https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r({s:s.statusCode,d:d}));});q.on('error',()=>r({s:0,d:''}));});}
const clean = h => String(h).replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();

// ═══ 1) HTML LOCAL: todos los botones primarios ═══
console.log('='.repeat(72));
console.log('  A) HTML GENERADO EN LOCAL');
console.log('='.repeat(72));
const files = fs.readdirSync(BASE+'guides').filter(f=>f.endsWith('.html') && !f.includes('_es'));
let total = 0, conPrecio = 0, sinPrecio = 0;
const sinPrecioPorGuia = {};
files.forEach(f=>{
  const d = fs.readFileSync(BASE+'guides/'+f,'utf8');
  // botones primarios: data-price='€599' con comillas simples
  const btns = [...d.matchAll(/<a[^>]*class="shop-btn-primary"[^>]*>([\s\S]*?)<\/a>/g)];
  btns.forEach(m=>{
    total++;
    const tiene = /data-price=/.test(m[0]);
    if (tiene) conPrecio++; else { sinPrecio++; sinPrecioPorGuia[f]=(sinPrecioPorGuia[f]||0)+1; }
  });
});
console.log('botones primarios totales: ' + total);
console.log('  CON precio (data-price): ' + conPrecio + '  (' + Math.round(conPrecio/total*100) + '%)');
console.log('  SIN precio:               ' + sinPrecio + '  (' + Math.round(sinPrecio/total*100) + '%)');
const sinEn = Object.keys(sinPrecioPorGuia).length;
console.log('guias con al menos un boton sin precio: ' + sinEn + ' de ' + files.length);
const top = Object.entries(sinPrecioPorGuia).sort((a,b)=>b[1]-a[1]).slice(0,8);
console.log('\npeores guias:');
top.forEach(([f,n])=>console.log('  ' + String(n).padStart(3) + ' sin precio  ' + f));

// ═══ 2) VIVO: muestra ═══
(async()=>{
  console.log('\n' + '='.repeat(72));
  console.log('  B) EN VIVO (muestra de 12 guias)');
  console.log('='.repeat(72));
  const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8')).map(g=>g.id);
  const muestra = ['starter-studio','live-sound-pa','active-vs-passive-pa','best-interface',
                   'budget-mics','best-monitors','stage-mics','best-headphones',
                   'best-synthesizers','guitar-pedals','best-drum-machine','best-plugins'];
  for (const gid of muestra) {
    if (!guides.includes(gid)) continue;
    const r = await get('https://topmusiciangear.com/guides/'+gid+'.html');
    if (r.s!==200) { console.log('  ' + gid.padEnd(24) + ' HTTP ' + r.s); continue; }
    const d = r.d;
    const btns = [...d.matchAll(/<a[^>]*class="shop-btn-primary"[^>]*>([\s\S]*?)<\/a>/g)];
    let cp=0, sp=0;
    btns.forEach(m=>{ if(/data-price=/.test(m[0])) cp++; else sp++; });
    // tambien el mapa embebido TEST_SHOP_BTN
    const mapa = /TEST_SHOP_BTN\s*=\s*\{/.test(d) || /"TEST_SHOP_BTN"/.test(d);
    console.log('  ' + gid.padEnd(24) + ' botones ' + String(btns.length).padStart(3) +
      ' | con precio ' + String(cp).padStart(3) + ' | sin ' + String(sp).padStart(3) +
      ' | mapa embebido: ' + (mapa?'si':'NO'));
  }
})();