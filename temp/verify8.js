const https = require('https');
function get(u){return new Promise(r=>{const q=https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r(d));});q.on('error',()=>r(''));});}
const clean = h => String(h).replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
const CASOS = [
  ['best-reverb-delay', 'Chase Bliss Habit', 'habit'],
  ['best-monitors', 'Kali Audio IN-8 V2', 'in-8'],
  ['budget-monitors', 'Kali Audio IN-8 V2', 'in-8'],
  ['live-sound-pa', 'Yamaha Stagepas 1K MKII', 'stagepas'],
  ['fabfilter-vs-ozone', 'FabFilter Total Bundle', 'total'],
  ['best-synthesizers', 'Sequential Take 5', 'take 5'],
  ['best-looper-pedals', 'Headrush Looperboard', 'looperboard'],
  ['best-multi-effects-pedals', 'Boss GX-1', 'gx-1']
];
(async()=>{
  for (const [g, nombre, pista] of CASOS) {
    const d = await get('https://topmusiciangear.com/guides/'+g+'.html');
    const cuerpos = [...d.matchAll(/<div class="guide-section-content"[^>]*>([\s\S]*?)<\/div>\s*(?:<div class="guide-section-(?:prods|buy|imgs|mediabuy)"|<\/section>)/gi)].map(m=>clean(m[1]));
    const txt = cuerpos.join(' || ');
    const heads = [...d.matchAll(/<h2 class="guide-section-heading"[^>]*>([\s\S]*?)<\/h2>/gi)].map(m=>clean(m[1]));
    const h2ok = heads.filter(h => h.toLowerCase().indexOf(pista) > -1);
    const bodyOk = txt.toLowerCase().indexOf(pista) > -1;
    console.log('\n### ' + g + ' -> ' + nombre);
    console.log('   heading que lo nombra: ' + (h2ok.length ? h2ok.join(' | ') : 'NINGUNO'));
    console.log('   aparece en el cuerpo : ' + (bodyOk ? 'SI' : 'NO'));
    if (!bodyOk) {
      console.log('   --- todos los H2 ---');
      heads.forEach(h=>console.log('      ' + h));
      console.log('   --- primeros 500 chars del cuerpo ---');
      console.log('      ' + txt.slice(0,500));
    } else {
      const i = txt.toLowerCase().indexOf(pista);
      console.log('   contexto: ...' + txt.slice(Math.max(0,i-120), i+160) + '...');
    }
  }
})();