const fs = require('fs');
const crypto = require('crypto');
const urls = [
  'https://cf1.zzounds.com/media/productmedia/fit%2C1200by1200/quality%2C85/at875r_1_sq-d131afcabb5d59bd3eae9b9d21f98b75.jpg',
  'https://cf1.zzounds.com/media/productmedia/fit%2C1200by630/quality%2C85/SennheiserFullWidth-033977c33d261eb2ee34a674b455d34d.jpg',
  'https://cf1.zzounds.com/media/productmedia/fit%2C1200by630/quality%2C85/CavernsFaceNewLogoHiRes-5c215819a8740c25e8c220cdcb52b2b5.jpg',
];
const dir = 'temp/cut_cache';
const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
console.log('cache files:', files.length);
for (const u of urls) {
  const k = crypto.createHash('md5').update(u).digest('hex').slice(0, 10);
  const f = files.find(n => n.startsWith(k + '.'));
  console.log(k, f || 'NO EN CACHE');
}
