const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-samplers-drum-computers.html', 'utf8');
let i = -1, n = 0;
while ((i = h.indexOf('<table', i + 1)) >= 0 && n < 10) {
  const cls = h.slice(i, i + 120).replace(/\n/g, ' ');
  const end = h.indexOf('</table>', i);
  const body = h.slice(i, end);
  const ths = (body.match(/<th>/g) || []).length;
  const tds = (body.match(/<td/g) || []).length;
  console.log('TABLE', n, '| len:', end - i, '| th:', ths, '| td:', tds, '|', cls.slice(0, 110));
  n++;
}
