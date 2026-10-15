// Defectos de texto en el HTML publicado: frases rotas por relleno de plantilla
const https = require('https');
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
function get(u){return new Promise(r=>{const q=https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r(d));});q.on('error',()=>r(''));});}
const clean = h => String(h).replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(n)).replace(/\s+/g,' ').trim();
async function pool(ids,n,fn){const o=new Array(ids.length);let i=0;await Promise.all(Array.from({length:n},async()=>{while(i<ids.length){const k=i++;o[k]=await fn(ids[k]);}}));return o;}

// patrones de frase rota
const PATRONES = [
  [/\b(whether|if|when|where|how) (consider|choosing|choose|deciding|looking)\b/gi, 'oracion incompleta tras "whether/if"'],
  [/\bconsider whether\b.*\bconsider\b/gi, 'consider duplicado'],
  [/\b(\w+) (if consider|if choosing|if you)\b/gi, 'frase sin verbo'],
  [/\b(is|are|was|were|the|a|an|to|of|in|for|with|and) (consider|choose|looking)\b/gi, 'verbo suelto'],
  [/ ([A-Z][a-z]+) (calm|clean|pro|simple|clear) /g, 'marca sin aposito'],
  [/\? \?/g, 'interrogacion doble'],
  [/\bthe the\b|\ba a\b|\bof of\b|\bis is\b|\band and\b|\bto to\b/gi, 'palabra duplicada'],
  [/\bin in\b|\bto to\b|\bfor for\b|\bwith with\b/gi, 'palabra duplicada'],
  [/\s{2,}[a-z]/g, 'espacio doble'],
  [/\b(TODO|TBD|FIXME|XXX|Lorem)\b/gi, 'placeholder'],
];
(async()=>{
  const guias = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8')).map(g=>g.id);
  const res = await pool(guias, 8, async g => {
    const en = await get(`https://topmusiciangear.com/guides/${g}.html`);
    const es = await get(`https://topmusiciangear.com/guides/${g}_es.html`);
    return { g, en, es };
  });
  let total = 0;
  for (const { g, en, es } of res) {
    const secs = [...en.matchAll(/<div class="guide-section-content"[^>]*>([\s\S]*?)<\/div>\s*(?:<div class="guide-section-(?:prods|buy|imgs|mediabuy)"|<\/section>)/gi)].map(m=>clean(m[1]));
    const txt = secs.join(' ');
    const intro = clean((en.match(/<div class="guide-detail-intro"[^>]*>([\s\S]*?)<\/div>/i)||[,''])[1]);
    const conc = clean((en.match(/<div class="guide-conclusion-content"[^>]*>([\s\S]*?)<\/div>/i)||[,''])[1]);
    const todo = (intro + ' ' + txt + ' ' + conc);
    const hits = [];
    for (const [re, desc] of PATRONES) {
      re.lastIndex = 0;
      const m = todo.match(re);
      if (m) {
        const uniq = [...new Set(m.map(x=>x.trim()))].slice(0,4);
        hits.push({ desc, uniq });
      }
    }
    if (hits.length) {
      total++;
      console.log('\n### ' + g);
      hits.forEach(h => console.log('   [' + h.desc + '] ' + h.uniq.map(u=>'"'+u+'"').join('  |  ')));
    }
  }
  console.log('\nGUIAS CON DEFECTOS DE FRASE: ' + total + ' de ' + res.length);
})();