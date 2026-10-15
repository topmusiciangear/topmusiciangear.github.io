// Desglose de las 2 categorias con hallazgos, para separar bugs reales de decision de diseno
const https = require('https');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const ids = require(BASE+'data/guides.json').map(g => g.id);
function get(u){return new Promise(r=>{const q=https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r({s:s.statusCode,d:d}));});q.on('error',()=>r({s:0,d:''}));});}
async function pool(n0,n,fn){const o=new Array(n0.length);let i=0;await Promise.all(Array.from({length:n},async()=>{while(i<n0.length){const k=i++;o[k]=await fn(n0[k]);}}));return o;}
const clean = h => String(h==null?'':h).replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
const norm = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[\u00f1\u00d1]/g,'n').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const RUIDO=['the','a','an','and','with','for','of','in','pro','plus','series','each','set','pair','mkii','mk','iii','ii','gen','version','power','powered','speaker','microphone','mic','digital','usb','xlr','guitar','bass','pedal','keyboard','audio','studio','wireless','system','interface','monitor','headphones','synth','synthesizer','sampler','drum','mixer','amplifier','plugin','bundle','edition','complete','black','white','model','original','classic','pack','condenser','shotgun','dynamic','cardioid','vocal','kit','zone','core','evo','reference','premium','standard','best','twin','stereo','controlador','edicion'];
const tok = s => { const t=norm(s).split(' ').filter(w=>w.length>2&&RUIDO.indexOf(w)<0); return t.sort((a,b)=>b.length-a.length)[0]||null; };
function mismo(a,b){const na=norm(a),nb=norm(b);if(!na||!nb)return false;
  if(na===nb||na.indexOf(nb)>-1||nb.indexOf(na)>-1)return true;
  const ta=tok(a),tb=tok(b); if(ta&&tb&&ta===tb)return true;
  const wa=na.split(' ').filter(w=>w.length>3),wb=nb.split(' ').filter(w=>w.length>3);
  if(!wa.length||!wb.length)return false;
  const sb=new Set(wb),c=wa.filter(w=>sb.has(w)).length;
  return c>=Math.max(2,Math.ceil(Math.min(wa.length,wb.length)*0.6));}

(async()=>{
  const res = await pool(ids, 8, g=>get(`https://topmusiciangear.com/guides/${g}.html`));
  const sinTabla=[], sinReview=[], conReviewTodo=[];
  res.forEach((r,k)=>{
    if(r.s!==200) return; const gid=ids[k]; const d=r.d;
    const cards=[...new Set([...d.matchAll(/<h3 class="guide-product-card-title">([\s\S]*?)<\/h3>/g)].map(m=>clean(m[1]).replace(/\s*\((each|par|set|pareja)\)\s*$/i,'')))];
    if(!cards.length) return;
    const cols=[...((d.match(/<table class="guide-comp-table"[\s\S]*?<\/thead>/i)||[''])[0]).matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map(m=>clean(m[1])).filter(Boolean);
    const vps=[...new Set([...d.matchAll(/<div class="verdict-product-name">([\s\S]*?)<\/div>/gi)].map(m=>clean(m[1])))];
    const heads=[...d.matchAll(/<h2 class="guide-section-heading"[^>]*>([\s\S]*?)<\/h2>/gi)].map(m=>clean(m[1]));
    if(!vps.length) return;
    const sinRev = vps.filter(v=>!heads.some(h=>mismo(h,v)));
    const sinCol = vps.filter(v=>!cols.some(c=>mismo(v,c)));
    if (sinRev.length) sinReview.push({gid, cards:cards.length, vps:vps.length, lista:sinRev});
    else conReviewTodo.push(gid+' ('+cards.length+')');
    if (sinCol.length) sinTabla.push({gid, cols:cols.length, vps:vps.length, lista:sinCol});
  });
  sinReview.sort((a,b)=>b.lista.length-a.lista.length);
  console.log('=== GUIAS CON PRODUCTOS SIN REVIEW PROPIA ===');
  console.log('guias afectadas: ' + sinReview.length + ' | productos: ' + sinReview.reduce((s,x)=>s+x.lista.length,0));
  console.log('guias con review para todos sus productos: ' + conReviewTodo.length + '\n');
  sinReview.forEach((r,i)=>{
    console.log((i+1)+'. ' + r.gid + '  ('+r.cards+' tarjetas, '+r.vps+' veredictos, faltan '+r.lista.length+')');
    console.log('     ' + r.lista.join(' ; '));
  });
  console.log('\n\n=== GUIAS CON PRODUCTOS SIN FILA EN TABLA ===');
  console.log('guias afectadas: ' + sinTabla.length + ' | productos: ' + sinTabla.reduce((s,x)=>s+x.lista.length,0));
  sinTabla.forEach(r=>console.log('  ' + r.gid + ' (tabla '+r.cols+', veredictos '+r.vps+'): ' + r.lista.length + ' sin fila'));
})();