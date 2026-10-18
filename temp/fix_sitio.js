const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const rg = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(rg, 'utf8'));
const st = s => String(s).replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');

// Solo cambios de alta confianza, revisados uno a uno:
//  - "gabinete" = calco de "cabinet"; en espanol es "caja" (15 casos, TODOS de amplis)
//  - "targeting LUFS" = palabra inglesa
//  - "lo mas parecido a una consola/excepcion" = calco de "the closest thing to a"
const REGLAS = [
  [/gabinetes virtuales/g, 'cajas virtuales'],
  [/gabinetes de salas reales/g, 'cajas de salas reales'],
  [/gabinetesnail/gi, ''],
  [/amplificadores, gabinetes y/g, 'amplificadores, cajas y'],
  [/con tres gabinetes/g, 'con tres cajas'],
  [/\bgabinetes\b/g, 'cajas'],
  [/\bgabinete\b/g, 'caja'],
  [/El targeting LUFS/g, 'La orientación a LUFS'],
  [/lo más parecido a una consola de podcasting que no necesita escritorio/g,
   'lo más parecido a una consola de podcasting que no necesita mesa'],
  [/es lo más parecido a una excepción, pero incluso él ronda los \$199 el par en la mayoría de mercados en lugar de los \$149 con los que salió\./g,
   'es el único que se acerca a una excepción, pero incluso él ronda los $199 el par en la mayoría de mercados, frente a los $149 con los que salió.']
];

const muestras = [];
let cuenta = 0;
function aplicar(t) {
  let x = t;
  for (const [re, rp] of REGLAS) {
    const m = x.match(re);
    if (!m) continue;
    muestras.push([m[0], (rp || '').slice(0, 60)]);
    cuenta += m.length;
    x = x.replace(re, rp);
  }
  return x;
}
function recorrer(o) {
  if (typeof o === 'string') return aplicar(o);
  if (Array.isArray(o)) return o.map(recorrer);
  if (o && typeof o === 'object') { const s = {}; for (const k of Object.keys(o)) s[k] = recorrer(o[k]); return s; }
  return o;
}
guides.forEach(g => {
  const l = recorrer(g);
  Object.keys(l).forEach(k => { g[k] = l[k]; });
});

fs.writeFileSync(rg, JSON.stringify(guides, null, 2), 'utf8');
console.log('sustituciones en todo el sitio: ' + cuenta);
console.log('');
console.log('MUESTRAS (lo que se cambio):');
[...new Set(muestras.map(m => m[0] + '  ==>  ' + m[1]))].forEach(m => console.log('  ' + m));
const fin = JSON.stringify(guides);
console.log('');
console.log('quedan "gabinete": ' + (fin.match(/gabinete/gi) || []).length +
  ' | "targeting": ' + (fin.match(/targeting/gi) || []).length +
  ' | "lo más parecido a una": ' + (fin.match(/lo más parecido a una/gi) || []).length);
console.log('"todoterreno" (NO tocado, es jerga correcta en espanol): ' + (fin.match(/todoterreno/gi) || []).length);
console.log('CJK/coreanos: ' + (/[\uAC00-\uD7AF\u4E00-\u9FFF\u3040-\u30FF]/.test(fin) ? 'SI <-- MAL' : 'no'));