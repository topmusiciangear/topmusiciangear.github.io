const p = require('./data/products.json');
const g = require('./data/guides.json');
['best-shotgun-mics', 'best-wireless-iems', 'best-parlor-guitars'].forEach(gid => {
  const x = g.find(q => q.id === gid);
  console.log('=== ' + gid + ' | portada: ' + x.image);
  (x.featuredProducts || []).forEach(id => {
    const pr = p.find(q => q.id === id);
    if (!pr) { console.log('  ' + id + ' NO ENCONTRADO'); return; }
    console.log('  ' + id + ' | ' + pr.title);
    console.log('     img: ' + (pr.img || '-').slice(0, 90));
    console.log('     g4m: ' + ((pr.stores && pr.stores.gear4music) || 'SIN LINK'));
  });
});
