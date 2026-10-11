var fs = require('fs');
var m = JSON.parse(fs.readFileSync('data/manual-deals.json', 'utf8'));
var before = m.length;
m = m.filter(function (x) { return x.title !== 'QSC K10.2 Powered Loudspeaker'; });
m.forEach(function (x) {
  if (x.title === 'JPTR FX Warlow Fuzz') x.img = 'https://rvb-img.reverb.com/i/s--5GRvkNro--/quality=medium-low,height=800,width=800,fit=contain/76361fcc-0e5a-4f1f-b5a3-d5a4fe936f9c.jpg';
});
fs.writeFileSync('data/manual-deals.json', JSON.stringify(m, null, 2) + '\n');
console.log('manual: ' + before + ' -> ' + m.length + ' | K10.2 removed, Warlow img set');
