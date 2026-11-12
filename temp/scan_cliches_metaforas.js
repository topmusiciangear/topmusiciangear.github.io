// scan_cliches_metaforas.js — frases hackneyed tipo "caballos de batalla" que suenan a AI
const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));

const PATS = [
  [/workhorse/i, 'workhorse'],
  [/caballo?s? de batalla/i, 'caballo de batalla'],
  [/todoterreno/i, 'todoterreno'],
  [/\b(beast|bestia)\b/i, 'beast'],
  [/\b(grail|grial|santo grial)\b/i, 'grail'],
  [/sampling god|dios del muestreo/i, 'god'],
  [/swiss army|navaja suiza/i, 'swiss army'],
  [/unicorn/i, 'unicorn'],
  [/silver bullet|bala de plata/i, 'silver bullet'],
  [/game.?changer/i, 'game changer'],
  [/tour de force/i, 'tour de force'],
  [/ace up (the|your) sleeve|as bajo la manga/i, 'ace up sleeve'],
  [/next level|siguiente nivel/i, 'next level'],
  [/secret weapon|arma secreta/i, 'secret weapon'],
  [/heavy (hitter|lifting)|trabajo pesado/i, 'heavy hitter'],
  [/steal the show|robar el show/i, 'steal the show'],
  [/raise the bar|subir el list[oó]n/i, 'raise the bar'],
  [/the (real|true) (MVP|deal)/i, 'real deal'],
  [/holy grail/i, 'holy grail'],
];

// recorre todo el JSON (strings), marcar claves _es o no
function walk(o, ruta, acc, en) {
  acc = acc || [];
  if (Array.isArray(o)) { o.forEach((v, i) => walk(v, ruta + '[' + i + ']', acc, en)); return acc; }
  if (o && typeof o === 'object') {
    Object.entries(o).forEach(([k, v]) => {
      if (typeof v === 'string') {
        const esField = /_es|_es$/.test(k);
        if (!esField && en) {
          PATS.forEach(p => { if (p[0].test(v)) acc.push({ lado: 'EN', campo: (ruta ? ruta + '.' : '') + k, pat: p[1], txt: v.slice(0, 200) }); });
        } else if (esField && !en) {
          PATS.forEach(p => { if (p[0].test(v)) acc.push({ lado: 'ES', campo: (ruta ? ruta + '.' : '') + k, pat: p[1], txt: v.slice(0, 200) }); });
        }
      } else if (v && typeof v === 'object') walk(v, ruta ? ruta + '.' + k : k, acc, en);
    });
    return acc;
  }
  return acc;
}

// Además: productos data/products.json (desc/desc_es/title_es)
const prods = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));

console.log('=== GUIDES EN ===');
const enHits = walk(g, '', [], true);
enHits.forEach(h => console.log('[' + h.pat + '] ' + h.campo + '\n    ' + h.txt.replace(/\n/g, ' ')));

console.log('\n=== GUIDES ES ===');
const esHits = walk(g, '', [], false);
esHits.forEach(h => console.log('[' + h.pat + '] ' + h.campo + '\n    ' + h.txt.replace(/\n/g, ' ')));

console.log('\n=== PRODUCTS.json ===');
prods.forEach(p => {
  [['desc', false], ['desc_es', true], ['title_es', true], ['featuredText', false], ['featuredText_es', true]].forEach(([k, es]) => {
    if (typeof p[k] === 'string') {
      PATS.forEach(pt => {
        if (pt[0].test(p[k])) console.log('[' + pt[1] + '] id=' + p.id + ' ' + p.title + ' .' + k + (es ? ' (ES)' : ' (EN)') + '\n    ' + p[k].slice(0, 200).replace(/\n/g, ' '));
      });
    }
  });
});

console.log('\nTotales EN: ' + enHits.length + ' | ES: ' + esHits.length);
