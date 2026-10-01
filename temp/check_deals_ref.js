const fs = require('fs');
['data/deals.json', 'data/manual-deals.json'].forEach(f => {
  try {
    const ids = JSON.stringify(JSON.parse(fs.readFileSync(f, 'utf8')));
    [184, 440, 312, 320].forEach(id => {
      if (new RegExp('"(id|productId)":' + id + '\\b').test(ids)) console.log(f + ' menciona ' + id);
    });
  } catch (e) { console.log(f + ': ' + e.message.slice(0, 60)); }
});
console.log('hecho');
