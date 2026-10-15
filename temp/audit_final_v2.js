// AUDITORIA FINAL v2 — matcher fiable.
// Regla: el nombre del producto debe aparecer en el encabezado salvo la marca inicial.
// Asi "Shure SM57" casa con "Is the SM57 the Best..." y "EV ELX200-15P" NO casa
// con un encabezado que hable de "ELX200-12".
const https = require('https');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const ids = require(BASE+'data/guides.json').map(g => g.id);
function get(u){return new Promise(r=>{const q=https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r({s:s.statusCode,d:d}));});q.on('error',()=>r({s:0,d:''}));});}
async function pool(n0,n,fn){const o=new Array(n0.length);let i=0;await Promise.all(Array.from({length:n},async()=>{while(i<n0.length){const k=i++;o[k]=await fn(n0[k]);}}));return o;}
const clean = h => String(h==null?'':h).replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
const norm = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[\u00f1\u00d1]/g,'n').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const RUIDO = ['the','a','an','and','with','for','of','in','pro','plus','series','each','set','pair','mkii','mk',
  'iii','ii','gen','version','power','powered','speaker','microphone','mic','digital','usb','xlr','guitar','bass',
  'pedal','keyboard','audio','studio','wireless','system','interface','monitor','headphones','synth','synthesizer',
  'sampler','drum','mixer','amplifier','plugin','bundle','edition','complete','black','white','model','original',
  'classic','pack','condenser','shotgun','dynamic','cardioid','vocal','kit','zone','core','evo','reference',
  'premium','standard','best','twin','stereo','controlador','edicion','is','be','does','do','are','was','should',
  'can','which','what','how','why','your','you','most','ever','than','not','now','one','two','from','into'];
function clave(s) {
  return norm(s).split(' ').filter(w => w.length > 1 && RUIDO.indexOf(w) < 0);
}
function mismo(producto, texto) {
  const kp = clave(producto);
  if (!kp.length) return false;
  const kt = new Set(clave(texto));
  if (!kt.size) return false;
  const h = ' ' + norm(texto) + ' ';
  const tiene = w => h.indexOf(' ' + w + ' ') > -1;
  // 1) coincidencia literal
  if (norm(texto).indexOf(norm(producto)) > -1) return true;
  // 2) todos los tokens salvo el primero (la marca) deben estar en el texto
  const req = kp.length > 1 ? kp.slice(1) : kp;
  if (req.length && req.every(tiene)) return true;
  // 3) si solo queda la marca, que aparezca al menos un token identificativo
  return kp.length > 1 && kp.some(t => tiene(t) && (/\d/.test(t) || t.length >= 5));
}

