const fs = require('fs');
const files = [
  'guides/open-headphones.html',
  'guides/open-headphones_es.html',
  'guides/best-headphones.html',
  'guides/best-headphones_es.html',
  'guides/best-headphones-for-mixing.html',
  'guides/best-headphones-for-mixing_es.html'
];
for (const f of files) {
  const h = fs.readFileSync(f, 'utf8');
  const ok = {
    plusCard: h.includes('guide-product-card-title">Sennheiser HD 490 Pro Plus'),
    amazonPlus: h.includes('B0CP6B497Z'),
    zzoundsPlus: h.includes('SENHD490PROPLUS'),
    g4m62YL: h.includes('62YL'),
    musicstorePlus: h.includes('Sennheiser-HD-490-Pro-Plus%2Fart-REC0016605-000'),
    andertonsPlus: h.includes('senneheiser-hd-490-pro-plus-headphones')
  };
  console.log(f, JSON.stringify(ok));
}
