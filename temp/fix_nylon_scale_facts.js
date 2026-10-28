const fs = require('fs');
const path = 'data/products.json';
const raw = fs.readFileSync(path, 'utf8');
const eol = raw.includes('\r\n') ? '\r\n' : '\n';
const lines = raw.split(/\r?\n/);

// product id -> new scale fact value
const fix = {
  459: '650 mm',   // Yamaha C40II (25.6 in)
  553: '643 mm',   // Fender CN-60S (25.3 in)
  554: '650 mm',   // Takamine GC1 (25.6 in)
  273: '650 mm',   // Yamaha SLG200N (25.6 in)
};
const targets = { 459: 21770, 553: 26092, 554: 26145, 273: 12441 };

let changed = 0;
for (const [id, lineNo] of Object.entries(targets)) {
  const i = lineNo - 1;
  const line = lines[i];
  if (!/"value":\s*"25\.[36] in",/.test(line)) {
    console.log('SKIP id ' + id + ' line ' + lineNo + ' unexpected: ' + line.trim());
    continue;
  }
  // confirm the owning product id by scanning upwards
  let owner = null;
  for (let j = i; j > Math.max(0, i - 150); j--) {
    const m = lines[j].match(/"id":\s*(\d+)/);
    if (m) { owner = m[1]; break; }
  }
  if (owner !== String(id)) {
    console.log('SKIP id ' + id + ' line ' + lineNo + ' owner mismatch: ' + owner);
    continue;
  }
  lines[i] = line.replace(/"25\.[36] in"/, '"' + fix[id] + '"');
  changed++;
  console.log('id ' + id + ' -> ' + fix[id] + '  (' + line.trim() + ' => ' + lines[i].trim() + ')');
}
fs.writeFileSync(path, lines.join(eol));
console.log('changed:', changed);
