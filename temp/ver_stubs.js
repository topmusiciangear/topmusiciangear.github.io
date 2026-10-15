const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
['best-grooveboxes.html', 'midi-keyboards.html', 'bridgecast-x-vs-rodecaster-pro2.html'].forEach(f => {
  const d = fs.readFileSync(B + f, 'utf8');
  console.log('=== ' + f + ' (' + d.length + ' bytes) ===');
  console.log(d.slice(0, 600).replace(/\s+/g, ' '));
  console.log('');
});
const e = fs.readFileSync(B + 'pro-basses_es.html', 'utf8');
console.log('=== pro-basses_es title/h1/lang ===');
console.log('  title: ' + ((e.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || ''));
console.log('  h1: ' + (((e.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '').replace(/<[^>]+>/g, '').trim()));
console.log('  html lang: ' + ((e.match(/<html[^>]*lang="([^"]+)"/) || [])[1] || ''));
