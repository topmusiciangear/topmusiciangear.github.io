const fs = require('fs');
const list = JSON.parse(fs.readFileSync('temp/img_manifest.json', 'utf8'));
const extra = [
  'https://r2.gear4music.com/media/44/443840/1200/preview.jpg',
  'https://media.sweetwater.com/m/products/image/d41fa3bc4fIiJLUaE9FGJzYcDV2lGKMlnmWjz5uc.jpg?quality=82&width=215&ha=d41fa3bc4f3d9779',
  'https://r2.gear4music.com/media/113/1138813/1200/preview.jpg',
  'https://www.celemony.com/images/products/melodyne-5/melodyne-5.jpg',
];
const have = new Set(list.map(x => x.url));
for (const u of extra) if (!have.has(u)) list.push({ url: u, refs: ['products.image'] });
fs.writeFileSync('temp/img_manifest.json', JSON.stringify(list, null, 1));
console.log('manifest:', list.length);
