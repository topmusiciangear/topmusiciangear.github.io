// Verificacion final en vivo: cada tarjeta debe tener veredicto y review propia,
// y cada columna de tabla debe ser una tarjeta. Matcher fiable por tokens.
const https = require('https');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const ids = require(BASE+'data/guides.json').map(g=>g.id);
function get(u){return new Promise(r=>{const q=https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r({s:s.statusCode,d:d}));});q.on('error',()=>r({s:0,d:''}));});}
const clean = h => String(h==null?'':h).replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
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
  const [EN, ES] = await Promise.all([
    Promise.all(ids.map(g=>get('https://topmusiciangear.com/guides/'+g+'.html'))),
    Promise.all(ids.map(g=>get('https://topmusiciangear.com/guides/'+g+'_es.html')))
  ]);
  const R = {
    'Columna de tabla que no es tarjeta': [],
    'Veredicto que no es tarjeta': [],
    'Tarjeta con tabla pero sin veredicto': [],
    'Tarjeta con veredicto pero sin tabla': [],
    'Producto con veredicto y SIN review propia': [],
    'Tabla con celdas vacias': [],
    'Tabla con importes': [],
    'Secciones EN != ES': [],
    'Veredicto <4 pros o <4 contras': [],
    'Pagina no cargada': []
  };
  EN.forEach((r,k)=>{
    const gid = ids[k];
    if (r.s!==200) { R['Pagina no cargada'].push(gid+' EN'); return; }
    const d = r.d;
    const cards = [...new Set([...d.matchAll(/guide-product-card-title[^>]*>([\s\S]*?)<\/h3>/g)].map(m=>clean(m[1]).replace(/\s*\((each|par|set|pareja)\)\s*$/i,'')))];
    if (!cards.length) return;
    const thead = (d.match(/<table class="guide-comp-table"[\s\S]*?<\/thead>/i)||[''])[0];
    const cols = [...thead.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map(m=>clean(m[1])).filter(Boolean);
    const bloques = [...d.matchAll(/verdict-product-name[^>]*>([\s\S]*?)<\/div>([\s\S]*?)(?=verdict-product-name|<\/section>|$)/g)];
    const vps = bloques.map(m=>clean(m[1]));
    const heads = [...d.matchAll(/<h2 class="guide-section-heading"[^>]*>([\s\S]*?)<\/h2>/gi)].map(m=>clean(m[1]));
    cols.forEach(c=>{ if(!cards.some(x=>mismo(x,c))) R['Columna de tabla que no es tarjeta'].push(gid+' | '+c); });
    vps.forEach(v=>{ if(!cards.some(x=>mismo(x,v))) R['Veredicto que no es tarjeta'].push(gid+' | '+v); });
    if (cols.length||vps.length) cards.forEach(t=>{
      const ec=cols.some(c=>mismo(t,c)), ev=vps.some(v=>mismo(t,v));
      if(ec&&!ev) R['Tarjeta con tabla pero sin veredicto'].push(gid+' | '+t);
      if(ev&&!ec) R['Tarjeta con veredicto pero sin tabla'].push(gid+' | '+t);
    });
    vps.forEach(v=>{ if(!heads.some(h=>mismo(v,h))) R['Producto con veredicto y SIN review propia'].push(gid+' | '+v); });
    bloques.forEach(m=>{
      const np=((m[2].match(/verdict-pros-list[\s\S]*?<\/ul>/)||[''])[0].match(/<li>/g)||[]).length;
      const nc=((m[2].match(/verdict-cons-list[\s\S]*?<\/ul>/)||[''])[0].match(/<li>/g)||[]).length;
      if(np<4||nc<4) R['Veredicto <4 pros o <4 contras'].push(gid+' | '+clean(m[1])+' ('+np+'/'+nc+')');
    });
    const tabla = (d.match(/<table class="guide-comp-table"[\s\S]*?<\/tbody>/i)||[''])[0];
    if (/<td class="val"><\/td>/.test(tabla)) R['Tabla con celdas vacias'].push(gid);
    if (/[$€£]\s?[0-9]/.test(tabla)) R['Tabla con importes'].push(gid);
    const e = ES[k];
    if (e.s!==200) { R['Pagina no cargada'].push(gid+' ES'); return; }
    const hEN=heads.length, hES=(e.d.match(/<h2 class="guide-section-heading"/g)||[]).length;
    if(hEN!==hES) R['Secciones EN != ES'].push(gid+' (EN '+hEN+' / ES '+hES+')');
  });
  console.log('='.repeat(70));
  console.log('  AUDITORIA FINAL EN VIVO — 314 paginas');
  console.log('='.repeat(70)+'\n');
  let total=0;
  Object.keys(R).forEach(k=>{
    const n=R[k].length; total+=n;
    console.log((n===0?'  OK   ':'       ') + k.padEnd(46) + n);
    if(n) R[k].slice(0,10).forEach(x=>console.log('            - '+x));
    if(n>10) console.log('            ... y '+(n-10)+' mas');
  });
  console.log('\n' + '-'.repeat(70));
  console.log('  TOTAL: ' + total);
  console.log('-'.repeat(70));
})();