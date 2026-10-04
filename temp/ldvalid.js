const fs = require('fs');
const files = ['guides/pro-microphones.html', 'guides/best-5-string-basses.html', 'guides/budget-monitors_es.html', 'guides/stream-controllers.html'];
files.forEach(f => {
  const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/' + f, 'utf8');
  const blocks = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  let ok = 0, bad = 0;
  blocks.forEach(m => {
    try { JSON.parse(m[1]); ok++; } catch (e) { bad++; console.log(f, 'BAD BLOCK:', e.message.slice(0, 80)); }
  });
  console.log(f, 'jsonld ok=' + ok, 'bad=' + bad);
});