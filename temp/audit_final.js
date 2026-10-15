// CIERRE: en las 157 paginas EN VIVO, comprobar que
//   tarjetas (productos de la guia) == columnas de la tabla == veredictos
const https = require('https');
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
function get(u){return new Promise(r=>{const q=https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r(d));});q.on('error',()=>r(''));});}
async function pool(ids,n,fn){const o=new Array(ids.length);let i=0;await Promise.all(Array.from({length:n},async()=>{while(i<ids.length){const k=i++;o[k]=await fn(ids[k]);}}));return o;}
const clean = h => String(h==null?'':h).replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
const norm = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[\u00f1\u00d1]/g,'n')
  .toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const IGN = ['the','a','an','and','with','for','of','in','pro','plus','series','each','set','pair','mkii','mk',
  'iii','ii','gen','version','power','powered','speaker','microphone','mic','digital','usb','xlr','guitar',
  'bass','pedal','keyboard','audio','studio','wireless','system','interface','monitor','headphones','synth',
  'synthesizer','sampler','drum','mixer','amplifier','plugin','bundle','edition','complete','black','white',
  'model','original','classic','pack','condenser','shotgun','dynamic','cardioid','vocal','kit','zone','core',
  'evo','reference','premium','standard','best','twin','stereo','controlador','edicion'];
const key = s => norm(s).split(' ').filter(w => w.length > 1 && IGN.indexOf(w) < 0);
const P = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const arr = Array.isArray(P) ? P : P.products;
function resuelve(nombre) {
  const k = key(nombre);
  if (!k.length) return null;
  return arr.find(p => { const kp = key(p.title); return k.every(w => kp.indexOf(w) > -1); }) || null;
}

(async()=>{
  const guias = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8')).map(g=>g.id);
  const res = await pool(guias, 8, g => get('https://topmusiciangear.com/guides/'+g+'.html'));
  let leidas = 0;
  const sinTabla = [], malTabla = [], malVeredicto = [], sinTarjeta = [];
  res.forEach((d, k) => {
    if (!d) return;
    leidas++;
    const gid = guias[k];
    const cards = [...new Set([...d.matchAll(/openReviewModal\((\d+)\)[\s\S]{0,900}?<h3 class="guide-product-card-title">([\s\S]*?)<\/h3>/g)].map(m=>Number(m[1])))];
    if (!cards.length) return;
    const thead = (d.match(/<table class="guide-comp-table"[\s\S]*?<\/thead>/i)||[''])[0];
    const cols = [...thead.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map(m=>clean(m[1])).filter(Boolean);
    const vps = [...new Set([...d.matchAll(/<div class="verdict-product-name">([\s\S]*?)<\/div>/gi)].map(m=>clean(m[1])))];
    if (!cols.length && !vps.length) { sinTabla.push(gid); return; }
    const cardSet = new Set(cards);
    // cada columna y cada veredicto debe resolver a un producto de la guia
    cols.forEach(c => { const p = resuelve(c); if (!p || !cardSet.has(p.id)) malTabla.push(gid + ' | tabla: ' + c + (p ? ' (id ' + p.id + ')' : ' (no existe)')); });
    vps.forEach(v => { const p = resuelve(v); if (!p || !cardSet.has(p.id)) malVeredicto.push(gid + ' | veredicto: ' + v + (p ? ' (id ' + p.id + ')' : ' (no existe)')); });
    // cada tarjeta deberia tener columna y veredicto
    cards.forEach(id => {
      const p = arr.find(x=>x.id===id); if (!p) return;
      const enCol = cols.some(c => { const r = resuelve(c); return r && r.id === id; });
      const enVp  = vps.some(v => { const r = resuelve(v); return r && r.id === id; });
      if (!enCol && !enVp) sinTarjeta.push(gid + ' | ' + p.title + ' (id ' + id + ')');
    });
  });
  const sec = (t, n) => { console.log('\n### ' + t + ': ' + n.length); n.slice(0,20).forEach(x=>console.log('   ' + x)); if (n.length>20) console.log('   ... y ' + (n.length-20) + ' mas'); };
  console.log('paginas leidas: ' + leidas + ' de ' + guias.length);
  console.log('\nproductos con tabla o veredictos, pero la guia no tiene ninguno de los dos: ' + sinTabla.length);
  sec('A) columnas de tabla que no son un producto de esa guia', malTabla);
  sec('B) veredictos que no son un producto de esa guia', malVeredicto);
  sec('C) productos de la guia sin columna ni veredicto', sinTarjeta);
  const total = malTabla.length + malVeredicto.length + sinTarjeta.length;
  console.log('\n=================================');
  console.log(total === 0 ? 'TODO CORRECTO: tabla y veredictos == productos de la guia' : 'HAY ' + total + ' DESAJUSTES');
})();