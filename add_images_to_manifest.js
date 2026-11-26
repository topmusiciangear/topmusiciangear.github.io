const fs = require('fs');
const manifest = JSON.parse(fs.readFileSync('temp/img_manifest.json', 'utf8'));

const newUrls = [
  'https://r2.gear4music.com/media/147/1470150/1200/preview.jpg',
  'https://r2.gear4music.com/media/143/1433053/1200/preview.jpg'
];

let added = 0;
newUrls.forEach(url => {
  const exists = manifest.find(e => e.url === url);
  if (!exists) {
    manifest.push({ url: url, refs: ['products.img#new'] });
    added++;
    console.log('Added:', url);
  } else {
    console.log('Already in manifest:', url);
  }
});

fs.writeFileSync('temp/img_manifest.json', JSON.stringify(manifest, null, 2), 'utf8');
console.log('Total entries now:', manifest.length);
console.log('Added:', added);