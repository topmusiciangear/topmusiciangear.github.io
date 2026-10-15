// AUDITORIA EN VIVO v3: ¿el nombre del producto aparece en el TEXTO VISIBLE al lector?
const https = require('https');
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

function get(url) {
  return new Promise(res => {
    const rq = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, s => {
      let d = ''; s.on('data', c => d += c); s.on('end', () => res({ s: s.statusCode, d }));
    });
    rq.on('error', () => res({ s: 0, d: '' }));
  });
}
const clean = h => String(h == null ? '' : h).replace(/<[^>]+>/g, ' ')
  .replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n))
  .replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
const norm = s => clean(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const COMUN = ['digital','delay','reverb','studio','wireless','system','preamp','pair','each','usb','xlr',
  'instrument','keyboard','guitar','bass','monitor','microphone','interface','synthesizer','sampler',
  'mixer','amplifier','pedal','speaker','headphones','plugins','bundle','edition','production','complete',
  'audio','analog','vintage','flagship','reference','advanced','ultimate','professional','original','classic',
  'series','black','silver','white','model','the','and','with','for','of','in','piano'];
function tokens(n) {
  return norm(n).split(' ').filter(w => w.length > 1 && COMUN.indexOf(w) < 0);
}
function menciona(texto, nombre) {
  const t = norm(texto);
  const base = norm(String(nombre).split('(')[0]);
  if (base.length < 3) return false;
  if (t.indexOf(base) > -1) return true;
  const tk = tokens(nombre);
  if (!tk.length) return false;
  for (let i = 0; i < tk.length - 1; i++) if (t.indexOf(tk[i] + ' ' + tk[i + 1]) > -1) return true;
  const marca = norm(nombre).split(' ')[0];
  return tk.some(w => w !== marca && w.length >= 3 && new RegExp('(^|[^a-z0-9])' + w + '([^a-z0-9]|$)').test(t));
}
async function pool(ids, n, fn) {
  const out = new Array(ids.length); let i = 0;
  await Promise.all(Array.from({ length: n }, async () => { while (i < ids.length) { const k = i++; out[k] = await fn(ids[k]); } }));
  return out;
}

(async () => {
  const guias = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8')).map(g => g.id);
  const res = await pool(guias, 8, async gid => {
    const r = await get(`https://topmusiciangear.com/guides/${gid}.html`);
    return { gid, s: r.s, d: r.d };
  });

  const filas = []; let N = 0, fallos = 0;
  res.forEach(({ gid, s, d }) => {
    if (s !== 200) { fallos++; return; }
    // 1) veredictos
    const vps = [...new Set([...d.matchAll(/<div class="verdict-product-name">([\s\S]*?)<\/div>/gi)].map(m => clean(m[1])))];
    // 2) ENCABEZADOS de seccion (fichas dedicado)
    const heads = [...d.matchAll(/<h2 class="guide-section-heading"[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => clean(m[1]));
    // 3) CUERPO REAL de las secciones: todos los <div class="guide-section-content">
    const cuerpos = [...d.matchAll(/<div class="guide-section-content"[^>]*>([\s\S]*?)<\/div>\s*(?:<div class="guide-section-(?:prods|buy|imgs|mediabuy)"|<\/section>)/gi)].map(m => clean(m[1]));
    const cuerpoTxt = cuerpos.join(' || ');

    const sinNada = [], sinFicha = [];
    vps.forEach(v => {
      const enHead = heads.some(h => menciona(h, v));
      const enBody = menciona(cuerpoTxt, v);
      if (enHead) return;
      if (enBody) sinFicha.push(v);      // cubierto, pero sin H2 propio
      else sinNada.push(v);              // NO aparece en ninguna parte del texto
    });
    if (sinNada.length || sinFicha.length) {
      filas.push({ gid, h1: clean((d.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [, ''])[1]), sinNada, sinFicha });
      N += sinNada.length;
    }
  });

  const graves = filas.filter(f => f.sinNada.length);
  filas.sort((a, b) => b.sinNada.length - a.sinNada.length || b.sinFicha.length - a.sinFicha.length);
  console.log('===== AUDITORIA EN VIVO v3 · lo que el lector ve de verdad =====');
  console.log('paginas leidas: ' + res.length + ' | fallos: ' + fallos);
  console.log('guias con producto SIN ninguna cobertura en el texto: ' + graves.length + ' | productos: ' + N);
  console.log('guias con producto cubierto solo en seccion de categoria (sin H2 propio): ' + filas.filter(f=>f.sinFicha.length).length + '\n');
  filas.forEach((f, i) => {
    console.log((i + 1) + '. ' + f.h1 + '   [' + f.gid + ']');
    if (f.sinNada.length) { console.log('   SIN COBERTURA (' + f.sinNada.length + '): ' + f.sinNada.join('; ')); }
    if (f.sinFicha.length) console.log('   cubiertos sin H2 propio (' + f.sinFicha.length + '): ' + f.sinFicha.join('; '));
  });
  fs.writeFileSync(BASE + 'temp/live_pending.txt',
    filas.map(f => f.gid + ' | ' + f.h1 + ' | SIN: ' + f.sinNada.join('; ') + ' | sinH2: ' + f.sinFicha.join('; ')).join('\n'));
  console.log('\nguardado: temp/live_pending.txt');
})();