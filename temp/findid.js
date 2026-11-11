const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json','utf8').split('\n');
for (let i = 107061; i >= 0; i--) {
  if (lines[i].includes('"id":')) {
    console.log('Line ' + (i+1) + ': ' + lines[i].trim());
    break;
  }
}
