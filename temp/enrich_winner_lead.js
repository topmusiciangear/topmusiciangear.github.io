const fs = require('fs');
const f = 'data/guides.json';
const gs = JSON.parse(fs.readFileSync(f, 'utf8'));
const g = gs.find(x => x.id === 'best-studio-monitors-under-150');

const enOld = '<p><strong>In this price range, <span class="product-name">Mackie CR4.5</span> is the best value.</strong> </p>';
const esOld = '<p><strong>En este rango de precio, <span class="product-name">Mackie CR4.5</span> es el que mejor compensa.</strong> </p>';

const enNew = '<p><strong>In this price range, <span class="product-name">Mackie CR4.5</span> is the best value.</strong> A 4.5-inch woven woofer that reaches 65 Hz at minus 3 dB, 50 W RMS (2x25 W bi-amp) and a rear port, for $129.99 a pair: the deepest low end in this guide at that price.</p>';
const esNew = '<p><strong>En este rango de precio, <span class="product-name">Mackie CR4.5</span> es el que mejor compensa.</strong> Woofer tejido de 4,5 pulgadas que baja a 65 Hz a menos 3 dB, 50 W RMS (2x25 W bi-amplificados) y puerto trasero, por $129.99 el par: el grave más profundo de esta guía por ese dinero.</p>';

if (!g.verdict.includes(enOld)) throw new Error('EN lead not found');
if (!g.verdict_es.includes(esOld)) throw new Error('ES lead not found');
g.verdict = g.verdict.replace(enOld, enNew);
g.verdict_es = g.verdict_es.replace(esOld, esNew);
fs.writeFileSync(f, JSON.stringify(gs, null, 2));
console.log('ok');
console.log(g.verdict.slice(0, 340));
console.log(g.verdict_es.slice(0, 340));
