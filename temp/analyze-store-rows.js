const fs = require('fs');
const s = fs.readFileSync('guides/budget-headphones.html', 'utf8');
const re = /<a data-store="(\w+)"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g;
let m;
const rowcount = {};
while ((m = re.exec(s)) !== null) {
  const store = m[1];
  const hasOOS = /Out of stock/.test(m[3]);
  const hasPrice = /\$[0-9,.]+|\u00a3[0-9,.]+|\u20ac[0-9,.]+/.test(m[3]);
  const hasNA = /Not Available|No disponible/.test(m[3]);
  rowcount[store] = rowcount[store] || { rows: 0, oos: 0, price: 0, na: 0, blank: 0 };
  rowcount[store].rows++;
  if (hasOOS) rowcount[store].oos++;
  if (hasPrice) rowcount[store].price++;
  if (hasNA) rowcount[store].na++;
  if (!hasOOS && !hasNA && !hasPrice) rowcount[store].blank++;
}
console.log(JSON.stringify(rowcount, null, 1));
