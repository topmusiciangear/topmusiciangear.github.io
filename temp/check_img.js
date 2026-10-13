const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const NEW = '1038820';
const OLD = '1068690';

['guides/rodecaster-pro2-vs-bridgecast-x.html', 'guides/rodecaster-pro2-vs-bridgecast-x_es.html'].forEach(function (p) {
  const h = fs.readFileSync(BASE + p, 'utf8');
  console.log('=== ' + p + ' ===');
  const og = (h.match(/property="og:image" content="([^"]+)"/) || [])[1];
  const tw = (h.match(/property="twitter:image" content="([^"]+)"/) || [])[1];
  console.log('  og:image     : ' + og);
  console.log('  twitter:image: ' + tw);
  const heroImgs = [];
  const re = /<img[^>]+src="([^"]+)"[^>]*>/g; let m;
  while ((m = re.exec(h)) !== null) if (/1038820|1068690/.test(m[1])) heroImgs.push(m[1] + '   [alt=' + ((m[0].match(/alt="([^"]*)"/) || [])[1] || '') + ']');
  heroImgs.forEach(i => console.log('  img: ' + i));
  // JSON-LD
  const ld = h.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g) || [];
  ld.forEach((s, i) => { if (/1038820|1068690/.test(s)) console.log('  JSON-LD[' + i + '] contiene ' + (/1038820/.test(s) ? 'NUEVA' : '') + (/1068690/.test(s) ? ' VIEJA' : '')); });
  console.log('  ocurrencias NUEVA (1038820): ' + (h.match(new RegExp(NEW, 'g')) || []).length);
  console.log('  ocurrencias VIEJA (1068690): ' + (h.match(new RegExp(OLD, 'g')) || []).length);
  console.log('');
});