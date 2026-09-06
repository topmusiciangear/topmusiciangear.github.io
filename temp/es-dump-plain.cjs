const fs = require('fs');
const path = require('path');

const OUT = 'C:/Users/Daniel/AppData/Local/Temp/opencode/es-dump-plain';
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

function stripTags(s) {
  if (!s) return '';
  let t = s;
  t = t.replace(/<table[\s\S]*?<\/table>/gi, ' [TABLA] ');
  t = t.replace(/<[^>]+>/g, ' ');
  t = t.replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  t = t.replace(/\s+/g, ' ').trim();
  return t;
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/\t/g, '\\t').replace(/\|/g, '|').replace(/\r/g, '');
}

const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const gMeta = [];
for (const g of guides) {
  const rows = [];
  function walk(o, pfx) {
    if (o == null) return;
    if (typeof o === 'string') {
      if (/_es$/.test(pfx)) rows.push(['ES', pfx, stripTags(o)]);
      else if (/(^|\.)(content|intro|conclusion|verdict|title|description|crawl|heading|value|a|q|pros|cons|text|faq_a\d+|faq_q\d+|pros_es|cons_es)$/.test(pfx) && !/_es$/.test(pfx)) rows.push(['EN', pfx, stripTags(o)]);
      return;
    }
    if (Array.isArray(o)) o.forEach((v, i) => walk(v, pfx + '[' + i + ']'));
    else Object.keys(o).forEach(k => walk(o[k], pfx + '.' + k));
  }
  walk(g, '');
  // dedupe identical (ES,EN) row
  let sz = 0;
  const lines = [];
  for (const [lang, pfx, txt] of rows) {
    if (!txt) continue;
    sz += txt.length;
    lines.push(lang + ' | ' + pfx + ' | ' + esc(txt));
  }
  gMeta.push({ id: g.id, rows: lines, sz });
}

let total = 0;
for (const m of gMeta) total += m.sz;
console.log('GUIDES:', gMeta.length, 'total plain-text chars:', total, 'avg/guide:', Math.round(total / gMeta.length));

let pTotal = 0;
const pRows = [];
for (let i = 0; i < products.length; i++) {
  const p = products[i];
  for (const k of ['title', 'desc', 'desc_es']) {
    if (typeof p[k] === 'string' && p[k]) {
      const lang = k.endsWith('_es') ? 'ES' : 'EN';
      const t = stripTags(p[k]);
      pTotal += t.length;
      pRows.push(lang + ' | [prod' + i + '].' + k + ' | ' + esc(t));
    }
  }
  // also nested strings inside stores? skip
}
console.log('PRODUCTS:', products.length, 'total plain-text chars:', pTotal);

// write one big file per guide prefix slot for inspection + per-product file
fs.writeFileSync(path.join(OUT, '_README.txt'), [
  'Formato por lote: cada línea es:',
  '  LANG | PATH | TEXTO_PLANO  (tags HTML quitados, TODO en una línea)',
  '',
  'PATH en guides.json se referencia como guides.json + guía id + camino con corchetes.',
  'Los agentes deben reportar findings como: guid | path | "old" -> "new"  (old = substring EXACTO del texto plano).',
].join('\n'));

// write per-guide files for agents (grouped)
const perGuideDir = path.join(OUT, 'guides');
fs.mkdirSync(perGuideDir, { recursive: true });
for (const m of gMeta) {
  fs.writeFileSync(path.join(perGuideDir, m.id.replace(/[^\w.-]/g, '_') + '.txt'), m.rows.join('\n') + '\n', 'utf8');
}
fs.writeFileSync(path.join(OUT, 'products.txt'), pRows.join('\n') + '\n', 'utf8');
console.log('guides files:', gMeta.length, '| products file lines:', pRows.length);