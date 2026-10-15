// ============================================================================
//  AUDITORIA FINAL — 100% sobre el HTML publicado (314 paginas EN+ES)
//  Reglas:
//   1. lo que se ve en vivo es la verdad (nada se lee de guides.json)
//   2. las tarjetas mandan: tabla y veredictos deben coincidir con ellas
//   3. ningun nombre puede quedar viejo: todo debe resolver a una tarjeta
// ============================================================================
const https = require('https');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const ids = require(BASE+'data/guides.json').map(g => g.id);

function get(u){return new Promise(r=>{const q=https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r({s:s.statusCode,d:d}));});q.on('error',()=>r({s:0,d:''}));});}
async function pool(n0,n,fn){const o=new Array(n0.length);let i=0;await Promise.all(Array.from({length:n},async()=>{while(i<n0.length){const k=i++;o[k]=await fn(n0[k]);}}));return o;}

const clean = h => String(h==null?'':h).replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(n)).replace(/\s+/g,' ').trim();
const norm = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[\u00f1\u00d1]/g,'n').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
// emparejar DENTRO de la misma pagina (evita el ruido de resolver contra el catalogo)
const RUIDO=['the','a','an','and','with','for','of','in','pro','plus','series','each','set','pair','mkii','mk','iii','ii','gen','version','power','powered','speaker','microphone','mic','digital','usb','xlr','guitar','bass','pedal','keyboard','audio','studio','wireless','system','interface','monitor','headphones','synth','synthesizer','sampler','drum','mixer','amplifier','plugin','bundle','edition','complete','black','white','model','original','classic','pack','condenser','shotgun','dynamic','cardioid','vocal','kit','zone','core','evo','reference','premium','standard','best','twin','stereo','controlador','edicion'];
const tok = s => { const t = norm(s).split(' ').filter(w=>w.length>2 && RUIDO.indexOf(w)<0); return t.sort((a,b)=>b.length-a.length)[0] || null; };
function mismo(a,b){
  const na=norm(a), nb=norm(b);
  if(!na||!nb) return false;
  if(na===nb || na.indexOf(nb)>-1 || nb.indexOf(na)>-1) return true;
  const ta=tok(a), tb=tok(b);
  if(ta && tb && ta===tb) return true;
  const wa=na.split(' ').filter(w=>w.length>3), wb=nb.split(' ').filter(w=>w.length>3);
  if(!wa.length||!wb.length) return false;
  const setB=new Set(wb), c=wa.filter(w=>setB.has(w)).length;
  return c>=Math.max(2, Math.ceil(Math.min(wa.length,wb.length)*0.6));
}

