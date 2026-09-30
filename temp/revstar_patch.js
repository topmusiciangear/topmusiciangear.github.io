const fs = require('fs');

// ---- products.json: id 464 ----
{
  const f = 'data/products.json';
  const raw = fs.readFileSync(f, 'utf8');
  const data = JSON.parse(raw);
  const p = data.find(x => x.id === 464);
  if (!p) throw new Error('id 464 no encontrado');
  p.stores.gear4music = 'https://www.gear4music.com/Guitar-and-Bass/Yamaha-Revstar-Element-RSE20-Black/4PBW';
  p.stores.andertons = 'https://www.andertons.co.uk/yamaha-revstar-element-rse20-black/?search_query=Yamaha%20Revstar%20Element%20RSE20';
  p.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/Yamaha-Revstar-Element-RSE20-Black/art-GIT0058591-000';
  p.excludeStores = (p.excludeStores || []).filter(s => s !== 'musicstore');
  const nl = /\n$/.test(raw);
  fs.writeFileSync(f, JSON.stringify(data, null, 2) + (nl ? '\n' : ''), 'utf8');
  console.log('products.json 464: MS anadido, G4M+Andertons -> Black, excludeStores=' + JSON.stringify(p.excludeStores));
}
