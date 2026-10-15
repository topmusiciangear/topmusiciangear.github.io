const https = require('https');
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
function get(u){return new Promise(r=>{const q=https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r(d));});q.on('error',()=>r(''));});}
const clean = h => String(h).replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(n)).replace(/\s+/g,' ').trim();
async function pool(ids,n,fn){const o=new Array(ids.length);let i=0;await Promise.all(Array.from({length:n},async()=>{while(i<ids.length){const k=i++;o[k]=await fn(ids[k]);}}));return o;}

// solo Patterns REALES: verbo de decision sin objeto
const RE = /(?:whether|if|when|where|how)\s+(?:consider|choosing|choose|deciding|looking|going|need to)\b/gi;
const RE2 = /\b(?:consider|choose|choosing|deciding)\s+(?:whether|if|when)\b/gi;
(async()=>{
  const guias = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8')).map(g=>g.id);
  const res = await pool(guias, 8, async g => {
    const en = await get(`https://topmusiciangear.com/guides/${g}.html`);
    const es = await get(`https://topmusiciangear.com/guides/${g}_es.html`);
    return { g, en, es };
  });
  const frasesES = new Set();
  let nGuia = 0, nFrase = 0;
  for (const { g, en, es } of res) {
    const secs = [...en.matchAll(/<div class="guide-section-content"[^>]*>([\s\S]*?)<\/div>\s*(?:<div class="guide-section-(?:prods|buy|imgs|mediabuy)"|<\/section>)/gi)].map(m=>clean(m[1]));
    const intro = clean((en.match(/<div class="guide-detail-intro"[^>]*>([\s\S]*?)<\/div>/i)||[,''])[1]);
    const txt = intro + ' || ' + secs.join(' || ');
    const found = [];
    for (const re of [RE, RE2]) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(txt))) {
        // frase completa alrededor
        const ini = txt.lastIndexOf('.', m.index) + 1;
        const fin = txt.indexOf('.', m.index + m[0].length);
        found.push(txt.slice(ini, fin > 0 ? fin + 1 : ini + 160).trim());
      }
    }
    if (found.length) {
      nGuia++; nFrase += found.length;
      console.log('\n### ' + g + '  (' + found.length + ')');
      [...new Set(found)].forEach(f => console.log('   EN> ' + f));
      // buscar equivalente ES
      const sSecs = [...es.matchAll(/<div class="guide-section-content"[^>]*>([\s\S]*?)<\/div>\s*(?:<div class="guide-section-(?:prods|buy|imgs|mediabuy)"|<\/section>)/gi)].map(m=>clean(m[1]));
      const sTxt = sSecs.join(' || ');
      const sHits = sTxt.match(/(\b(si|cuando|depende|eligiendo|considerando)\b[^.]{0,60}\b(considera|considerar|elige|elegir)\b)/gi);
      if (sHits) { sHits.slice(0,3).forEach(s=>{ frasesES.add(g+' :: '+s.trim()); }); }
    }
  }
  console.log('\n===== RESUMEN: ' + nGuia + ' guias con frases rotas, ' + nFrase + ' frases EN');
  if (frasesES.size) { console.log('\nES Sospechosas:'); [...frasesES].forEach(f=>console.log('   ' + f)); }
})();