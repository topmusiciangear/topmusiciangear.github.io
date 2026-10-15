// Verificar los 20 casos de "SIN review propia" — separar falsos positivos de reales
const https = require('https');
function get(u){return new Promise(r=>{const q=https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r({s:s.statusCode,d:d}));});q.on('error',()=>r({s:0,d:''}));});}
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
const CASOS = [
  ['guitar-pedals','Boss TU-3 Chromatic Tuner'],
  ['scarlett-vs-volt','Universal Audio Volt 2'],
  ['dxr-vs-prx','JBL PRX ONE Active PA Column'],
  ['best-samplers-drum-computers','Akai Professional MPC XL'],
  ['best-bass-amps','Orange Crush Bass 50'],
  ['best-overdrive-distortion','Fulltone OCD v2'],
  ['best-reverb-delay','TC Electronic Hall of Fame 2'],
  ['best-reverb-delay','Universal Audio Del-Verb'],
  ['best-digital-pianos','Roland FP-30X'],
  ['best-digital-pianos','Roland RP107'],
  ['best-digital-pianos','Yamaha YDP-146'],
  ['best-digital-pianos','Yamaha YDP-166'],
  ['best-digital-pianos','Yamaha CLP-835'],
  ['best-digital-pianos','Casio PX-S1100'],
  ['best-digital-pianos','Roland FP-10'],
  ['best-digital-pianos','Yamaha P-225'],
  ['mixing-plugins','REFERENCE 3'],
  ['stream-controllers','RØDE RØDECaster Pro II'],
  ['mics-for-creators','Rode NT-USB Mini'],
  ['di-box','LR Baggs Para Acoustic DI']
];
(async()=>{
  for (const [gid, prod] of CASOS) {
    const r = await get('https://topmusiciangear.com/guides/'+gid+'.html');
    if (r.s!==200) { console.log('  HTTP '+r.s+' '+gid); continue; }
    const d = r.d;
    const heads = [...d.matchAll(/<h2 class="guide-section-heading"[^>]*>([\s\S]*?)<\/h2>/gi)].map(m=>clean(m[1]));
    const ok = heads.find(h=>mismo(prod, h));
    console.log((ok?'  OK ':'  FALTA ') + gid.padEnd(30) + ' | ' + prod);
    if (ok) console.log('         -> ' + ok);
  }
})();