const fs = require('fs');
const s = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/score_overrides.js', 'utf8');
const idx = s.indexOf("'open-headphones'");
const start = s.lastIndexOf('\n', idx) + 1;
let end = s.indexOf('\n  },', idx);
if (end === -1) end = s.indexOf('\n  }', idx);
end = s.indexOf('\n', end) + 1;
console.log(s.substring(start, end));
