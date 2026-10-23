const fs = require('fs');

// 1) Add a dedicated HD 490 Pro Plus product (id 24 stays "HD 490 Pro" for the vs-DT990 guide)
const productsPath = 'data/products.json';
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
const base = products.find(p => p.id === 24);
if (!base) { console.error('Product 24 not found'); process.exit(1); }

const NEW_ID = 1053;
if (products.some(p => p.id === NEW_ID)) {
  console.log('Product ' + NEW_ID + ' already exists, updating it');
  const existing = products.find(p => p.id === NEW_ID);
  existing.title = 'Sennheiser HD 490 Pro Plus';
  existing.title_es = 'Sennheiser HD 490 Pro Plus';
} else {
  const plus = {
    id: NEW_ID,
    title: 'Sennheiser HD 490 Pro Plus',
    title_es: 'Sennheiser HD 490 Pro Plus',
    brand: 'Sennheiser',
    category: 'headphones',
    price: 479,
    rating: base.rating,
    reviews: base.reviews,
    badge: base.badge,
    desc: base.desc,
    desc_es: base.desc_es,
    img: base.img,
    stores: {
      amazon: 'https://www.amazon.co.uk/dp/B0CP6B497Z',
      zzounds: 'https://www.zzounds.com/item--SENHD490PROPLUS',
      gear4music: 'https://www.gear4music.com/us/en/Recording-and-Computers/Sennheiser-HD-490-Pro-Plus-Open-Back-Headphones/62YL',
      musicstore: 'https://www.musicstore.com/en_OE/EUR/Sennheiser-HD-490-Pro-Plus-mehr-Zubehoer/art-REC0016605-000V000306937',
      andertons: 'https://www.andertons.co.uk/senneheiser-hd-490-pro-plus-headphones/'
    },
    oos: [],
    score: base.score
  };
  products.push(plus);
  console.log('Added product ' + NEW_ID + ' (Sennheiser HD 490 Pro Plus)');
}
fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');

// 2) Point the three "Plus" guides at the new product; leave hd490-pro-vs-dt990 on product 24 (Pro)
const guidesPath = 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(guidesPath, 'utf8'));
const arr = Array.isArray(guides) ? guides : (guides.guides || Object.values(guides));
const plusGuideIds = ['open-headphones', 'best-headphones', 'best-headphones-for-mixing'];
let changed = 0;

for (const id of plusGuideIds) {
  const guide = arr.find(g => g.id === id);
  if (!guide) { console.error('Guide not found: ' + id); continue; }
  for (const section of (guide.sections || [])) {
    if (!Array.isArray(section.products)) continue;
    section.products = section.products.map(pid => {
      if (pid === 24) { changed++; return NEW_ID; }
      return pid;
    });
  }
  if (Array.isArray(guide.featuredProducts)) {
    guide.featuredProducts = guide.featuredProducts.map(pid => {
      if (pid === 24) { changed++; return NEW_ID; }
      return pid;
    });
  }
  console.log('Updated guide ' + id);
}

fs.writeFileSync(guidesPath, JSON.stringify(guides, null, 2), 'utf8');
console.log('References replaced: ' + changed);

// 3) Sanity check
const check = JSON.parse(fs.readFileSync(guidesPath, 'utf8'));
const checkArr = Array.isArray(check) ? check : (check.guides || Object.values(check));
for (const id of plusGuideIds.concat(['hd490-pro-vs-dt990'])) {
  const g = checkArr.find(x => x.id === id);
  const refs = [];
  (g.sections || []).forEach(s => { if ((s.products || []).includes(24)) refs.push('24'); if ((s.products || []).includes(NEW_ID)) refs.push(String(NEW_ID)); });
  console.log(id, '| featured:', JSON.stringify(g.featuredProducts), '| section refs:', refs.join(','));
}
console.log('done');
