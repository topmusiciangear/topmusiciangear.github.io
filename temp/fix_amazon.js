// Aplica correcciones de la fila Amazon a data/products.json y a TEST_SHOP_BTN.
//
// Uso: node temp/fix_amazon.js temp/amazon_fix.json [--dry]
//
// Cada entrada del JSON de entrada:
//   { "id": 348,
//     "store": "https://www.amazon.com/dp/NEWASIN",  // stores.amazon en products.json (o null = borrar)
//     "cfgUrl": "https://www.amazon.com/dp/NEWASIN", // urls.amazon en TEST_SHOP_BTN (o null = borrar)
//     "cfgPrice": "$59.00" }                        // prices.amazon (o null = borrar)
// Si se omite una clave, no se toca ese campo.
const fs = require('fs');

const dry = process.argv.includes('--dry');
const fixes = JSON.parse(fs.readFileSync(process.argv[2] || 'temp/amazon_fix.json', 'utf8'));
const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
const log = [];

// ---------- data/products.json ----------
let raw = fs.readFileSync('data/products.json', 'utf8');
const crlf = raw.includes('\r\n');
let lines = raw.split(crlf ? '\r\n' : '\n');

function productRange(arr, id) {
  const start = arr.findIndex(l => l.trim() === '"id": ' + id + ',');
  if (start < 0) return null;
  let end = arr.length;
  for (let i = start + 1; i < arr.length; i++) {
    if (/^\s{4}"id": \d+,?$/.test(arr[i])) { end = i; break; }
  }
  return [start, end];
}

for (const f of fixes) {
  if (!has(f, 'store')) continue;
  const r = productRange(lines, f.id);
  if (!r) { log.push('products.json: id ' + f.id + ' no encontrado'); continue; }
  const [start, end] = r;
  let idx = -1;
  for (let i = start; i < end; i++) if (/^\s{6}"amazon"\s*:/.test(lines[i])) { idx = i; break; }

  if (f.store === null) {
    if (idx < 0) { log.push('products.json: id ' + f.id + ' sin amazon (nada que borrar)'); continue; }
    const last = /,\s*$/.test(lines[idx]);
    lines.splice(idx, 1);
    if (!last) {
      let j = idx - 1;
      while (j >= start && !/\S/.test(lines[j])) j--;
      lines[j] = lines[j].replace(/,\s*$/, '');
    }
    log.push('products.json: id ' + f.id + ' amazon borrado');
  } else {
    const val = '"amazon": ' + JSON.stringify(f.store);
    if (idx >= 0) {
      const comma = /,\s*$/.test(lines[idx]) ? ',' : '';
      lines[idx] = '      ' + val + comma;
      log.push('products.json: id ' + f.id + ' amazon -> ' + f.store);
    } else {
      const sIdx = lines.findIndex((l, i) => i >= start && i < end && /^\s{4}"stores"\s*:\s*\{/.test(l));
      if (sIdx < 0) { log.push('products.json: id ' + f.id + ' sin bloque stores'); continue; }
      lines.splice(sIdx + 1, 0, '      ' + val + ',');
      log.push('products.json: id ' + f.id + ' amazon insertado -> ' + f.store);
    }
  }
}

if (!dry) fs.writeFileSync('data/products.json', lines.join(crlf ? '\r\n' : '\n'));

// ---------- build-guides.js / TEST_SHOP_BTN ----------
let g = fs.readFileSync('build-guides.js', 'utf8');
const gcrlf = g.includes('\r\n');
let gl = g.split(gcrlf ? '\r\n' : '\n');
const gStart = gl.findIndex(l => l.indexOf('const TEST_SHOP_BTN') === 0);

// Devuelve el objeto {urls|prices} como texto: { lineIdx, inner, kind }
function findObject(id, objName) {
  const re = new RegExp('^  ' + id + ':\\s*\\{');
  const start = gl.findIndex((l, i) => i > gStart && re.test(l));
  if (start < 0) return null;

  const single = /^  \d+: \{.*\},?$/.test(gl[start]) && gl[start].lastIndexOf('}') > gl[start].indexOf('{');
  if (single) {
    const line = gl[start];
    const m = line.match(new RegExp(objName + ':\\s*\\{'));
    if (!m) return null;
    const o = m.index + m[0].length;
    let d = 1, i = o;
    for (; i < line.length; i++) { if (line[i] === '{') d++; else if (line[i] === '}') { d--; if (!d) break; } }
    return { lineIdx: start, single: true, objStart: o, objEnd: i, inner: line.slice(o, i), name: objName };
  }

  let entryEnd = gl.length;
  for (let i = start + 1; i < gl.length; i++) if (/^  \},?$/.test(gl[i])) { entryEnd = i; break; }
  const objLine = gl.findIndex((l, i) => i >= start && i < entryEnd && new RegExp('^    ' + objName + ':\\s*\\{$').test(l));
  if (objLine < 0) return null;
  let close = -1;
  for (let i = objLine + 1; i < entryEnd; i++) if (/^    \},?$/.test(gl[i])) { close = i; break; }
  if (close < 0) return null;
  return { first: objLine, last: close, single: false, name: objName, entryStart: start, entryEnd };
}

