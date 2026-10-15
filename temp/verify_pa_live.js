// Verificación en vivo de las dos guías PA tras el renombrado.
const https = require('https');
function get(u){return new Promise(r=>{const q=https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r(d));});q.on('error',()=>r(''));});}
const clean = h => String(h).replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
const norm = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[\u00f1\u00d1]/g,'n').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
function mismo(p, t) {
  const kp = norm(p).split(' ').filter(w=>w.length>1);
  const kt = norm(t).split(' ').filter(w=>w.length>1);
  if (!kp.length || !kt.length) return false;
  const h = ' ' + norm(t) + ' ';
  const tiene = w => h.indexOf(' ' + w + ' ') > -1;
  const req = kp.length > 1 ? kp.slice(1) : kp;
  if (req.length && req.every(tiene)) return true;
  return kp.length > 1 && kp.some(t => tiene(t) && (/\d/.test(t) || t.length >= 5));
}
(async()=>{
  for (const gid of ['live-sound-pa','active-vs-passive-pa']) {
    const d = await get('https://topmusiciangear.com/guides/'+gid+'.html');
    const cards = [...new Set([...d.matchAll(/guide-product-card-title[^>]*>([\s\S]*?)<\/h3>/g)].map(m=>clean(m[1]).replace(/\s*\(each\)\s*$/,'')))];
    const thead = (d.match(/<table class="guide-comp-table"[\s\S]*?<\/thead>/i)||[''])[0];
    const cols = [...thead.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map(m=>clean(m[1])).filter(Boolean);
    const vps = [...new Set([...d.matchAll(/verdict-product-name[^>]*>([\s\S]*?)<\/div>/gi)].map(m=>clean(m[1])))];
    console.log('### ' + gid);
    console.log('tarjetas: ' + cards.length + ' | tabla: ' + cols.length + ' | veredictos: ' + vps.length);
    let malT = 0, malV = 0;
    cols.forEach(c=>{ if(!cards.some(x=>mismo(x,c))) { malT++; console.log('  COLUMNA no es tarjeta: ' + c); } });
    vps.forEach(v=>{ if(!cards.some(x=>mismo(x,v))) { malV++; console.log('  VEREDICTO no es tarjeta: ' + v); } });
    cards.forEach(t=>{
      const ec = cols.some(c=>mismo(t,c)), ev = vps.some(v=>mismo(t,v));
      if (ec && !ev) console.log('  tarjeta con tabla sin veredicto: ' + t);
      if (ev && !ec) console.log('  tarjeta con veredicto sin tabla: ' + t);
    });
    if (!malT && !malV) console.log('  OK: tabla y veredictos coinciden con las tarjetas');
    console.log('');
  }
})();