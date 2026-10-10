const fs = require('fs');
['guides/best-monitors-for-small-rooms.html', 'guides/best-monitors-for-small-rooms_es.html'].forEach(f => {
  const h = fs.readFileSync(f, 'utf8');
  ['£145.00', '£150.00', '$200.00'].forEach(p => console.log(f.split('/').pop() + ' has ' + p + ': ' + h.includes(p)));
  const ms = h.includes('165,00') || h.includes('165.00');
  console.log(f.split('/').pop() + ' has MS165: ' + ms);
});
