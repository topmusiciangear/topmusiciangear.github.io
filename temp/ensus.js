const P = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const prodNames = new Set(P.map(p => p.title));
const ENWORDS = /\b(the|and|for|with|from|into|inch|inches|plus|total|via|per|monitor|control|direct|loopback|safe|legacy|steady|clock|load|depth|design|potential|format|formats|type|inputs|outputs|preamp|preamps|sample|rate|bit|depth|connectivity|special|features|best|pattern|response|sensitivity|noise|power|weight|body|neck|tuners|bridge|keys|software|channels|model|year|amplifier|frequency|tweeter|woofer|driver|dimensions|phantom|mount|stand|cable|pair|each|light|dark|grey|black|white|natural|solid|grand|stage|digital|acoustic|electric|bass|treble|middle|british|vintage|modern|classic|smart|wireless|portable|compact|professional|dynamic|punchy|warm|bright|tight|fast|easy|hard|soft|high|low|small|large|big|dual|single|powerful|advanced|ultimate|deluxe|standard|studio|home|live|road|gig|tour|show|room|desk|floor|wall|ceiling|corner|sweet|spot|field|near|far|mid|side|front|rear|top|bus|chain|loop|track|song|mode|voice|tone|sound|noise|music|audio|video|photo|film|stream|game|podcast|broadcast|phone|tablet|laptop|computer|driver|engine|power|supply|battery|cable|plug|jack|knob|fader|button|switch|screen|display|meter|clip|solo|mute|pan|send|return|aux|main|mix|bus|daw|plugin|preset|loop|track)\b/i;
const hits = [];
function chk(guide, field, en, es) {
  if (!en || !es || en !== es) return;
  const words = String(en).split(/[^A-Za-z]+/).filter(w => w.length >= 4);
  if (words.length < 1) return;
  if (prodNames.has(en)) return;
  if (/^[\d$€£\s.,×x"+\-/()Ω°]+$/.test(en)) return;
  if (ENWORDS.test(en)) hits.push(guide + ' | ' + field + ' = "' + String(en).slice(0, 70) + '"');
}
G.forEach(g => {
  (g.sections || []).forEach((s, i) => {
    chk(g.id, 'sec' + i + '.heading', s.heading || s.h, s.heading_es || s.h_es);
    chk(g.id, 'sec' + i + '.content', s.content, s.content_es);
  });
  ['title', 'intro', 'conclusion', 'verdict', 'description'].forEach(k => chk(g.id, k, g[k], g[k + '_es']));
  if (g.productTable) {
    (g.productTable.columns || []).forEach((c, i) => chk(g.id, 'col' + i, c.title, c.title_es));
    (g.productTable.rows || []).forEach((r, i) => {
      chk(g.id, 'row' + i + '.label', r.label, r.label_es);
      (r.values || []).forEach((v, j) => chk(g.id, 'row' + i + '.val' + j, v.value, v.value_es));
    });
  }
  if (g.comparison) (g.comparison.rows || []).forEach((r, i) => {
    chk(g.id, 'comp' + i + '.label', r.label, r.label_es);
    ['val1', 'val2', 'val3', 'val4', 'val5'].forEach(k => chk(g.id, 'comp' + i + '.' + k, r[k], r[k + '_es']));
  });
  (g.verdictProsCons || []).forEach(v => {
    (v.pros || []).forEach((p, i) => chk(g.id, 'vpc.' + v.name + '.pro' + i, p, (v.pros_es || [])[i]));
    (v.cons || []).forEach((p, i) => chk(g.id, 'vpc.' + v.name + '.con' + i, p, (v.cons_es || [])[i]));
  });
});
console.log('sospechosos:', hits.length);
hits.slice(0, 100).forEach(h => console.log(' ' + h));