// Corregir mayusculas reales (8 casos). NO tocar nombres de marca legitimos
// (iZotope, bx_clipper, smart:limit, etc.)
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));

// [guia, indice_seccion, campo, antes, despues]
const FIX = [
  ['usb-mics', 2, 'content',      'the AT2040USB brings',   'The AT2040USB brings'],
  ['usb-mics', 3, 'content',      'the Profile Streaming Set is', 'The Profile Streaming Set is'],
  ['budget-headphones', 3, 'content', 'the ATH-M40x delivers', 'The ATH-M40x delivers'],
  ['budget-monitors', 4, 'content', 'a pair, the Yamaha HS8 stretches', 'A pair, the Yamaha HS8 stretches'],
  ['scarlett-vs-ssl', 3, 'content', 'the Scarlett 2i2 is the best', 'The Scarlett 2i2 is the best'],
  ['fix-clipping-scarlett', 0, 'content', 'digital clipping occurs', 'Digital clipping occurs'],
  ['best-digital-mixers', 1, 'content', 'digital mixers designed for studio use', 'Digital mixers designed for studio use'],
  ['best-instrument-mics', 12, 'content_es', 'pasan dos cosas en los primeros', 'Pasan dos cosas en los primeros']
];

let n = 0;
FIX.forEach(([gid, idx, campo, antes, despues]) => {
  const g = guides.find(x => x.id === gid);
  if (!g) { console.log('  !! guia no existe: ' + gid); return; }
  if (campo === 'intro') {
    if (g.intro && g.intro.indexOf(antes) === 0) { g.intro = despues + g.intro.slice(antes.length); n++; console.log('  ' + gid + ' intro'); }
    else console.log('  !! no aplica ' + gid + ' intro');
    return;
  }
  const s = g.sections && g.sections[idx];
  if (!s) { console.log('  !! seccion no existe: ' + gid + '[' + idx + ']'); return; }
  const v = s[campo];
  if (typeof v !== 'string') { console.log('  !! no string ' + gid + '[' + idx + '].' + campo); return; }
  const i = v.indexOf(antes);
  if (i > -1) {
    s[campo] = v.slice(0, i) + despues + v.slice(i + antes.length);
    n++;
    console.log('  ' + gid + ' secciones[' + idx + '].' + campo);
  } else {
    console.log('  !! no aplica ' + gid + '[' + idx + '].' + campo + ' -> ' + v.slice(0,70));
  }
});

// el intro de best-32-channel-digital-mixers
const g32 = guides.find(x => x.id === 'best-32-channel-digital-mixers');
if (g32 && g32.intro && g32.intro.indexOf('digital mixers in the 24 to 32') === 0) {
  g32.intro = 'Digital mixers in the 24 to 32' + g32.intro.slice('digital mixers in the 24 to 32'.length);
  n++;
  console.log('  best-32-channel-digital-mixers intro');
}

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');
console.log('\ncorrecciones aplicadas: ' + n);

// re-scan de minusculas
function empiezaMinus(s) {
  if (!s) return null;
  let t = String(s).replace(/<[^>]+>/g,'').replace(/^&nbsp;/,'').trim();
  if (!t) return null;
  const m = t.match(/[A-Za-zÁÉÍÓÚÑÜáéíóúñü]/);
  if (!m) return null;
  return m[0] === m[0].toLowerCase() ? t.slice(0,80) : null;
}
const quedan = [];
const MARCAS = ['iZotope','bx_clipper','smart:limit']; // nombres reales en minuscula
guides.forEach(g => {
  [['intro',g.intro],['intro_es',g.intro_es],['conclusion',g.conclusion],['conclusion_es',g.conclusion_es]].forEach(([c,v])=>{
    const r = empiezaMinus(v);
    if (r && !MARCAS.some(m=>r.indexOf(m)===0)) quedan.push(g.id+' | '+c+': "'+r+'..."');
  });
  (g.sections||[]).forEach((s,i)=>{
    ['content','content_es'].forEach(c=>{
      const r = empiezaMinus(s[c]);
      if (r && !MARCAS.some(m=>r.indexOf(m)===0)) quedan.push(g.id+' | secciones['+i+'].'+c+': "'+r+'..."');
    });
  });
});
console.log('\nminusculas reales restantes: ' + quedan.length);
quedan.forEach(x=>console.log('  - ' + x));
const cjk = (JSON.stringify(guides).match(/[\u4e00-\u9fff]/g)||[]);
console.log('CJK: ' + (cjk.length ? [...new Set(cjk)].join('') : 'ninguno'));