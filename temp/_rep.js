const fs = require('fs');
const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const terms = ['Squier Sonic Stratocaster', 'Squier Sonic Mustang', 'Ibanez Gio', 'Ibanez GRG', 'Yamaha Revstar'];
terms.forEach(function (t) {
  const matches = p.filter(x => x.title && x.title.toLowerCase().indexOf(t.toLowerCase()) > -1);
  console.log('--- "' + t + '":', matches.length, 'match(es)');
  matches.forEach(function (m) {
    console.log('   id=' + m.id, JSON.stringify(m.title), '| price=' + m.price, '| img=' + (m.img || '').slice(0, 60));
  });
});
