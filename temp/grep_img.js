const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/.local/share/opencode/tool-output/tool_13b243e20001izMDZSCwGNW6tE', 'utf8');
const m = t.match(/https:\/\/audient\.com\/wp-content\/uploads\/[^"' ]+\.(png|jpg|jpeg|webp)/gi) || [];
console.log([...new Set(m)].slice(0, 20).join('\n'));
