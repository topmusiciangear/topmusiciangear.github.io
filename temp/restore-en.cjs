const fs = require('fs');
const { execSync } = require('child_process');

function headJSON(file) {
  return JSON.parse(execSync('git show HEAD:' + file, { encoding: 'utf8', maxBuffer: 128 * 1024 * 1024 }));
}

function restore(file) {
  const h = headJSON(file);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const diffs = [];
  function walk(hObj, cObj, pfx) {
    if (hObj == null || cObj == null) return;
    if (Array.isArray(hObj)) {
      for (let i = 0; i < hObj.length; i++) walk(hObj[i], cObj[i], pfx + '[' + i + ']');
      return;
    }
    if (typeof hObj === 'object') {
      for (const k of Object.keys(hObj)) {
        if (k.endsWith('_es')) continue;
        if (!(k in cObj)) continue;
        if (typeof hObj[k] === 'string') {
          if (hObj[k] !== cObj[k]) { diffs.push({ obj: cObj, key: k, val: hObj[k] }); console.log('  ', pfx + '.' + k); }
        } else {
          walk(hObj[k], cObj[k], pfx + '.' + k);
        }
      }
    }
  }
  walk(h, data, '');
  console.log(file, 'EN diffs:', diffs.length);
  for (const d of diffs) d.obj[d.key] = d.val;
  if (diffs.length) fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

restore('data/guides.json');
restore('data/products.json');