const fs = require('fs');
const s = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
// buscar cualquier construccion que escriba data-aff (incluso dinamica)
['data-aff', 'data-\'+\'aff', 'data-"+"aff', "'aff'", '"aff"'].forEach(k => {
  let i = -1, n = 0;
  while ((i = s.indexOf(k, i + 1)) > -1) {
    n++;
    if (n <= 10) console.log('[' + k + '] L' + s.slice(0, i).split('\n').length + ': ...' + s.slice(Math.max(0, i - 100), i + 60).replace(/\s+/g, ' ') + '...');
  }
  console.log('^^^ "' + k + '": ' + n + ' apariciones\n');
});
