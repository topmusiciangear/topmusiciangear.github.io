// Los 4 problemas que quedaban estaban en mas sitios: veredictos del KRK
// (EN y ES), la review del KRK, y <strong> partia la frase del Definitivo.
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const g = guides.find(x => x.id === 'starter-studio');

const REGLAS = [
  // ── 1) KRK: woofer 7" (verificado KRK oficial) ──
  // veredicto ES
  ['veredicto KRK pros_es',
   'Woofer de 8 pulgadas de Kevlar trenzado con graves reales para un monitor de 7 pulgadas',
   'Woofer de 7 pulgadas de fibra de Kevlar trenzada con graves reales para su tamaño'],
  // veredicto EN
  ['veredicto KRK pros',
   '8-inch woven Kevlar woofer with real low-end for a 7-inch monitor',
   '7-inch woven Kevlar aramid woofer with real low-end for its size'],
  // seccion monitores EN (la de "Monitors You Cannot Skip")
  ['sec monitores EN',
   'The KRK Rokit 7 G5 has an 8-inch woven Kevlar woofer and real output — the port of authority in this list — but place it against a bare wall and the bass will bounce back at you and lie.',
   'The KRK Rokit 7 G5 has a 7-inch woven Kevlar aramid woofer and 145 watts of Class D amplification — the most authority in this list — but place it against a bare wall and the bass will bounce back at you and lie.'],
  // review del KRK (EN): el titulo tambien dice "Eight Inches"
  ['review KRK heading EN',
   'Eight Inches of Kevlar: Judging Low End for the First Time',
   'Seven Inches of Kevlar: Judging Low End for the First Time'],
  ['review KRP heading ES',
   'Ocho pulgadas de Kevlar: juzgar el grave por primera vez',
   'Siete pulgadas de Kevlar: juzgar el grave por primera vez'],
  // review del KRK (EN cuerpo)
  ['review KRK cuerpo EN',
   'The 7-inch cabinet carries an 8-inch woven Kevlar woofer and a 4-inch midrange, bi-amped at 140 watts. That is real low-end output from a monitor that fits on a desk, and the front bass port makes placement near a wall less catastrophic than a rear-ported design.',
   'The cabinet carries a 7-inch woven Kevlar aramid woofer and a 1-inch silk-dome tweeter, bi-amped at 145 watts total — 97 on the low end, 48 on the high. That is real low-end output from a monitor that fits on a desk, and the front bass port makes placement near a wall less catastrophic than a rear-ported design.'],

  // ── 2) "trapping de graves" ──
  ['sec sala ES',
   'Diez centímetros de espuma no son trapping de graves,',
   'Diez centímetros de espuma no son trampas de graves,'],

  // ── 3) "es la misma interfaz" (el <strong> partia la frase) ──
  ['sec presupuestos ES',
   '<strong>El Definitivo por $905</strong> es la misma interfaz, el condensador NT1 Signature, el MDR-7506 estándar de radiodifusión, y monitores de verdad — un par de KRK Rokit 7 G5.',
   '<strong>El Definitivo por $905</strong> da el salto a la SSL 2+ MKII —la misma del nivel intermedio—, cambia el condensador por el NT1 Signature, cambia los auriculares por el MDR-7506 estándar de radiodifusión y añade monitores de verdad: un par de KRK Rokit 7 G5.']
];

let ok = 0;
const fallos = [];

// Buscar en TODOS los campos de texto de la guia
function enTodos(fn) {
  ['intro','intro_es','conclusion','conclusion_es','title','title_es','titleTag','titleTag_es','description','description_es']
    .forEach(c=>{ if(typeof g[c]==='string') g[c] = fn(g[c], c); });
  g.sections.forEach((s,i)=>{
    ['content','content_es','heading','heading_es'].forEach(c=>{ if(typeof s[c]==='string') s[c] = fn(s[c], 'sec['+i+'].'+c); });
  });
  g.verdictProsCons.forEach(v=>{
    ['pros','cons','pros_es','cons_es'].forEach(k=>{
      if(Array.isArray(v[k])) v[k] = v[k].map(x=>fn(x, v.name+'.'+k));
    });
  });
}

REGLAS.forEach(([etiqueta, antes, despues])=>{
  let aplicado = false;
  enTodos(txt=>{
    if (txt.indexOf(antes) > -1) { aplicado = true; return txt.split(antes).join(despues); }
    return txt;
  });
  if (aplicado) { ok++; console.log('  OK   ' + etiqueta); }
  else { fallos.push(etiqueta); console.log('  FALLA ' + etiqueta); }
});

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');
console.log('\naplicadas: ' + ok + ' / ' + REGLAS.length);
if (fallos.length) console.log('fallos: ' + fallos.join(', '));

// ═══ VERIFICACION FINAL ═══
const s = JSON.stringify(g);
const CHECKS = [
  ['woofer de 8 pulgadas', /woofer de 8 pulgadas/i],
  ['8-inch woven Kevlar woofer', /8-inch woven Kevlar woofer/i],
  ['8-inch woven (cualquiera)', /8-inch woven/i],
  ['trapping de graves', /trapping de graves/i],
  ['es la misma interfaz', /es la misma interfaz/i],
  ['las dos dos', /las dos dos/i],
  ['para dar forma tú,', /para dar forma tú,/i],
  ['la que nadie presupuesta', /la que nadie presupuesta/i],
  ['no puedes saltarte', /no puedes saltarte/i],
  ['el más con autoridad', /el más con autoridad/i],
  ['deshace el micrófono', /deshace el micrófono/i],
  ['volverá rebotando', /volverá rebotando/i],
  ['8 pulgadas de Kevlar (titulo review)', /Ocho pulgadas de Kevlar/i],
  ['Eight Inches of Kevlar', /Eight Inches of Kevlar/i],
  ['bi-amped at 140 watts', /bi-amped at 140 watts/i]
];
console.log('\n=== ¿QUEDAN PROBLEMAS? ===');
let quedan = 0;
CHECKS.forEach(([label, re])=>{ if(s.match(re)) { quedan++; console.log('  !! ' + label); } });
console.log(quedan===0 ? '  NINGUNO — las 15 correcciones aplicadas' : quedan + ' pendientes');
const cjk = (s.match(/[\u4e00-\u9fff]/g)||[]);
console.log('CJK: ' + (cjk.length ? [...new Set(cjk)].join('') : 'ninguno'));