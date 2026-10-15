// Verificacion EN VIVO de starter-studio tras el deploy
const https = require('https');
function get(u){return new Promise(r=>{const q=https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r({s:s.statusCode,d:d}));});q.on('error',()=>r({s:0,d:''}));});}
const clean = h => String(h).replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
const norm = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[\u00f1\u00d1]/g,'n').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
function mismo(p,t){const kp=norm(p).split(' ').filter(w=>w.length>1);if(!kp.length)return false;const h=' '+norm(t)+' ';const tiene=w=>h.indexOf(' '+w+' ')>-1;const req=kp.length>1?kp.slice(1):kp;if(req.length&&req.every(tiene))return true;return kp.some(t=>tiene(t)&&(/\d/.test(t)||t.length>=5));}

(async()=>{
  for (const [gid,lang] of [['starter-studio',''],['starter-studio','_es']]) {
    const r = await get('https://topmusiciangear.com/guides/'+gid+lang+'.html');
    console.log('\n### '+gid+lang+'.html  HTTP '+r.s);
    if (r.s!==200) continue;
    const d = r.d;
    console.log('  title: ' + ((d.match(/<title>([^<]*)<\/title>/)||[])[1]||'?').trim());
    console.log('  h1:    ' + clean(((d.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)||[])[1]||'')));
    console.log('  desc:  ' + ((d.match(/<meta name="description" content="([^"]*)"/)||[])[1]||'?').slice(0,100));
    const cards=[...new Set([...d.matchAll(/guide-product-card-title[^>]*>([\s\S]*?)<\/h3>/g)].map(m=>clean(m[1]).replace(/\s*\((each|cada uno|par)\)\s*$/i,'')))];
    const thead=(d.match(/<table class="guide-comp-table"[\s\S]*?<\/thead>/i)||[''])[0];
    const cols=[...thead.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map(m=>clean(m[1])).filter(Boolean);
    const vps=[...new Set([...d.matchAll(/<div class="verdict-product-name">([\s\S]*?)<\/div>/gi)].map(m=>clean(m[1])))];
    const heads=[...d.matchAll(/<h2 class="guide-section-heading"[^>]*>([\s\S]*?)<\/h2>/gi)].map(m=>clean(m[1]));
    console.log('  TARJETAS ('+cards.length+'):');
    cards.forEach(c=>console.log('    - '+c));
    console.log('  TABLA ('+cols.length+' columnas): '+cols.join(' | '));
    console.log('  VEREDICTOS ('+vps.length+'): '+vps.join(' | '));
    console.log('  SECCIONES ('+heads.length+'):');
    heads.forEach(h=>console.log('    '+h.slice(0,70)));
    // checks
    console.log('  --- checks ---');
    cols.forEach(c=>{ if(!cards.some(x=>mismo(x,c))) console.log('    !! columna no es tarjeta: '+c); });
    vps.forEach(v=>{ if(!cards.some(x=>mismo(x,v))) console.log('    !! veredicto no es tarjeta: '+v); });
    vps.forEach(v=>{ if(!heads.some(h=>mismo(v,h))) console.log('    !! sin review propia: '+v); });
    if (/<td class="val"><\/td>/.test(d)) console.log('    !! celdas vacias');
    if (/[$€£]\s?[0-9]/.test((d.match(/<table class="guide-comp-table"[\s\S]*?<\/tbody>/i)||[''])[0])) console.log('    !! importes en tabla');
    console.log('    (sin avisos = todo ok)');
  }
})();