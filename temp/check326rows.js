const fs = require('fs');
const s = fs.readFileSync('guides/beginner-bass-guitars.html', 'utf8');
for (const needle of ['item--SIRML1712', 'sire-marcus-miller-v5r-alder-4-string', 'Sire-Marcus-Miller-V5R-Bass-Tobacco-Sunburst/8D1L']) {
  let i = 0, n = 0;
  while ((i = s.indexOf(needle, i)) >= 0) {
    const row = s.slice(i, i + 2500);
    const re = /(\u00a3|\$|\u20ac|&#163;)[0-9.,]+/g;
    const prices = [];
    let m;
    while ((m = re.exec(row)) !== null) prices.push(m[0]);
    console.log('== ' + needle + ' @' + i + ' prices: ' + JSON.stringify(prices) + ' ==');
    i += needle.length;
  }
}