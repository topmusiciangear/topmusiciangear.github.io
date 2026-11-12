// ctx_sentences_cliches.js — contexto tipo "frase" de cada hit (compacto, para redactar reemplazos)
const fs = require('fs');
const base = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(base + 'data/guides.json', 'utf8'));
const prods = JSON.parse(fs.readFileSync(base + 'data/products.json', 'utf8'));

const PATS = [
  [/workhorse/i, 'workhorse'],
  [/caballo?s? de batalla/i, 'caballo'],
  [/todoterreno/i, 'todoterreno'],
  [/\b(beast|bestia)\b/i, 'beast'],
  [/\b(grail|grial|santo grial)\b/i, 'grail'],
  [/sampling god|dios del muestreo/i, 'god'],
  [/swiss army|navaja suiza/i, 'swiss'],
  [/\bunicorn/i, 'unicorn'],
  [/silver bullet|bala de plata/i, 'silver bullet'],
  [/game.?changer/i, 'game-changer'],
  [/tour de force/i, 'tour'],
  [/ace up (the|your) sleeve|as bajo la manga/i, 'ace'],
  [/secret weapon|arma secreta/i, 'secret-weapon'],
  [/heavy (hitter|lifting)|trabajo pesado/i, 'heavy'],
  [/steal the show|robar el show/i, 'steal'],
  [/raise the bar|subir el list[oó]n/i, 'raise'],
  [/the (real|true) (MVP|deal)|el verdadero MVP/i, 'MVP'],
  [/holy grail/i, 'holy grail'],
  [/next level|siguiente nivel/i, 'next-level'],
  [/powerhouse|potencia bruta/i, 'powerhouse'],
  [/built like a tank|como un tanque/i, 'tank'],
];

function win(txt, idx) {
  let start = txt.lastIndexOf('. ', idx);
  const s2 = txt.lastIndexOf('</p>', idx);
  const s3 = txt.lastIndexOf('</strong>', idx);
  const s4 = txt.lastIndexOf('</li>', idx);
  start = Math.max(start + 2, s2 + 4, s3 + 9, s4 + 5, 0);
  let end = txt.indexOf('. ', idx + 6);
  const e2 = txt.indexOf('</p>', idx);
  const e3 = txt.indexOf('</li>', idx);
  const cands = [end, e2, e3].filter(x => x >= 0);
  end = cands.length ? Math.min(...cands) : txt.length;
  let out = txt.slice(start, end + 1).replace(/\s+/g, ' ').trim();
  if (out.length > 400) out = out.slice(0, 200) + ' …MATCH→ ' + txt.slice(Math.max(start, idx - 60), Math.min(txt.length, idx + 140)).replace(/\s+/g, ' ') + ' …';
  return out;
}

function walk(o, ruta, acc, es) {
  acc = acc || [];
  if (Array.isArray(o)) { o.forEach((v, i) => walk(v, ruta + '[' + i + ']', acc, es)); return acc; }
  if (o && typeof o === 'object') {
    const esCtx = /(^|\.)[\w\[\]]+_es(\.|$|\[)/.test(ruta);
    Object.entries(o).forEach(([k, v]) => {
      if (typeof v === 'string') {
        const esField = /_es/.test(k) || esCtx;
        if (esField === es) {
          PATS.forEach(p => {
            if (p[0].test(v)) {
              const re = new RegExp(p[0].source, 'g' + (p[0].ignoreCase ? 'i' : ''));
              let m, n = 0;
              while ((m = re.exec(v)) && n < 4) {
                n++;
                acc.push({ campo: (ruta ? ruta + '.' : '') + k, pat: p[1], ctx: win(v, m.index) });
              }
            }
          });
        }
      } else if (v && typeof v === 'object') walk(v, ruta ? ruta + '.' + k : k, acc, es);
    });
    return acc;
  }
  return acc;
}

const lado = process.argv[2] || 'en';
const es = lado === 'es';
let n = 0;
console.log('===== GUIDES ' + lado.toUpperCase() + ' =====');
g.forEach(x => {
  const hits = walk(x, x.id, [], es);
  hits.forEach(h => {
    n++;
    console.log('[' + n + '][' + h.pat + '] ' + h.campo);
    console.log('    ' + h.ctx);
  });
});
console.log('===== PRODUCTS ' + lado.toUpperCase() + ' =====');
prods.forEach(p => {
  const hits = walk(p, 'P' + p.id + '(' + (p.title || '') + ')', [], es);
  hits.forEach(h => {
    n++;
    console.log('[' + n + '][' + h.pat + '] ' + h.campo);
    console.log('    ' + h.ctx);
  });
});
console.log('TOTAL ' + lado.toUpperCase() + ': ' + n);