(async()=>{
  console.log('Descargando las 314 paginas...');
  const [EN, ES] = await Promise.all([
    pool(ids,8, g=>get(`https://topmusiciangear.com/guides/${g}.html`)),
    pool(ids,8, g=>get(`https://topmusiciangear.com/guides/${g}_es.html`))
  ]);

  const R = {
    'Columna de tabla que no es ninguna tarjeta': [],
    'Veredicto que no es ninguna tarjeta': [],
    'Tarjeta con tabla pero sin veredicto': [],
    'Tarjeta con veredicto pero sin tabla': [],
    'Tarjeta sin review propia': [],
    'Encabezados de review repetidos': [],
    'Veredicto con menos de 4 pros o 4 contras': [],
    'FAQ por debajo de 4': [],
    'Tabla con celdas vacias': [],
    'Tabla con importes': [],
    'Guia sin boton de compra': [],
    'Secciones EN != ES': [],
    'FAQ EN != ES': [],
    'Pagina no cargada': []
  };

  EN.forEach((r,k)=>{
    const gid = ids[k];
    if (r.s !== 200) { R['Pagina no cargada'].push(gid + ' (EN HTTP ' + r.s + ')'); return; }
    const d = r.d;

    // --- TARJETAS: la verdad ---
    const cards = [...new Set([...d.matchAll(/<h3 class="guide-product-card-title">([\s\S]*?)<\/h3>/g)]
      .map(m => clean(m[1]).replace(/\s*\((each|par|set|pareja)\)\s*$/i,'')))];
    const cardIds = new Set([...d.matchAll(/openReviewModal\((\d+)\)/g)].map(m=>m[1]));

    // --- TABLA ---
    const tabla = (d.match(/<table class="guide-comp-table"[\s\S]*?<\/tbody>/i)||[''])[0];
    const cols = [...((d.match(/<table class="guide-comp-table"[\s\S]*?<\/thead>/i)||[''])[0]).matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map(m=>clean(m[1])).filter(Boolean);
    // --- VEREDICTOS ---
    const bloques = [...d.matchAll(/<div class="verdict-product-name">([\s\S]*?)<\/div>([\s\S]*?)(?=<div class="verdict-product-name">|$)/g)];
    const vps = bloques.map(m=>clean(m[1]));
    // --- REVIEWS ---
    const heads = [...d.matchAll(/<h2 class="guide-section-heading"[^>]*>([\s\S]*?)<\/h2>/gi)].map(m=>clean(m[1]));
    const revistos = heads.filter(h=>/\?$|:\s|\?/.test(h) && cards.some(c=>mismo(h,c)));

    if (cards.length) {
      // 1) cada columna debe ser una tarjeta
      cols.forEach(c=>{ if(!cards.some(x=>mismo(x,c))) R['Columna de tabla que no es ninguna tarjeta'].push(gid+' | '+c); });
      // 2) cada veredicto debe ser una tarjeta
      vps.forEach(v=>{ if(!cards.some(x=>mismo(x,v))) R['Veredicto que no es ninguna tarjeta'].push(gid+' | '+v); });
      // 3) cada tarjeta debe estar en tabla y en veredicto
      if (cols.length || vps.length) cards.forEach(t=>{
        const ec = cols.some(c=>mismo(t,c)), ev = vps.some(v=>mismo(t,v));
        if (ec && !ev) R['Tarjeta con tabla pero sin veredicto'].push(gid+' | '+t);
        if (ev && !ec) R['Tarjeta con veredicto pero sin tabla'].push(gid+' | '+t);
      });
      // 4) cada tarjeta con veredicto deberia tener review propia
      vps.forEach(v=>{ if(!heads.some(h=>mismo(h,v))) R['Tarjeta sin review propia'].push(gid+' | '+v); });
      // 5) veredicto 4+4
      bloques.forEach((m,i)=>{
        const np=((m[2].match(/verdict-pros-list[\s\S]*?<\/ul>/)||[''])[0].match(/<li>/g)||[]).length;
        const nc=((m[2].match(/verdict-cons-list[\s\S]*?<\/ul>/)||[''])[0].match(/<li>/g)||[]).length;
        if(np<4||nc<4) R['Veredicto con menos de 4 pros o 4 contras'].push(gid+' | '+clean(m[1])+' ('+np+'/'+nc+')');
      });
      // 6) celdas vacias e importes
      if (/<td class="val"><\/td>/.test(tabla)) R['Tabla con celdas vacias'].push(gid);
      if (/[$€£]\s?[0-9]/.test(tabla)) R['Tabla con importes'].push(gid);
      // 7) botones con precio
      if ((d.match(/data-price=/g)||[]).length === 0) R['Guia sin boton de compra'].push(gid);
    }
    // 8) encabezados repetidos
    const dup = {};
    heads.forEach(h=>{ dup[h]=(dup[h]||0)+1; });
    Object.keys(dup).forEach(h=>{ if(dup[h]>1) R['Encabezados de review repetidos'].push(gid+' | '+h+' x'+dup[h]); });
    // 9) FAQ
    const faq = (d.match(/class="guide-faq-item"/g)||[]).length;
    if (faq>0 && faq<4) R['FAQ por debajo de 4'].push(gid+' ('+faq+')');
    // 10) ES
    const e = ES[k];
    if (e.s !== 200) { R['Pagina no cargada'].push(gid+' (ES HTTP '+e.s+')'); return; }
    const hEN=(d.match(/<h2 class="guide-section-heading"/g)||[]).length;
    const hES=(e.d.match(/<h2 class="guide-section-heading"/g)||[]).length;
    if(hEN!==hES) R['Secciones EN != ES'].push(gid+' (EN '+hEN+' / ES '+hES+')');
    const fES=(e.d.match(/class="guide-faq-item"/g)||[]).length;
    if(faq!==fES) R['FAQ EN != ES'].push(gid+' (EN '+faq+' / ES '+fES+')');
  });

  // ---- informe ----
  console.log('\n' + '='.repeat(72));
  console.log('  AUDITORIA FINAL — leida del HTML publicado (EN + ES)');
  console.log('='.repeat(72) + '\n');
  let total = 0;
  Object.keys(R).forEach(k=>{
    const n = R[k].length; total += n;
    const marca = n===0 ? 'OK  ' : '    ';
    console.log(marca + k.padEnd(52) + n);
    if (n) R[k].slice(0,8).forEach(x=>console.log('           - ' + x));
    if (n>8) console.log('           ... y ' + (n-8) + ' mas');
  });
  console.log('\n' + '-'.repeat(72));
  console.log('  TOTAL DE INCIDENCIAS: ' + total);
  console.log('-'.repeat(72));
})();