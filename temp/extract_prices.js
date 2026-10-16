const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/Daniel/.local/share/opencode/tool-output';
const files = fs.readdirSync(dir).filter(f => f.startsWith('tool_1458') || f.startsWith('tool_14589') || f.startsWith('tool_1458b') || f.startsWith('tool_1458c') || f.startsWith('tool_1458d') || f.startsWith('tool_1458e') || f.startsWith('tool_1458f') || f.startsWith('tool_14580') || f.startsWith('tool_14581'));
// map: find og:title + price-ish data per file
files.forEach(f => {
  const h = fs.readFileSync(path.join(dir, f), 'utf8');
  const t = (h.match(/<meta property="og:title" content="([^"]*)"/) || [])[1] || '?';
  if (t === '?') return;
  // look for JSON-LD offers price
  const ld = (h.match(/"price"\s*:\s*"([^"]*)"/g) || []).slice(0, 4);
  const usd = [...new Set(h.match(/\$\d[\d,.]*/g) || [])].slice(0, 8).join(' ');
  console.log(t + ' | ld=' + ld.join(';') + ' | $=' + usd);
});
