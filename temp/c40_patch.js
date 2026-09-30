const fs = require('fs');

// ---------- products.json: id 459 (Yamaha C40) ----------
{
  const f = 'data/products.json';
  const raw = fs.readFileSync(f, 'utf8');
  const data = JSON.parse(raw);
  const p = data.find(x => x.id === 459);
  if (!p) throw new Error('id 459 no encontrado');
  p.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/Yamaha-C40-Classical-Guitar-/art-GIT0000636-000';
  p.stores.andertons = 'https://www.andertons.co.uk/yamaha-c40ii-nylon-classical-guitar/';
  p.excludeStores = (p.excludeStores || []).filter(s => s !== 'musicstore' && s !== 'andertons');
  const nl = /\n$/.test(raw);
  fs.writeFileSync(f, JSON.stringify(data, null, 2) + (nl ? '\n' : ''), 'utf8');
  console.log('products.json 459: MS + Andertons anadidos, excludeStores=' + JSON.stringify(p.excludeStores));
}
