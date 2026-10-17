const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['best-piano-keyboard-vsts.html', 'best-piano-keyboard-vsts_es.html'].forEach(f => {
  const h = fs.readFileSync(B + 'guides/' + f, 'utf8');
  const img = 'r2.gear4music.com/media/121/1211824/1200/preview.jpg';
  const og = [...new Set([...h.matchAll(/property="og:image" content="([^"]+)"/g)].map(m => m[1]))];
  const twitter = [...new Set([...h.matchAll(/name="twitter:image" content="([^"]+)"/g)].map(m => m[1]))];
  const hero = [...new Set([...h.matchAll(/class="guide-hero-img[^"]*"[^>]*src="([^"]+)"|<img[^>]*class="guide-hero[^"]*"[^>]*src="([^"]+)"/g)].map(m => m[1] || m[2]))];
  console.log('=== ' + f);
  console.log('  og:image: ' + (og.length ? og.join(' | ') : 'NINGUNO'));
  console.log('  twitter:image: ' + (twitter.length ? twitter.join(' | ') : 'NINGUNO'));
  console.log('  hero img: ' + (hero.length ? hero.join(' | ') : 'NINGUNA'));
  console.log('  contiene 121/1211824: ' + (h.includes(img) ? 'SI' : 'NO'));
});