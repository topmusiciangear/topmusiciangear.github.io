const fs = require('fs');
const b = fs.readFileSync('guides/fx-plugins.html', 'utf8');
['Soundtoys', 'Blackhole', 'ShaperBox', 'RC-20', 'HalfTime', 'Transit', 'Infiltrator', 'Trash', 'Lifeline', 'Motion', 'JUN-6', 'Repeater', 'Smooth'].forEach(name => {
  const idx = b.indexOf(name);
  console.log(name + ': ' + (idx > -1 ? 'FOUND at ' + idx : 'NOT FOUND'));
});