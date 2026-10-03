// Audit 1: Amazon links of new products + format check across catalog.
const P = require('../data/products.json');
[263, 550, 551].forEach(id => {
  const p = P.find(x => x.id === id);
  const u = (p.stores && p.stores.amazon) || 'NO AMAZON STORE';
  const okDp = /\/dp\/[A-Z0-9]{10}/.test(u);
  const okTag = /tag=topmusicg-20/.test(u);
  console.log(id, p.title, '\n  ', u, '\n   dp:', okDp, 'tag:', okTag);
});
// Full-catalog amazon format scan
let badDp = [], badTag = [], noAmz = [];
P.forEach(p => {
  const u = p.stores && p.stores.amazon;
  if (!u) return;
  if (!/\/dp\/[A-Z0-9]{10}/.test(u)) badDp.push(p.id);
  if (!/tag=topmusicg-20/.test(u)) badTag.push(p.id);
});
console.log('amazon bad-dp:', JSON.stringify(badDp));
console.log('amazon bad-tag:', JSON.stringify(badTag));