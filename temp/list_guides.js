const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\guides.json', 'utf8');
const lines = content.split('\n');
let guides = [];
lines.forEach((line, i) => {
  const match = line.match(/^\s+"id":\s+"([^"]+)"/);
  if (match) {
    guides.push({ index: guides.length, id: match[1], line: i + 1 });
  }
});
guides.slice(60, 88).forEach(g => console.log(g.index + ': ' + g.id + ' (line ' + g.line + ')'));