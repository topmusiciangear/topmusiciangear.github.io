const fs = require('fs');
const ids = ['best-interface', 'portable-interfaces', 'budget-interfaces', 'fix-clipping-scarlett', 'streaming-interfaces'];
let ok = true;
ids.forEach(id => {
  [id + '.html', id + '_es.html'].forEach(f => {
    const h = fs.readFileSync('guides/' + f, 'utf8');
    const has = h.indexOf('https://r2.gear4music.com/media/71/711891/1200/preview_1.jpg') > -1;
    if (!has) ok = false;
    console.log((has ? 'ok ' : 'FALTA ') + f);
  });
});
console.log(ok ? 'ALL 10 PAGES OK' : 'FALTA EN ALGUNA');