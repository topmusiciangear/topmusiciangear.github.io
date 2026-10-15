// Corregir los 2 ultimos por valor exacto.
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const g = guides.find(x => x.id === 'starter-studio');

let n = 0;

// ── 1) veredicto KRK pros_es: 8" -> 7" ──
const krk = g.verdictProsCons.find(v => /Rokit/.test(v.name));
if (krk) {
  const antes = krk.pros_es[0];
  if (/8 pulgadas/.test(antes)) {
    krk.pros_es[0] = 'Woofer de 7 pulgadas de fibra de Kevlar trenzada con graves reales para su tamaño';
    n++; console.log('  OK   veredicto KRK pros_es');
    console.log('       antes: ' + antes);
    console.log('       ahora: ' + krk.pros_es[0]);
  }
  // el cons tambien?
  krk.cons_es.forEach((c,i)=>{ if(/8 pulgadas/.test(c)) { console.log('  !! cons_es['+i+'] tambien lo dice: '+c); } });
  krk.pros.forEach((c,i)=>{ if(/8-inch/.test(c)) { console.log('  !! pros['+i+'] tambien lo dice: '+c); } });
  krk.cons.forEach((c,i)=>{ if(/8-inch/.test(c)) { console.log('  !! cons['+i+'] tambien lo dice: '+c); } });
}

// ── 2) seccion monitores EN: el parrafo con el KRK ──
g.sections.forEach((s,i)=>{
  if (typeof s.content !== 'string') return;
  if (/8-inch woven Kevlar woofer/.test(s.content)) {
    const antes = s.content;
    s.content = s.content.replace(
      /The KRK Rokit 7 G5 has an 8-inch woven Kevlar woofer and real output — the port of authority in this list/,
      'The KRK Rokit 7 G5 has a 7-inch woven Kevlar aramid woofer and 145 watts of Class D amplification — the most authority in this list'
    );
    n++; console.log('  OK   sec['+i+'] "'+s.heading.slice(0,44)+'" (EN)');
  }
  if (/8-inch|8 inches/i.test(s.content)) {
    const m = s.content.match(/[^<>]{0,60}8[- ]inch[^<>]{0,60}/);
    console.log('       resto en EN: ' + (m?m[0]:'?'));
  }
});

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');
console.log('\naplicadas: ' + n);

// ═══ VERIFICACION FINAL DE LAS 15 ═══
const s = JSON.stringify(g);
const CHECKS = [
  ['woofer de 8 pulgadas', /woofer de 8 pulgadas/i],
  ['8-inch woven', /8-inch woven/i],
  ['8 pulgadas de Kevlar', /Ocho pulgadas de Kevlar/i],
  ['Eight Inches of Kevlar', /Eight Inches of Kevlar/i],
  ['bi-amped at 140 watts', /bi-amped at 140 watts/i],
  ['trapping de graves', /trapping de graves/i],
  ['es la misma interfaz', /es la misma interfaz/i],
  ['las dos dos', /las dos dos/i],
  ['para dar forma tú,', /para dar forma tú,/i],
  ['la que nadie presupuesta', /la que nadie presupuesta/i],
  ['no puedes saltarte', /no puedes saltarte/i],
  ['el más con autoridad', /el más con autoridad/i],
  ['deshace el micrófono', /deshace el micrófono/i],
  ['volverá rebotando', /volverá rebotando/i],
  ['Un micrófono dinámico como el SM57 no le importa', /Un micrófono dinámico como el SM57 no le importa/i],
  ['para que el micro no esté en tu mano', /para que el micro no esté en tu mano/i]
];
console.log('\n=== LAS 16 AFIRMACIONES ===');
let quedan = 0;
CHECKS.forEach(([label, re])=>{ if(s.match(re)) { quedan++; console.log('  PENDIENTE ' + label); } });
console.log(quedan===0 ? '  NINGUNA PENDIENTE' : quedan + ' pendientes');

// comprobar que el nuevo texto del KRK esta presente
console.log('\n=== TEXTO NUEVO DEL KRK ===');
console.log('  pros_es: ' + krk.pros_es[0]);
const secM = g.sections.find(s=>/Monitors You Cannot/.test(s.heading));
const m = (secM.content.match(/The KRK Rokit 7 G5 has[^.]*\./) || [])[0];
console.log('  sec EN:  ' + m);
const cjk = (s.match(/[\u4e00-\u9fff]/g)||[]);
console.log('CJK: ' + (cjk.length ? [...new Set(cjk)].join('') : 'ninguno'));