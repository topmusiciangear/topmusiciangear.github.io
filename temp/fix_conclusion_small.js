const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const rg = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(rg, 'utf8'));
const g = guides.find(x => x.id === 'best-monitors-for-small-rooms');
const st = s => String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

console.log('ANTES (EN, ' + st(g.conclusion).length + ' car.):');
console.log('  ' + st(g.conclusion).slice(0, 260) + '...');

const NUEVO = '<p><strong>For most small rooms, the JBL 305P MkII is the best choice.</strong> Its Boundary EQ, wide waveguide and neutral response deliver the most accuracy for the money. Want more low end without jumping to 7 inches? The Kali LP-6 V2 is the best 6.5-inch pick, with a front port and Boundary EQ for near-wall placement. For the industry-standard reference that translates everywhere, the Yamaha HS5 (around $398 a pair) brings brutally honest midrange plus Room Control and HIGH TRIM switches to tame small-room bass. On a cramped desk, the ADAM D3V brings ribbon-tweeter detail, the Kali LP-UNF brings near-wall bass with Boundary EQ, the iLoud Micro Monitor Pro is the backpack-sized reference, and the iLoud MTM MKII is the most powerful compact for serious mixing. The Neumann KH 80 DSP is the most adjustable monitor here for room correction, the Genelec 8010A is the reference compact for those who can pay for it, the ADAM T5V brings ADAM&#39;s ribbon-tweeter detail at the most affordable price in this guide, and the Genelec 8030C is the professional reference with the tightest plus or minus 2 dB tolerance. The KRK Rokit 5 G5 adds DSP room correction with three voicings for under $400 a pair. Whichever you choose, invest in bass traps and first-reflection absorption before upgrading your monitors.</p><p><strong>Also worth reading:</strong> JBL 305P vs Kali LP-6 Adam Audio vs Genelec: tweeter, sound and value</p>';

g.conclusion = NUEVO;
fs.writeFileSync(rg, JSON.stringify(guides, null, 2), 'utf8');

console.log('');
console.log('DESPUES (EN, ' + st(g.conclusion).length + ' car.):');
console.log('  ' + st(g.conclusion).slice(0, 260) + '...');

// duplicados Gone?
const t = st(g.conclusion).toLowerCase();
console.log('');
[['for most small rooms', 'debe ser 1'], ['boundary eq', 'debe ser 2'], ['front port', 'debe ser 1'],
 ['near-wall placement', 'debe ser 1']].forEach(([k, exp]) => {
  const n = t.split(k).length - 1;
  console.log('  "' + k + '" x' + n + '  (' + exp + ')');
});

// verificacion HTML global
const g2 = JSON.parse(fs.readFileSync(rg, 'utf8'));
let malas = 0;
g2.forEach(x => {
  ['intro', 'conclusion', 'verdict', 'description', 'intro_es', 'conclusion_es', 'verdict_es', 'description_es']
    .forEach(k => {
      const c = x[k]; if (typeof c !== 'string') return;
      if ((c.match(/<p>/g) || []).length !== (c.match(/<\/p>/g) || []).length) { malas++; console.log('  ROTA ' + x.id + '.' + k); }
    });
  (x.sections || []).forEach((s, i) => ['content', 'content_es'].forEach(k => {
    const c = s[k]; if (typeof c !== 'string') return;
    if ((c.match(/<p>/g) || []).length !== (c.match(/<\/p>/g) || []).length) { malas++; console.log('  ROTA ' + x.id + '.sec' + i + '.' + k); }
  }));
});
console.log('');
console.log('HTML desequilibrado en todo el sitio: ' + malas);