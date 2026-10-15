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

(async()=>{
  const ids = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8')).map(g=>g.id);
  const res = await pool(ids, 8, g => get('https://topmusiciangear.com/guides/'+g+'.html'));
  const conTabla = [], sinTabla = [], conVeredictoSinTarjeta = [];
  res.forEach((d,k)=>{
    if(!d) return; const gid=ids[k];
    const cards=[...new Set([...d.matchAll(/<h3 class="guide-product-card-title">([\s\S]*?)<\/h3>/g)].map(m=>clean(m[1]).replace(/\s*\((each|par|set|pareja)\)\s*$/i,'')))];
    if(!cards.length) return;
    const thead=(d.match(/<table class="guide-comp-table"[\s\S]*?<\/thead>/i)||[''])[0];
    const cols=[...thead.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map(m=>clean(m[1])).filter(Boolean);
    const vps=[...new Set([...d.matchAll(/<div class="verdict-product-name">([\s\S]*?)<\/div>/gi)].map(m=>clean(m[1])))];
    if(!cols.length && !vps.length) return;
    if(!cols.length) { sinTabla.push(gid+' ('+cards.length+' tarjetas, '+vps.length+' veredictos)'); return; }
    if(!vps.length) { conVeredictoSinTarjeta.push(gid); return; }
    const soloTabla = cards.filter(t=>cols.some(c=>mismo(t,c)) && !vps.some(v=>mismo(t,v)));
    const soloVerdicto = cards.filter(t=>vps.some(v=>mismo(t,v)) && !cols.some(c=>mismo(t,c)));
    const sinNinguno = cards.filter(t=>!cols.some(c=>mismo(t,c)) && !vps.some(v=>mismo(t,v)));
    if (soloTabla.length||soloVerdicto.length||sinNinguno.length)
      conTabla.push({ gid, nc: cols.length, nv: vps.length, nt: cards.length, soloTabla, soloVerdicto, sinNinguno });
  });
  console.log('=== guias SIN tabla (solo tarjetas y veredictos) ===');
  console.log('  ' + sinTabla.length + ': ' + sinTabla.join(', '));
  console.log('\n=== guias con tabla donde tarjeta y veredicto no coinciden ===');
  conTabla.forEach(r=>{
    console.log('\n  ' + r.gid + '  tarjetas ' + r.nt + ' | tabla ' + r.nc + ' | veredictos ' + r.nv);
    if (r.soloTabla.length) console.log('     con tabla pero SIN veredicto: ' + r.soloTabla.join(' ; '));
    if (r.soloVerdicto.length) console.log('     con veredicto pero SIN tabla: ' + r.soloVerdicto.join(' ; '));
    if (r.sinNinguno.length) console.log('     sin tabla NI veredicto: ' + r.sinNinguno.join(' ; '));
  });
  console.log('\n  total guías afectadas: ' + conTabla.length);
  console.log('\n=== guias con tabla pero sin veredictos ===');
  console.log('  ' + (conVeredictoSinTarjeta.length ? conVeredictoSinTarjeta.join(', ') : 'ninguna'));
})();