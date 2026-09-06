const fs = require('fs');
const { execSync } = require('child_process');

function diffEN(file, keyFn) {
  const headRaw = execSync('git show HEAD:' + file, { encoding: 'utf8', maxBuffer: 128 * 1024 * 1024 });
  const h = JSON.parse(headRaw);
  const c = JSON.parse(fs.readFileSync(file, 'utf8'));
  const fixes = [];
  function walk(hObj, cObj, pfx) {
    if (hObj == null || cObj == null) return;
    if (Array.isArray(hObj)) {
      for (let i = 0; i < hObj.length; i++) walk(hObj[i], cObj[i], pfx + '[' + i + ']');
      return;
    }
    if (typeof hObj === 'object' && !Array.isArray(hObj)) {
      for (const k of Object.keys(hObj)) {
        if (k.endsWith('_es')) continue;
        if (cObj == null || !(k in cObj)) continue;
        if (typeof hObj[k] === 'string') {
          if (hObj[k] !== cObj[k]) fixes.push({ pfx: pfx + '.' + k, val: hObj[k] });
        } else {
          walk(hObj[k], cObj[k], pfx + '.' + k);
        }
      }
    }
  }
  walk(h, c, '');
  console.log(file, 'EN-field diffs:', fixes.length);
  for (const f of fixes) console.log('   ', f.pfx);
  return fixes.length ? fixes : null;
}

const gd = diffEN('data/guides.json');
if (gd) {
  const data = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
  const allPaths = gd.map(f => f.pfx);
  // create a set of leaf pointers via object reference collection
  function collect(o, pfx, list) {
    if (list.has(pfx)) { /* leaf */ }
  }
  console.log('NOTE: total', allPaths.length);
}
const pd = diffEN('data/products.json');