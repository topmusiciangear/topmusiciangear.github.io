const H = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0.0.0 Safari/537.36' };

// 1. verificar la foto limpia
const foto = 'https://r2.gear4music.com/media/98/986319/1200/preview_1.jpg';
const r = await fetch(foto, { method: 'GET', headers: H });
const tipo = r.headers.get('content-type');
const bytes = (await r.arrayBuffer()).byteLength;
console.log('=== FOTO ===');
console.log('  ' + foto);
console.log('  status=' + r.status + ' | content-type=' + tipo + ' | bytes=' + bytes);
console.log('  valida (200 + image/*): ' + (r.status === 200 && /^image\//.test(tipo || '') ? 'SI' : 'NO'));

// 2. comprobar que la URL de musicstore apunta al BT
console.log('\n=== ENLACES QUE ME PASAS ===');
const enlaces = [
  ['andertons', 'https://www.andertons.co.uk/presonus-eris-35-in-black/', '\u00A371'],
  ['zzounds', 'https://www.zzounds.com/item--PRSERIS35GEN2?siid=340507', '$100'],
  ['musicstore', 'https://www.musicstore.com/en_OE/EUR/Presonus-Eris-3-5-BT/art-REC0016441-000', '\u20AC114']
];
enlaces.forEach(([k, u, p]) => {
  console.log('  [' + k + '] ' + p.padEnd(6) + ' ' + u);
  console.log('        limpio -> ' + u.replace(/[?&](siid|sr|rdr|search_query|psc|th|_gl|gcl_aw|gclid|fbclid)=[^&]*/g, '').replace(/[?&]$/, ''));
});

// 3. donde se guardan los precios por tienda de los monitores
const fs = await import('node:fs');
const prod = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const p = prod.find(x => x.id === 1042);
console.log('\n=== FICHA 1042 ACTUAL ===');
console.log('  ' + JSON.stringify(p.stores, null, 2));
console.log('  claves del objeto: ' + Object.keys(p).join(', '));
console.log('  price=' + p.price + ' | unit=' + p.unit);
