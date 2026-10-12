var fs = require('fs');
// merge-only rebuild: keep current auto entries, merge manual file (same dedupe as auto-deals.js)
var cur = JSON.parse(fs.readFileSync('data/deals.json', 'utf8'));
var autoDeals = cur.filter(function (d) { return d.source === 'auto'; });
var manual = JSON.parse(fs.readFileSync('data/manual-deals.json', 'utf8'));
var merged = [];
var seenId = new Set(), seenTitle = new Set();
for (const d of [...autoDeals, ...manual]) {
  if (d.product_id != null && seenId.has(d.product_id)) continue;
  if (seenTitle.has(d.title)) continue;
  if (d.product_id != null) seenId.add(d.product_id);
  seenTitle.add(d.title);
  merged.push(d);
}
fs.writeFileSync('data/deals.json', JSON.stringify(merged, null, 2) + '\n', 'utf8');
console.log('merged: ' + merged.length + ' (auto=' + autoDeals.length + ', manual=' + manual.length + ')');
