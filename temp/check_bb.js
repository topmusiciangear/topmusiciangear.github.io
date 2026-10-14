const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8')).find(x => x.id === 'beginner-bass-guitars');
const all = JSON.stringify(g);
['Player II', 'B-204SM', 'Ultra II', 'AmPro', 'American Professional', 'Precision Bass', 'Jazz Bass'].forEach(w => {
  console.log('"' + w + '": ' + (all.split(w).length - 1));
});
