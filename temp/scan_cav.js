const fs = require('fs');
const s = fs.readFileSync('C:/Users/Daniel/.local/share/opencode/tool-output/tool_116f772d3001hr5J0mhacLebod', 'utf8');
const m = s.match(/<meta property="og:image" content="([^"]+)"/);
console.log('CAVERNS IMG: ' + (m ? m[1] : 'NONE'));
const p = s.match(/[$€£][0-9,.]+/);
console.log('price hint: ' + (p ? p[0] : 'NONE'));
