const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const btn = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
const checks = [['A', 'B', '€777'], ['B', 'B', '£635.00']];
checks.forEach(function (c) {
  const label = c[0], where = c[1], snip = c[2];
  console.log(label, where, JSON.stringify(snip), btn.includes(snip));
});
