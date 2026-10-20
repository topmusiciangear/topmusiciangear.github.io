const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\guides.json', 'utf8'));
guides.slice(146, 166).forEach((g, i) => {
  console.log(`${146+i}: ${g.id} - ${g.title_es}`);
});