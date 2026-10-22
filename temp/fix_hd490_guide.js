const fs = require('fs');

// 1. products.json
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const p24 = products.find(p => p.id === 24);
p24.title = 'Sennheiser HD 490 Pro';
p24.title_es = 'Sennheiser HD 490 Pro';
p24.price = 399;
p24.stores = {
  amazon: 'https://www.amazon.com/dp/B0CP6C4J5W',
  zzounds: 'https://www.zzounds.com/item--SENHD490PRO',
  gear4music: 'https://www.gear4music.com/us/en/Recording-and-Computers/Sennheiser-HD-490-Pro-Open-Back-Headphones/65EU',
  musicstore: 'https://www.musicstore.com/en_OE/EUR/Sennheiser-HD-490-Pro/art-REC0016604-000',
  andertons: 'https://www.andertons.co.uk/sennheiser-hd-490-pro-headphones'
};
const p56 = products.find(p => p.id === 56);
p56.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/beyerdynamic-DT-990-PRO-250-Ohm/art-REC0000948-000';
fs.writeFileSync('data/products.json', JSON.stringify(products, null, 2));

// 2. guides.json
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'hd490-pro-vs-dt990');

// Replace all "HD 490 Pro Plus" with "HD 490 Pro"
function repl(o) {
  if (typeof o === 'string') return o.replace(/HD 490 Pro Plus/g, 'HD 490 Pro');
  if (Array.isArray(o)) return o.map(repl);
  if (o && typeof o === 'object') {
    const out = {};
    for (const k of Object.keys(o)) out[k] = repl(o[k]);
    return out;
  }
  return o;
}
const patched = repl(g);
Object.assign(g, patched);

// Fix comparison table Sennheiser row (val1) to HD 490 Pro specs
const rows = g.comparison.rows;
// Year
rows[0].val1 = '2024'; rows[0].val1_es = '2024';
// Frequency Response
rows[3].val1 = '5 Hz – 36 kHz'; rows[3].val1_es = '5 Hz – 36 kHz';
// Impedance
rows[4].val1 = '130 Ω'; rows[4].val1_es = '130 Ω';
// Driver
rows[5].val1 = '38 mm dynamic'; rows[5].val1_es = '38 mm dinámico';
// Sensitivity
rows[6].val1 = '105 dB'; rows[6].val1_es = '105 dB';
// Max Input Power
rows[7].val1 = '300 mW'; rows[7].val1_es = '300 mW';
// Cable
rows[8].val1 = 'Detachable, 1.8 m, ¼"'; rows[8].val1_es = 'Desmontable, 1.8 m, ¼"';
// Weight stays 260 g

// Fix featuredSnippet price1
g.featuredSnippet.price1 = '399';
g.featuredSnippet.rating1 = 4.6;

// Fix description
g.description = 'Sennheiser HD 490 Pro is my top pick. Full specs, prices and verdict.';
g.description_es = 'Mi elección: Sennheiser HD 490 Pro. Ficha técnica, precios y veredicto.';

fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2));
console.log('done');
