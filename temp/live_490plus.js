const u = 'https://topmusiciangear.com/guides/open-headphones.html?v=' + Date.now();
(async () => {
  const r = await fetch(u);
  const h = await r.text();
  console.log('status', r.status);
  console.log('PlusCard', h.includes('guide-product-card-title">Sennheiser HD 490 Pro Plus'));
  console.log('AmazonPlus', h.includes('B0CP6B497Z'));
  console.log('MusicstorePlus', h.includes('Sennheiser-HD-490-Pro-Plus%2Fart-REC0016605-000'));
  console.log('zzoundsPlus', h.includes('SENHD490PROPLUS'));
  console.log('AndertonsPlus', h.includes('senneheiser-hd-490-pro-plus-headphones'));
})().catch(e => console.log('ERR', e.message));
