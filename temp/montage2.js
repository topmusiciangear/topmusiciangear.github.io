const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const b = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
[12, 639].forEach(id => {
  const re = new RegExp('(^|\\n)\\s*' + id + ':\\s*\\{[\\s\\S]*?\\n\\s*\\},', 'm');
  const m = b.match(re);
  console.log('\n=== TEST_SHOP_BTN id ' + id + ' ===');
  console.log(m ? m[0].trim().slice(0, 700) : 'NO TIENE ENTRADA');
});
// vivo: que id sale en cada guia
const https = require('https');
function get(u){return new Promise(r=>{const q=https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r(d));});q.on('error',()=>r(''));});}
(async()=>{
  console.log('\n=== EN VIVO: tarjeta del Montage M8x por guia ===');
  for (const g of ['best-synthesizers','best-stage-keyboards','nord-stage-4-vs-montage-m8x']) {
    const d = await get('https://topmusiciangear.com/guides/' + g + '.html');
    if (!d) { console.log(g + ': no leida'); continue; }
    const cards = [...d.matchAll(/openReviewModal\((\d+)\)[\s\S]{0,900}?<h3 class="guide-product-card-title">([\s\S]*?)<\/h3>/g)]
      .map(m => ({ id: m[1], t: m[2].replace(/<[^>]+>/g,' ').trim() }));
    const mont = cards.filter(c => /montage/i.test(c.t));
    console.log('  ' + g.padEnd(30) + (mont.length ? mont.map(m => 'id ' + m.id + ' = ' + m.t).join(' | ') : 'sin tarjeta Montage'));
    console.log('      total tarjetas: ' + cards.length);
  }
})();