(async()=>{
  const [EN, ES] = await Promise.all([
    pool(ids,8, g=>get(`https://topmusiciangear.com/guides/${g}.html`)),
    pool(ids,8, g=>get(`https://topmusiciangear.com/guides/${g}_es.html`))
  ]);
  const R = {
    'Columna de tabla que no es ninguna tarjeta': [],
    'Veredicto que no es ninguna tarjeta': [],
    'Tarjeta con tabla pero sin veredicto': [],
    'Tarjeta con veredicto pero sin tabla': [],
    'Producto con veredicto y SIN review propia': [],
    'Encabezados de review repetidos': [],
    'Veredicto con menos de 4 pros o 4 contras': [],
    'FAQ por debajo de 4': [],
    'Tabla con celdas vacias': [],
    'Tabla con importes': [],
    'Secciones EN != ES': [],
    'FAQ EN != ES': [],
    'Pagina no cargada': []
  };
  const detalle = {};
  EN.forEach((r,k)=>{
    const gid = ids[k];
    if (r.s!==200) { R['Pagina no cargada'].push(gid+' EN'); return; }
    const d = r.d;
    const cards = [...new Set([...d.matchAll(/<h3 class="guide-product-card-title">([\s\S]*?)<\/h3>/g)].map(m=>clean(m[1]).replace(/\s*\((each|par|set|pareja)\)\s*$/i,'')))];
    const tabla = (d.match(/<table class="guide-comp-table"[\s\S]*?<\/tbody>/i)||[''])[0];
    const cols = [...((d.match(/<table class="guide-comp-table"[\s\S]*?<\/thead>/i)||[''])[0]).matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map(m=>clean(m[1])).filter(Boolean);
    const bloques = [...d.matchAll(/<div class="verdict-product-name">([\s\S]*?)<\/div>([\s\S]*?)(?=<div class="verdict-product-name">|$)/g)];
    const vps = bloques.map(m=>clean(m[1]));
    const heads = [...d.matchAll(/<h2 class="guide-section-heading"[^>]*>([\s\S]*?)<\/h2>/gi)].map(m=>clean(m[1]));
    const headsES = ES[k].s===200 ? [...ES[k].d.matchAll(/<h2 class="guide-section-heading"[^>]*>([\s\S]*?)<\/h2>/gi)].map(m=>clean(m[1])) : [];

    if (cards.length) {
      cols.forEach(c=>{ if(!cards.some(x=>mismo(x,c))) R['Columna de tabla que no es ninguna tarjeta'].push(gid+' | '+c); });
      vps.forEach(v=>{ if(!cards.some(x=>mismo(x,v))) R['Veredicto que no es ninguna tarjeta'].push(gid+' | '+v); });
      if (cols.length||vps.length) cards.forEach(t=>{
        const ec=cols.some(c=>mismo(t,c)), ev=vps.some(v=>mismo(t,v));
        if(ec&&!ev) R['Tarjeta con tabla pero sin veredicto'].push(gid+' | '+t);
        if(ev&&!ec) R['Tarjeta con veredicto pero sin tabla'].push(gid+' | '+t);
      });
      // review propia: el encabezado debe nombrar el producto O aparecer en el ES con el mismo indice
      vps.forEach((v,i)=>{
        const enH = heads.some(h=>mismo(v,h));
        const esH = headsES.some(h=>mismo(v,h));
        if(!enH && !esH) R['Producto con veredicto y SIN review propia'].push(gid+' | '+v);
      });
      bloques.forEach(m=>{
        const np=((m[2].match(/verdict-pros-list[\s\S]*?<\/ul>/)||[''])[0].match(/<li>/g)||[]).length;
        const nc=((m[2].match(/verdict-cons-list[\s\S]*?<\/ul>/)||[''])[0].match(/<li>/g)||[]).length;
        if(np<4||nc<4) R['Veredicto con menos de 4 pros o 4 contras'].push(gid+' | '+clean(m[1])+' ('+np+'/'+nc+')');
      });
      if (/<td class="val"><\/td>/.test(tabla)) R['Tabla con celdas vacias'].push(gid);
      if (/[$€£]\s?[0-9]/.test(tabla)) R['Tabla con importes'].push(gid);
    }
    const dup={}; heads.forEach(h=>dup[h]=(dup[h]||0)+1);
    Object.keys(dup).forEach(h=>{ if(dup[h]>1) R['Encabezados de review repetidos'].push(gid+' | '+h); });
    const faq=(d.match(/class="guide-faq-item"/g)||[]).length;
    if(faq>0&&faq<4) R['FAQ por debajo de 4'].push(gid+' ('+faq+')');
    if(ES[k].s!==200){ R['Pagina no cargada'].push(gid+' ES'); return; }
    const hEN=heads.length, hES=headsES.length;
    if(hEN!==hES) R['Secciones EN != ES'].push(gid+' (EN '+hEN+' / ES '+hES+')');
    const fES=(ES[k].d.match(/class="guide-faq-item"/g)||[]).length;
    if(faq!==fES) R['FAQ EN != ES'].push(gid+' (EN '+faq+' / ES '+fES+')');
  });

  console.log('\n' + '='.repeat(74));
  console.log('  AUDITORIA FINAL — 314 paginas en vivo (EN + ES)');
  console.log('='.repeat(74) + '\n');
  let total=0;
  Object.keys(R).forEach(k=>{
    const n=R[k].length; total+=n;
    console.log((n===0?'  OK   ':'       ') + k.padEnd(50) + n);
    if(n) R[k].slice(0,6).forEach(x=>console.log('            - '+x));
    if(n>6) console.log('            ... y '+(n-6)+' mas');
  });
  console.log('\n' + '-'.repeat(74));
  console.log('  TOTAL: ' + total);
  console.log('-'.repeat(74));
  // guardar el detalle de lo que falta
  fs = require('fs');
  fs.writeFileSync(BASE+'temp/audit_final.txt', Object.keys(R).map(k=>k+': '+R[k].length+'\n'+R[k].join('\n')).join('\n\n'));
})();