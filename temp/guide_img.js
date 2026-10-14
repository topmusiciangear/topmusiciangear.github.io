const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'beginner-bass-guitars');
console.log('guide.image = ' + g.image);
console.log('guide.image_es = ' + (g.image_es || '(ninguna)'));
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/beginner-bass-guitars.html', 'utf8');
['og:image', 'twitter:image'].forEach(k => {
  const m = new RegExp('<meta property="' + k + '" content="([^"]+)"').exec(h);
  const m2 = new RegExp('<meta name="' + k + '" content="([^"]+)"').exec(h);
  console.log(k + ' -> ' + (m ? m[1] : m2 ? m2[1] : 'no encontrado'));
});
// cuantas guias tienen image
console.log('\nguias con image: ' + guides.filter(x => x.image).length + '/' + guides.length);
console.log('ejemplos:'); guides.slice(0, 5).forEach(x => console.log('  ' + x.id + ' -> ' + x.image));