function applyKey(id, objName, value) {
  const obj = findObject(id, objName);
  if (!obj) return 'sin ' + objName;

  if (obj.single) {
    let inner = obj.inner;
    const m = inner.match(/(^|,\s*)(amazon)\s*:\s*"[^"]*"/);
    if (value === null) {
      if (!m) return 'sin amazon en ' + objName;
      inner = inner.replace(m[0], m[1] === ',' ? '' : '');
      inner = inner.replace(/,\s*,/g, ',').replace(/^\s*,/, '').replace(/,\s*$/, '');
    } else if (m) {
      inner = inner.replace(m[0], m[1] + 'amazon: ' + JSON.stringify(value));
    } else {
      const sep = inner.trim() ? ', ' : '';
      inner = inner.replace(/\s*$/, '') + sep + 'amazon: ' + JSON.stringify(value) + (inner.trim() ? '' : '');
    }
    gl[obj.lineIdx] = gl[obj.lineIdx].slice(0, obj.objStart) + inner + gl[obj.lineIdx].slice(obj.objEnd);
    return value === null ? 'borrado (1 linea)' : (m ? 'reemplazado (1 linea)' : 'insertado (1 linea)');
  }

  // entrada multilinea
  let keyIdx = -1;
  for (let i = obj.first + 1; i < obj.last; i++) if (/^\s{6}"?amazon"?\s*:/.test(gl[i])) { keyIdx = i; break; }

  if (value === null) {
    if (keyIdx < 0) return 'sin amazon en ' + objName;
    const last = /,\s*$/.test(gl[keyIdx]);
    gl.splice(keyIdx, 1);
    if (!last) {
      let j = keyIdx - 1;
      while (j > obj.first && !/\S/.test(gl[j])) j--;
      gl[j] = gl[j].replace(/,\s*$/, '');
    }
    return 'borrado';
  }
  if (keyIdx >= 0) {
    const comma = /,\s*$/.test(gl[keyIdx]) ? ',' : '';
    gl[keyIdx] = '      amazon: ' + JSON.stringify(value) + comma;
    return 'reemplazado';
  }
  const prev = obj.last - 1;
  if (!/,\s*$/.test(gl[prev])) gl[prev] = gl[prev].replace(/\s*$/, ',');
  gl.splice(obj.last, 0, '      amazon: ' + JSON.stringify(value));
  return 'insertado';
}

for (const f of fixes) {
  for (const [key, objName] of [['cfgPrice', 'prices'], ['cfgUrl', 'urls']]) {
    if (!has(f, key)) continue;
    log.push('TEST_SHOP_BTN: id ' + f.id + ' ' + objName + '.amazon ' + applyKey(f.id, objName, f[key]));
  }
}

if (!dry) fs.writeFileSync('build-guides.js', gl.join(gcrlf ? '\r\n' : '\n'));

// ---------- verificacion ----------
if (!dry) {
  const src = fs.readFileSync('build-guides.js', 'utf8');
  const i = src.indexOf('const TEST_SHOP_BTN');
  const o = src.indexOf('{', i);
  let d = 0, e = -1;
  for (let k = o; k < src.length; k++) {
    if (src[k] === '{') d++;
    else if (src[k] === '}') { d--; if (!d) { e = k; break; } }
  }
  const T = new Function('return ' + src.slice(o, e + 1))();
  log.push('TEST_SHOP_BTN parsea OK, ' + Object.keys(T).length + ' claves');
  JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
  log.push('products.json parsea OK');
}

console.log(log.join('\n'));
if (dry) console.log('\n(DRY RUN: no se escribio nada)');
