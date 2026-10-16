const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/Daniel/.local/share/opencode/tool-output';
const files = fs.readdirSync(dir).filter(f => /^tool_1458/.test(f));
files.forEach(f => {
  const h = fs.readFileSync(path.join(dir, f), 'utf8');
  const t = (h.match(/<meta property="og:title" content="([^"]*)"/) || [])[1];
  if (!t) return;
  // candidate price patterns
  const pats = [
    /"regular_price"\s*:\s*"?([\d.]+)"?/,
    /"price"\s*:\s*"?([\d.]+)"?/,
    /data-price="([\d.]+)"/,
    /"amount"\s*:\s*"?([\d.]+)"?/,
    /€\s?([\d.,]+)/,
    /\$\s?([\d.,]+)/
  ];
  const found = [];
  // find price near "Add to Cart" or product info
  const idx = h.search(/Add to Cart/i);
  const window_ = idx > -1 ? h.substring(Math.max(0, idx - 2000), idx + 500) : '';
  const money = [...new Set((window_.match(/(€|\$|£)\s?[\d.,]+/g) || []))].slice(0, 6);
  console.log(t + ' || ' + money.join(' / '));
});
