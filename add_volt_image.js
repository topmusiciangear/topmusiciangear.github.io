const fs = require('fs');
const manifest = JSON.parse(fs.readFileSync('temp/img_manifest.json', 'utf8'));
const newUrl = 'https://r2.gear4music.com/media/143/1433044/1200/preview.jpg';
const exists = manifest.find(e => e.url === newUrl);
if (!exists) {
  manifest.push({ url: newUrl, refs: ['products.img#55'] });
  fs.writeFileSync('temp/img_manifest.json', JSON.stringify(manifest, null, 2), 'utf8');
  console.log('Added to manifest');
} else {
  console.log('Already in manifest');
}