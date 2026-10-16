// Detector v2: solo texto ES, con campo y contexto
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

function textosES(o, ruta, acc) {
  acc = acc || [];
  if (Array.isArray(o)) { o.forEach((v, i) => textosES(v, ruta + '[' + i + ']', acc)); return acc; }
  if (o && typeof o === 'object') {
    Object.entries(o).forEach(([k, v]) => {
      if (typeof v === 'string' && /(_es|title_es|desc_es)$/.test(k)) acc.push({ campo: (ruta ? ruta + '.' : '') + k, texto: v });
      else if (v && typeof v === 'object') textosES(v, (ruta ? ruta + '.' : '') + k, acc);
    });
    return acc;
  }
  return acc;
}

const PATRONES = [
  ['\\bvia\\b(?!\\s+(USB|HDMI|EQ|MIDI))', 'via sin tilde'], ['\\bperformance\\b', 'performance'],
  ['\\bworkflow\\b', 'workflow'], ['\\bsetup\\b', 'setup'], ['\\bbundle\\b', 'bundle'],
  ['\\bbudget\\b', 'budget'], ['\\bcheap\\b', 'cheap'], ['\\baffordable\\b', 'affordable'],
  ['\\bhigh-end\\b|\\blow-end\\b', 'high/low-end'], ['\\bentry-level\\b', 'entry-level'],
  ['\\bflagship\\b', 'flagship'], ['\\bmust-have\\b|\\bmust have\\b', 'must-have'],
  ['\\bdeal-breaker\\b', 'deal-breaker'], ['\\bgame changer\\b', 'game changer'],
  ['\\bdeep dive\\b', 'deep dive'], ['\\bhands-on\\b', 'hands-on'], ['\\bno-brainer\\b', 'no-brainer'],
  ['\\bcaballo[s]? de batalla\\b', 'caballo de batalla'], ['\\bsweet spot\\b', 'sweet spot'],
  ['\\bpunto justo\\b', 'punto justo'], ['\\bheadroom\\b', 'headroom'], ['\\bsoundstage\\b', 'soundstage'],
  ['\\bimaging\\b', 'imaging'], ['\\broom modes\\b', 'room modes'], ['\\bflutter\\b', 'flutter'],
  ['\\bvalue for money\\b', 'value for money'], ['\\bout of the box\\b', 'out of the box'],
  ['\\bcheckea\\b|\\bchequea\\b', 'checkea'], ['\\brankea\\b', 'rankea'],
  ['\\bsample rate\\b', 'sample rate'], ['\\bbit depth\\b', 'bit depth'],
  ['\\bnoise floor\\b', 'noise floor'], ['\\bcrossover\\b', 'crossover'],
  ['\\bboomy\\b|\\bboxy\\b', 'boomy/boxy'], ['\\bmuddy\\b', 'muddy'], ['\\bharsh\\b', 'harsh'],
  ['\\bpunchy\\b', 'punchy'], ['\\bcrisp\\b', 'crisp'], ['\\bsilky\\b', 'silky'],
  ['\\bairy\\b', 'airy'], ['\\bscooped\\b', 'scooped'], ['\\bclean\\b', 'clean'],
  ['\\bflat\\b', 'flat'], ['\\bdeal\\b', 'deal'], ['\\bbeast\\b|\\bkiller\\b|\\binsane\\b', 'beast/killer/insane'],
  ['\\bpremium\\b', 'premium'], ['\\bgama top\\b|\\bestudios top\\b', 'top adjetivo'],
  ['\\bclick\\b', 'click'], ['\\bshipping\\b', 'shipping'], ['\\bwarranty\\b', 'warranty'],
  ['\\bpre-order\\b|\\bpreorder\\b', 'pre-order'], ['\\bcheckout\\b', 'checkout'],
  ['\\breview\\b', 'review'], ['\\bgig\\b', 'gig'], ['\\bhype\\b', 'hype'],
  ['\\bcabe destacar\\b', 'cabe destacar'], ['\\bes importante tener en cuenta\\b', 'relleno IA'],
  ['\\ben términos generales\\b', 'en términos generales'], ['\\btiers\\b', 'tiers'],
  ['\\bdB-A\\b', 'dB-A'], ['\\bdriver\\b', 'driver (revisar)'], ['\\bclipping\\b', 'clipping (revisar)']
];

const HITS = [];
g.forEach(gg => {
  textosES(gg, '', []).forEach(({ campo, texto }) => {
    const limpio = texto.replace(/<[^>]+>/g, ' ');
    PATRONES.forEach(([re, et]) => {
      const m = [...limpio.matchAll(new RegExp('.{0,70}' + re + '.{0,70}', 'gi'))];
      if (m.length) HITS.push({ guia: gg.id, campo, patron: et, n: m.length,
        ejs: [...new Set(m.map(x => x[0].replace(/\s+/g, ' ').trim().slice(0, 140)))].slice(0, 2) });
    });
  });
});
console.log('hits (guia+campo+patron): ' + HITS.length + '  total: ' + HITS.reduce((a, h) => a + h.n, 0));
const porP = {};
HITS.forEach(h => { porP[h.patron] = porP[h.patron] || { n: 0, guias: new Set() }; porP[h.patron].n += h.n; porP[h.patron].guias.add(h.guia); });
console.log('\n=== POR PATRON (solo ES) ===');
Object.entries(porP).sort((a, b) => b[1].n - a[1].n).forEach(([k, v]) => console.log('  ' + String(v.n).padStart(4) + '  ' + k.padEnd(22) + v.guias.size + ' guias'));
fs.writeFileSync(B + 'temp/audit_es_v2.json', JSON.stringify(HITS, null, 1));
