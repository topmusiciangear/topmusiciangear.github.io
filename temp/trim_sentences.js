const fs = require('fs');
const pre = JSON.parse(fs.readFileSync('temp/products_pretrim.json', 'utf8'));
const cur = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

function trim(s, title, titleEs, isEs) {
  if (!s) return s;
  let src = s;
  // For short descriptions, prepend the product name for context (uses existing info)
  if (s.length < 120) {
    const t = isEs ? (titleEs || title) : title;
    src = t + ': ' + s;
  }
  const sentences = src.match(/[^.!?]+[.!?]+/g) || [src];
  let out = '';
  for (const sen of sentences) {
    if (out.length >= 150) break;
    if (out.length + sen.length <= 300 || out.length < 120) {
      out += sen;
    } else {
      break;
    }
  }
  if (!out) out = sentences[0];
  return out.trim();
}

for (const p of pre) {
  const c = cur.find(x => x.id === p.id);
  if (c) {
    c.desc = trim(p.desc, p.title, p.title_es, false);
    c.desc_es = trim(p.desc_es, p.title, p.title_es, true);
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
const lens = cur.map(p => (p.desc || '').length).sort((a,b)=>a-b);
console.log('min:', lens[0], 'max:', lens[lens.length-1]);
console.log('under 100:', lens.filter(l=>l<100).length);
console.log('under 120:', lens.filter(l=>l<120).length);
const sorted = cur.slice().sort((a,b)=>(a.desc||'').length-(b.desc||'').length);
for (const x of sorted.slice(0,3)) console.log(x.id, x.desc.length, '|', x.desc);