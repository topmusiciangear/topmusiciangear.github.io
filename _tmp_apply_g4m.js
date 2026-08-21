const fs = require('fs');

const imgs = JSON.parse(fs.readFileSync('_tmp_images.json', 'utf8'));

// links G4M verificados via metodo Google (paginas reales de producto)
const LINKS = {
  349: 'https://www.gear4music.com/us/en/PA-DJ-and-Lighting/Sennheiser-EW-IEM-G4-Wireless-In-Ear-Monitor-System-GB-Band/2B9S',
  266: 'https://www.gear4music.com/us/en/PA-DJ-and-Lighting/Sennheiser-EW-IEM-G4-Wireless-Twin-In-Ear-Monitor-System-E-Band/2BBW',
  347: 'https://www.gear4music.com/us/en/PA-DJ-and-Lighting/Xvive-U4-Wireless-In-Ear-Monitor-System/4P0B',
  348: 'https://www.gear4music.com/PA-DJ-and-Lighting/Xvive-U4R4-Wireless-In-Ear-Monitor-System-with-4-Receivers/4P0I',
  351: 'https://www.gear4music.com/PA-DJ-and-Lighting/LD-Systems-U508-IEM-In-Ear-Monitoring-System/2Y37',
  352: 'https://www.gear4music.com/us/en/Guitar-and-Bass/Gretsch-G9500-Jim-Dandy-Flat-Top-Acoustic-2-Color-Sunburst/PWS',
  353: 'https://www.gear4music.com/us/en/Guitar-and-Bass/Yamaha-CSF1M-Travel-Guitar-Vintage-Natural/2BNV',
  354: 'https://www.gear4music.com/us/en/Guitar-and-Bass/PRS-SE-P20E-Parlour-Electro-Acoustic-Fire-Red-Burst-2026/7N4Y',
  355: 'https://www.gear4music.com/Guitar-and-Bass/Epiphone-L-00-Studio-Electro-Acoustic-Vintage-Sunburst/UFL',
  356: 'https://www.gear4music.com/Guitar-and-Bass/Fender-CP-60S-Parlor-Acoustic-Guitar-Natural/2KPW',
  357: 'https://www.gear4music.com/us/en/Guitar-and-Bass/Gretsch-G5021E-Rancher-Penguin-Parlor-Electro-Acoustic-Black/4N6S'
};

// covers representativos por guia (producto estrella)
const COVERS = {
  'best-wireless-iems': 349,
  'best-parlor-guitars': 352,
  'best-shotgun-mics': 339
};

const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
let imgCount = 0, linkCount = 0;
Object.entries(imgs).forEach(([id, v]) => {
  if (!v || !v.img || v.cdn !== 200) { console.log(id + ': skip (sin imagen o cdn != 200)'); return; }
  const p = products.find(x => x.id === Number(id));
  if (!p) { console.log(id + ': producto no encontrado'); return; }
  p.img = v.img;
  imgCount++;
});
Object.entries(LINKS).forEach(([id, url]) => {
  const p = products.find(x => x.id === Number(id));
  if (!p) { console.log(id + ': link - producto no encontrado'); return; }
  p.stores = p.stores || {};
  if (!p.stores.gear4music) { p.stores.gear4music = url; linkCount++; }
});
fs.writeFileSync('data/products.json', JSON.stringify(products, null, 1));

const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
Object.entries(COVERS).forEach(([gid, pid]) => {
  const g = guides.find(x => x.id === gid);
  const p = products.find(x => x.id === pid);
  if (g && p) g.image = p.img;
});
fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2));
console.log('imagenes actualizadas: ' + imgCount + ' | links g4m añadidos: ' + linkCount + ' | covers: 3');
