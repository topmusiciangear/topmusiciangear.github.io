const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
const guides = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));

// 1. product 628 -> CMD 102 P V
const mb = products.find(y => y.id === 628);
mb.title = 'Markbass CMD 102 P V';
mb.title_es = 'Markbass CMD 102 P V';
mb.price = 928;
mb.img = 'https://r2.gear4music.com/media/108/1087484/1200/preview.jpg';
mb.stores = {
  gear4music: 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FGuitar-and-Bass%2FMarkbass-CMD-102-P-V%2F6GYN',
  musicstore: 'https://www.musicstore.com/en_OE/EUR/Markbass-CMD-102-P-V-Combo/art-BAS0012899-000',
  andertons: 'https://www.andertons.co.uk/markbass-cmd-102-p-v-500w-bass-combo/'
};

// 2. guide: rename everywhere
const d = guides.find(x => x.id === 'guitar-bass-amps');
const R = (o) => {
  ['heading', 'heading_es', 'content', 'content_es', 'title', 'title_es', 'name', 'name_es', 'verdict', 'verdict_es', 'conclusion', 'conclusion_es'].forEach(k => {
    if (typeof o[k] === 'string') o[k] = o[k].split('CMD 102P IV').join('CMD 102 P V');
  });
};
R(d);
d.sections.forEach(R);
d.verdictProsCons.forEach(R);
d.productTable.columns.forEach(R);
Object.keys(d.featuredSnippet || {}).forEach(k => {
  if (typeof d.featuredSnippet[k] === 'string') d.featuredSnippet[k] = d.featuredSnippet[k].split('CMD 102P IV').join('CMD 102 P V');
});
// table price cell -> £928
const priceRow = d.productTable.rows.find(r => r.label === 'Estimated Price');
const ci = d.productTable.columns.findIndex(c => c.title === 'Markbass CMD 102 P V');
priceRow.values[ci] = { value: '£928', value_es: '£928' };

// 3. TEST_SHOP_BTN 628
let src = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
const line628 = '  628: { prices: { andertons: "\\u00a3928.00", musicstore: "\\u20ac989.00" } },';
if (/^  628:.*$/m.test(src)) src = src.replace(/^  628:.*$/m, line628);
else {
  const anchor = src.match(/^  627:.*$/m);
  if (!anchor) throw new Error('no anchor');
  src = src.replace(anchor[0], anchor[0] + '\n' + line628);
}
fs.writeFileSync(DIR + 'build-guides.js', src);
fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(products, null, 2));
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(guides, null, 2));
const s = JSON.stringify(d);
console.log('IV left:', s.includes('102P IV'), '| P V present:', s.includes('102 P V'));
const m = src.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n *\};/);
console.log('628:', JSON.stringify(Function('return {' + m[1] + '\n}')()[628]));
