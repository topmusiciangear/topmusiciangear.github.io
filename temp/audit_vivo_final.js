// Auditoria final corregida — veredictos anclados a <div class="verdict-product-name">
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
    'Columna que no es tarjeta': [],
    'Veredicto que no es tarjeta': [],
    'Tarjeta con tabla sin veredicto': [],
    'Tarjeta con veredicto sin tabla': [],
    'Producto SIN review propia': [],
    'Tabla con celdas vacias': [],
    'Tabla con importes': [],
    'Secciones EN != ES': [],
    'Veredicto <4+4': [],
    'Pagina no cargada': []
  };
  EN.forEach((r,k)=>{
    const gid = ids[k];
    if (r.s!==200) { R['Pagina no cargada'].push(gid+' EN HTTP '+r.s); return; }
    const d = r.d;
    const cards = [...new Set([...d.matchAll(/guide-product-card-title[^>]*>([\s\S]*?)<\/h3>/g)].map(m=>clean(m[1]).replace(/\s*\((each|cada uno|par|set|pareja)\)\s*$/i,'')))];
    if (!cards.length) return;
    const thead = (d.match(/<table class="guide-comp-table"[\s\S]*?<\/thead>/i)||[''])[0];
    const cols = [...thead.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map(m=>clean(m[1])).filter(Boolean);
    // veredictos: SOLO <div class="verdict-product-name"> (anclado, no script)
    const vdivs = [...d.matchAll(/<div class="verdict-product-name">([\s\S]*?)<\/div>/gi)];
    const vps = vdivs.map(m=>clean(m[1])).filter(Boolean);
    const vpos = vdivs.map(m=>m.index);
    vps.forEach((v,i)=>{
      const ini = vpos[i];
      const fin = i+1 < vpos.length ? vpos[i+1] : d.length;
      const bloque = d.slice(ini, fin);
      const np = ((bloque.match(/verdict-pros-list[\s\S]*?<\/ul>/)||[''])[0].match(/<li>/g)||[]).length;
      const nc = ((bloque.match(/verdict-cons-list[\s\S]*?<\/ul>/)||[''])[0].match(/<li>/g)||[]).length;
      if (np<4||nc<4) R['Veredicto <4+4'].push(gid+' | '+v+' ('+np+'/'+nc+')');
    });
    const heads = [...d.matchAll(/<h2 class="guide-section-heading"[^>]*>([\s\S]*?)<\/h2>/gi)].map(m=>clean(m[1]));
    cols.forEach(c=>{ if(!cards.some(x=>mismo(x,c))) R['Columna que no es tarjeta'].push(gid+' | '+c); });
    vps.forEach(v=>{ if(!cards.some(x=>mismo(x,v))) R['Veredicto que no es tarjeta'].push(gid+' | '+v); });
    if (cols.length||vps.length) cards.forEach(t=>{
      const ec=cols.some(c=>mismo(t,c)), ev=vps.some(v=>mismo(t,v));
      if(ec&&!ev) R['Tarjeta con tabla sin veredicto'].push(gid+' | '+t);
      if(ev&&!ec) R['Tarjeta con veredicto sin tabla'].push(gid+' | '+t);
    });
    vps.forEach(v=>{ if(!heads.some(h=>mismo(v,h))) R['Producto SIN review propia'].push(gid+' | '+v); });
    const tabla = (d.match(/<table class="guide-comp-table"[\s\S]*?<\/tbody>/i)||[''])[0];
    if (/<td class="val"><\/td>/.test(tabla)) R['Tabla con celdas vacias'].push(gid);
    if (/[$€£]\s?[0-9]/.test(tabla)) R['Tabla con importes'].push(gid);
    const e = ES[k];
    if (e.s!==200) { R['Pagina no cargada'].push(gid+' ES HTTP '+e.s); return; }
    const hEN=heads.length, hES=(e.d.match(/<h2 class="guide-section-heading"/g)||[]).length;
    if(hEN!==hES) R['Secciones EN != ES'].push(gid+' (EN '+hEN+' / ES '+hES+')');
  });
  console.log('='.repeat(70));
  console.log('  AUDITORIA FINAL EN VIVO — 314 paginas');
  console.log('='.repeat(70)+'\n');
  let total=0;
  Object.keys(R).forEach(k=>{
    const n=R[k].length; total+=n;
    console.log((n===0?'  OK   ':'       ') + k.padEnd(40) + n);
    if(n) R[k].slice(0,15).forEach(x=>console.log('            - '+x));
    if(n>15) console.log('            ... y '+(n-15)+' mas');
  });
  console.log('\n' + '-'.repeat(70));
  console.log('  TOTAL: ' + total);
  console.log('-'.repeat(70));
})();