const fs = require('fs');
function scan(f, label) {
  if (!fs.existsSync(f)) { console.log(label + ': FILE MISSING'); return; }
  const s = fs.readFileSync(f, 'utf8');
  console.log('=== ' + label + ' ===');
  const re = /"price"\s*:\s*"?([0-9.,]+)"?/g;
  let m, seen = [];
  while ((m = re.exec(s)) && seen.length < 12) seen.push(m[1]);
  console.log('json price:', [...new Set(seen)].join(', '));
  const re2 = /priceCurrency"?\s*:\s*"?([A-Z]{3})/g;
  let m2, c = [];
  while ((m2 = re2.exec(s)) && c.length < 4) c.push(m2[1]);
  console.log('currency:', [...new Set(c)].join(', '));
  const re3 = /£\s?([0-9][0-9,]*(?:\.[0-9]{2})?)/g;
  let m3, p = [];
  while ((m3 = re3.exec(s)) && p.length < 20) p.push(m3[1]);
  console.log('gbp:', [...new Set(p)].join(', '));
  const re4 = /\$\s?([0-9][0-9,]*(?:\.[0-9]{2})?)/g;
  let m4, d = [];
  while ((m4 = re4.exec(s)) && d.length < 20) d.push(m4[1]);
  console.log('usd:', [...new Set(d)].join(', '));
}
const dir = 'C:/Users/Daniel/.local/share/opencode/tool-output/';
scan(dir + 'tool_11636d5ed0015tT6LOgBM5716q', 'G4M TMP');
scan(dir + 'tool_11636f3a0001QWWyFhJlc7i2RD', 'Andertons TMP');
