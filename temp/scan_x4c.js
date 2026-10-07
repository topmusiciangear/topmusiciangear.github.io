const fs = require('fs');
const s = fs.readFileSync('C:/Users/Daniel/.local/share/opencode/tool-output/tool_116e4ed63001ImiGL57cEOVOB8', 'utf8');
const seg = s.slice(118480, 121500);
console.log(JSON.stringify(seg.slice(0, 1500)));
