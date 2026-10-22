const fs = require('fs');
const pre = JSON.parse(fs.readFileSync('temp/products_pretrim.json', 'utf8'));
const cur = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

function trim(s) {
  if (!s) return s;
  const sentences = s.match(/[^.!?]+[.!?]+/g) || [s];
  let out = '';
  for (const sen of sentences) {
    if ((out + sen).length <= 195) {
      out += sen;
    } else {
      break;
    }
  }
  if (!out) out = sentences[0]; // keep first sentence whole even if long
  return out.trim();
}

for (const p of pre) {
  const c = cur.find(x => x.id === p.id);
  if (c) {
    c.desc = trim(p.desc);
    c.desc_es = trim(p.desc_es);
  }
}

const c24 = cur.find(p => p.id === 24);
c24.title = 'Sennheiser HD 490 Pro';
c24.title_es = 'Sennheiser HD 490 Pro';
c24.price = 399;
c24.stores = {
  amazon: 'https://www.amazon.co.uk/dp/B0CP6C4J5W',
  zzounds: 'https://www.zzounds.com/item--SENHD490PRO',
  gear4music: 'https://www.gear4music.com/us/en/Recording-and-Computers/Sennheiser-HD-490-Pro-Open-Back-Headphones/65EU',
  musicstore: 'https://www.musicstore.com/en_OE/EUR/Sennheiser-HD-490-Pro/art-REC0016604-000',
  andertons: 'https://www.andertons.co.uk/sennheiser-hd-490-pro-headphones'
};

fs.writeFileSync('data/products.json', JSON.stringify(cur, null, 2));
const lens = cur.map(p => (p.desc || '').length);
console.log('max', Math.max(...lens), 'avg', Math.round(lens.reduce((a,b)=>a+b,0)/lens.length));
console.log('sample 1:', cur.find(p=>p.id===1).desc);
console.log('sample 3:', cur.find(p=>p.id===3).desc);