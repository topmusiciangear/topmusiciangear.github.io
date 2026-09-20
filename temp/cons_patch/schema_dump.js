const fs = require('fs');
const dir = 'C:/Users/Daniel/projects/topmusiciangear';
const G = require(dir + '/data/guides.json');
const arrG = Array.isArray(G) ? G : (G.guides || []);
const P = require(dir + '/data/products.json');
const arrP = Array.isArray(P) ? P : (P.products || (P.data || []));

console.log('>>> 1) FULL JSON of guide "pro-interfaces" (the closest 'premium' analog) — keys + sizes');
const pro = arrG.find(x => x && x.id === 'pro-interfaces');
console.log('found:', !!proking);
if (pro) {
  console.log('title: ' + pro.title);
  console.log('title_es: ' + pro.title_es);
  console.log('category: ' + pro.category);
  for (const k of Object.keys(pro)) {
    const v = pro[k];
    const t = Array.isArray(v) ? 'array[' + v.length + ']' : (typeof v === 'object' ? 'object' : typeof v);
    console.log('  key[' + k + '] type=' + t);
  }
  console.log('--- featuredProducts sample ---');
  const fp = pro.featuredProducts || [];
  console.log('count=' + fp.length);
  if (fp[0]) console.log(JSON.stringify(fp[0], null, 1).slice(0, 1500));
}

console.log('\n>>> 2) how does products.json tie a product to the guide? field scan of the 2 UA items + a desktop UA');
console.log('searching products.json for apollo/twin x/volt items');
for (const x of arrP || []) {
  const blob = JSON.stringify(x).toLowerCase();
  if (blob.indexOf('apollo') >= 0 || blob.indexOf('apollo twin x') >= 0) {
    console.log('  HIT: title="' + (x.title || '') + '" id=' + x.id +
      ' | keys=' + Object.keys(x).join(',') +
      ' | category=' + x.category + ' | price=' + x.price);
    console.log('    img=' + (x.img || ''));
    console.log('    stores=' + JSON.stringify(x.stores));
  }
}

console.log('\n>>> 3) schema of a product in products.json that ALREADY has full stores/hrefs/prices set + img (pick id 16 vs 182, whichever exists)');
for (const tid of [16, 182]) {
  const x = (arrP || []).find(p => p && Number(p.id) === tid);
  if (!x) { console.log('id ' + tid + ' not found'); continue; }
  console.log('--- id=' + tid + ' title=' + x.title);
  console.log('  img=' + x.img);
  console.log('  stores=' + JSON.stringify(x.stores));
  console.log('  affiliate=' + JSON.stringify(x.affiliate));
  console.log('  desc=' + (x.desc || '').slice(0, 120));
  console.log('  desc_es=' + (x.desc_es || '').slice(0, 120));
}

console.log('\n>>> 4) cover image usage: does any guide carry a "cover"/"cover_img"/"image" that becomes the guide header, and where does portable-interfaces get its cover?');
for (const ign of ['portable-interfaces', 'pro-interfaces', 'starter-interfaces']) {
  const t = arrG.find(x => x && x.id === ign);
  if (!t) { console.log('--- ' + ign + ': NOT FOUND'); continue; }
  console.log('--- ' + ign + ':');
  for (const k of ['cover', 'cover_img', 'image', 'img', 'hero_img', 'featuredProductImages']) {
    const v = t[k];
    if (v !== undefined && v !== null && v !== '') {
      const s = typeof v === 'string' ? v.slice(0, 100) : JSON.stringify(v).slice(0, 100);
      console.log('   ' + k + '=' + s);
    }
  }
  console.log('   imageProductTable? featuredProducts[0]=' + JSON.stringify((t.featuredProducts || [])[0] || null).slice(0, 120));
}
