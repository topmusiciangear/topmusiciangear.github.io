// AUDITORIA FINAL EN VIVO: todo lo que hemos revisado, en una pasada
const https = require('https');
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
function get(u){return new Promise(r=>{const q=https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r(d));});q.on('error',()=>r(''));});}
async function pool(ids,n,fn){const o=new Array(ids.length);let i=0;await Promise.all(Array.from({length:n},async()=>{while(i<ids.length){const k=i++;o[k]=await fn(ids[k]);}}));return o;}
const clean = h => String(h==null?'':h).replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
const norm = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[\u00f1\u00d1]/g,'n').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const idTok = s => { const t = norm(s).split(' ').filter(w=>/\d/.test(w)&&w.length>=2); return t.sort((a,b)=>b.length-a.length)[0]||null; };
const IGN=['the','a','an','and','with','for','of','in','pro','plus','series','each','set','pair','mkii','mk','iii','ii','gen','version','power','powered','speaker','microphone','mic','digital','usb','xlr','guitar','bass','pedal','keyboard','audio','studio','wireless','system','interface','monitor','headphones','synth','synthesizer','sampler','drum','mixer','amplifier','plugin','bundle','edition','complete','black','white','model','original','classic','pack','condenser','shotgun','dynamic','cardioid','vocal','kit','zone','core','evo','reference','premium','standard','best','twin','stereo','controlador','edicion'];
const key = s => norm(s).split(' ').filter(w=>w.length>1&&IGN.indexOf(w)<0);
function mismo(a,b){const na=norm(a),nb=norm(b);if(na&&nb&&(na===nb||na.indexOf(nb)>-1||nb.indexOf(na)>-1))return true;
  const ta=idTok(a),tb=idTok(b);if(ta&&tb&&ta===tb)return true;
  const wa=na.split(' ').filter(w=>w.length>3),wb=nb.split(' ').filter(w=>w.length>3);if(!wa.length||!wb.length)return false;
  const setB=new Set(wb);const c=wa.filter(w=>setB.has(w)).length;return c>=Math.max(2,Math.ceil(Math.min(wa.length,wb.length)*0.6));}

const guias = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const ids = guias.map(g=>g.id);

(async()=>{
  const res = await pool(ids, 8, g => get('https://topmusiciangear.com/guides/'+g+'.html'));
  const resES = await pool(ids, 8, g => get('https://topmusiciangear.com/guides/'+g+'_es.html'));
  const R = { colSinTarjeta:[], verSinTarjeta:[], tarjetaSinFila:[], celdaVacia:[], precioEnTabla:[], faqPocas:[], sinES:[], seccionesDesajuste:[], sinVeredicto4:[] };

  res.forEach((d,k)=>{
    const gid = ids[k];
    if (!d) { R.sinES.push(gid+' (no leida EN)'); return; }
    const cards = [...new Set([...d.matchAll(/<h3 class="guide-product-card-title">([\s\S]*?)<\/h3>/g)].map(m=>clean(m[1]).replace(/\s*\((each|par|set|pareja)\)\s*$/i,'')))];
    if (cards.length) {
      const thead=(d.match(/<table class="guide-comp-table"[\s\S]*?<\/thead>/i)||[''])[0];
      const cols=[...thead.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map(m=>clean(m[1])).filter(Boolean);
      const body=(d.match(/<table class="guide-comp-table"[\s\S]*?<\/tbody>/i)||[''])[0];
      const vps=[...new Set([...d.matchAll(/<div class="verdict-product-name">([\s\S]*?)<\/div>/gi)].map(m=>clean(m[1])))];
      if (cols.length||vps.length) {
        cols.forEach(c=>{ if(!cards.some(x=>mismo(x,c))) R.colSinTarjeta.push(gid+' | TABLA: '+c); });
        vps.forEach(v=>{ if(!cards.some(x=>mismo(x,v))) R.verSinTarjeta.push(gid+' | VEREDICTO: '+v); });
        cards.forEach(t=>{ const ec=cols.some(c=>mismo(t,c)), ev=vps.some(v=>mismo(t,v));
          if(ec&&!ev) R.tarjetaSinFila.push(gid+' | solo tabla, sin veredicto: '+t);
          if(ev&&!ec) R.tarjetaSinFila.push(gid+' | solo veredicto, sin tabla: '+t); });
      }
      const vacias=(body.match(/<td class="val"><\/td>/g)||[]).length;
      if (vacias) R.celdaVacia.push(gid+' ('+vacias+' celdas)');
      if (/[$€£]\s?[0-9]/.test(body)) R.precioEnTabla.push(gid);
      // veredictos con menos de 4 pros o 4 cons
      [...d.matchAll(/<div class="verdict-product-name">([\s\S]*?)<\/div>([\s\S]*?)(?=<div class="verdict-product-name">|$)/g)].forEach(m=>{
        const np=(m[2].match(/class="verdict-pros-list"[\s\S]*?<\/ul>/)||[''])[0].match(/<li>/g)||[];
        const nc=(m[2].match(/class="verdict-cons-list"[\s\S]*?<\/ul>/)||[''])[0].match(/<li>/g)||[];
        if (np.length<4||nc.length<4) R.sinVeredicto4.push(gid+' | '+clean(m[1])+' ('+np.length+'/'+nc.length+')');
      });
    }
    const faq=(d.match(/class="guide-faq-item"/g)||[]).length;
    if (faq && faq<4) R.faqPocas.push(gid+' ('+faq+')');
    // ES
    const es = resES[k];
    if (!es) { R.sinES.push(gid+' (no leida ES)'); return; }
    const seccE=(d.match(/<h2 class="guide-section-heading"/g)||[]).length;
    const seccS=(es.match(/<h2 class="guide-section-heading"/g)||[]).length;
    if (seccE!==seccS) R.seccionesDesajuste.push(gid+' (EN '+seccE+' / ES '+seccS+')');
    const faqS=(es.match(/class="guide-faq-item"/g)||[]).length;
    if (faq!==faqS) R.faqPocas.push(gid+' FAQs EN '+faq+' / ES '+faqS);
  });

  const sec=(t,n)=>{console.log('\n### '+t+': '+n.length); n.slice(0,14).forEach(x=>console.log('   '+x)); if(n.length>14) console.log('   ... y '+(n.length-14)+' mas');};
  console.log('paginas leidas: EN '+res.filter(Boolean).length+' | ES '+resES.filter(Boolean).length+' de '+ids.length);
  sec('A) columna de tabla que no es ninguna tarjeta', R.colSinTarjeta);
  sec('B) veredicto que no es ninguna tarjeta', R.verSinTarjeta);
  sec('C) tarjeta con tabla pero sin veredicto, o al reves', R.tarjetaSinFila);
  sec('D) tablas con celdas vacias', R.celdaVacia);
  sec('E) tablas que aun tienen importes', R.precioEnTabla);
  sec('F) veredictos con menos de 4 pros o 4 contras', R.sinVeredicto4);
  sec('G) FAQs por debajo de 4 o desajuste EN/ES', R.faqPocas);
  sec('H) guias con mas o menos secciones EN que ES', R.seccionesDesajuste);
  sec('I) paginas no leidas', R.sinES);
  const tot=Object.values(R).reduce((s,a)=>s+a.length,0);
  console.log('\n=================================');
  console.log(tot===0?'SIN INCIDENCIAS':'INCIDENCIAS TOTALES: '+tot);
})();