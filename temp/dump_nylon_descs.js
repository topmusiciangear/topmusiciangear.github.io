const fs = require('fs');
const arr = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const ids = [459, 553, 1058, 1059, 1060, 1061, 1062, 1063, 1064, 1065];
for (const id of ids) {
  const p = arr.find(x => x.id === id);
  console.log('=== ' + id + ' ' + p.title);
  console.log('  EN: ' + p.desc);
  console.log('  ES: ' + p.desc_es);
  const facts = (p.facts || []).filter(f => /50\.8|nut|cejuela/i.test(JSON.stringify(f)));
  if (facts.length) console.log('  FACTS: ' + JSON.stringify(facts));
}
