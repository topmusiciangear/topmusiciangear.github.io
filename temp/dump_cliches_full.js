// dump_cliches_full.js — texto COMPLETO de cada campo con metáfora hackneyed
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
  [/silver bullet|bala de plata/i, 'silver bullet'],
  [/game.?changer/i, 'game changer'],
  [/tour de force/i, 'tour de force'],
  [/ace up (the|your) sleeve|as bajo la manga/i, 'ace up sleeve'],
  [/secret weapon|arma secreta/i, 'secret weapon'],
  [/heavy (hitter|lifting)|trabajo pesado/i, 'heavy'],
  [/steal the show|robar el show/i, 'steal'],
  [/raise the bar|subir el list[oó]n/i, 'raise'],
  [/the (real|true) (MVP|deal)/i, 'real deal'],
  [/holy grail/i, 'holy grail'],
  [/next level|siguiente nivel/i, 'next level'],
];

function walk(o, ruta, acc, es) {
  acc = acc || [];
  if (Array.isArray(o)) { o.forEach((v, i) => walk(v, ruta + '[' + i + ']', acc, es)); return acc; }
  if (o && typeof o === 'object') {
    Object.entries(o).forEach(([k, v]) => {
      if (typeof v === 'string') {
        const esField = /_es/.test(k);
        if (esField === es) {
          PATS.forEach(p => { if (p[0].test(v)) acc.push({ campo: (ruta ? ruta + '.' : '') + k, pat: p[1], txt: v }); });
        }
      } else if (v && typeof v === 'object') walk(v, ruta ? ruta + '.' + k : k, acc, es);
    });
    return acc;
  }
  return acc;
}

const lado = process.argv[2] === 'es' ? true : false;
g.forEach(x => {
  const hits = walk(x, x.id, [], lado);
  if (!hits.length) return;
  console.log('\n########## ' + x.id);
  hits.forEach(h => {
    console.log('--- [' + h.pat + '] ' + h.campo + ' (len ' + h.txt.length + ')');
    console.log(h.txt);
  });
});
