const fs = require('fs');
const f = 'C:/Users/Daniel/.local/share/opencode/tool-output/tool_116a217c1001vYZZ3d0vi2m2w8';
const s = fs.readFileSync(f, 'utf8');
const i = s.indexOf('866573');
console.log(JSON.stringify(s.slice(Math.max(0, i - 600), i + 300)));
console.log('---PRICE-AREA---');
const j = s.indexOf('not available for purchase');
console.log(JSON.stringify(s.slice(Math.max(0, j - 800), j + 200)));
