const fs = require('fs');
const { execSync } = require('child_process');

function loadHead(f) {
  return JSON.parse(execSync('git show HEAD:' + f, { encoding: 'utf8', maxBuffer: 128 * 1024 * 1024 }));
}

function restore(all_diffs) {
  let total = 0;
  for (const { file, guide, pfx, h } of all_diffs) {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    const o = guide.found;
    let cur = o;
    for (let i = 0; i < pfx.length - 1; i++) cur = cur[pfx[i]];
    const leaf = pfx[pfx.length - 1];
    if (cur[leaf] !== h) {
      cur[leaf] = h;
      total++;
    }
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  }
  return total;
}
exports.restore = restore;
exports.loadHead = loadHead;