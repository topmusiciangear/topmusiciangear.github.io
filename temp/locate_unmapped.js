const fs = require('fs');
const targets = [
  'https://r2.gear4music.com/media/44/443840/1200/preview.jpg',
  'https://cf1.zzounds.com/media/productmedia/fit%2C1200by1200/quality%2C85/at875r_1_sq-d131afcabb5d59bd3eae9b9d21f98b75.jpg',
  'https://cf1.zzounds.com/media/productmedia/fit%2C1200by630/quality%2C85/SennheiserFullWidth-033977c33d261eb2ee34a674b455d34d.jpg',
  'https://media.sweetwater.com/m/products/image/d41fa3bc4fIiJLUaE9FGJzYcDV2lGKMlnmWjz5uc.jpg?quality=82&width=215&ha=d41fa3bc4f3d9779',
  'https://r2.gear4music.com/media/113/1138813/1200/preview.jpg',
  'https://cf1.zzounds.com/media/productmedia/fit%2C1200by630/quality%2C85/CavernsFaceNewLogoHiRes-5c215819a8740c25e8c220cdcb52b2b5.jpg',
  'https://www.celemony.com/images/products/melodyne-5/melodyne-5.jpg',
];

for (const file of ['data/products.json', 'data/guides.json']) {
  const list = JSON.parse(fs.readFileSync(file, 'utf8'));
  const walk = (obj, path, id) => {
    if (typeof obj === 'string') {
      for (const t of targets) {
        if (obj.includes(t)) {
          console.log(file + ' | ' + (id || '') + ' | ' + path + ' -> ' + t.slice(0, 70));
        }
      }
    } else if (Array.isArray(obj)) {
      obj.forEach((v, i) => walk(v, path + '[' + i + ']', id));
    } else if (obj && typeof obj === 'object') {
      const ident = obj.id !== undefined ? 'id=' + obj.id : id;
      for (const k of Object.keys(obj)) walk(obj[k], path + '.' + k, ident);
    }
  };
  walk(list, '', '');
}
