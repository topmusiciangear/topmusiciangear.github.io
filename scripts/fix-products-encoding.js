const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');

function safeDecodeUtf8(bytes) {
  let result = '', i = 0;
  while (i < bytes.length) {
    const b = bytes[i];
    if (b < 0x80) { result += String.fromCharCode(b); i++; }
    else if (b >= 0xC0 && b < 0xE0) {
      if (i + 1 < bytes.length && bytes[i+1] >= 0x80 && bytes[i+1] < 0xC0) {
        result += String.fromCharCode(((b & 0x1F) << 6) | (bytes[i+1] & 0x3F));
        i += 2;
      } else { result += String.fromCharCode(b); i++; }
    } else if (b >= 0xE0 && b < 0xF0) {
      if (i + 2 < bytes.length && bytes[i+1] >= 0x80 && bytes[i+1] < 0xC0 && bytes[i+2] >= 0x80 && bytes[i+2] < 0xC0) {
        result += String.fromCharCode(((b & 0x0F) << 12) | ((bytes[i+1] & 0x3F) << 6) | (bytes[i+2] & 0x3F));
        i += 3;
      } else { result += String.fromCharCode(b); i++; }
    } else if (b >= 0xF0 && b < 0xF8) {
      if (i + 3 < bytes.length && bytes[i+1] >= 0x80 && bytes[i+1] < 0xC0 && bytes[i+2] >= 0x80 && bytes[i+2] < 0xC0 && bytes[i+3] >= 0x80 && bytes[i+3] < 0xC0) {
        result += String.fromCodePoint(((b & 0x07) << 18) | ((bytes[i+1] & 0x3F) << 12) | ((bytes[i+2] & 0x3F) << 6) | (bytes[i+3] & 0x3F));
        i += 3;
      } else { result += String.fromCharCode(b); i++; }
    } else { result += String.fromCharCode(b); i++; }
  }
  return result;
}

function fixStr(str) {
  if (!str || typeof str !== 'string') return str;
  let current = str;
  for (let round = 0; round < 10; round++) {
    const bytes = iconv.encode(current, 'win1252');
    const decoded = safeDecodeUtf8(Array.from(bytes));
    if (decoded === current) break;
    current = decoded;
  }
  return current;
}

const filePath = path.join(__dirname, '..', 'js', 'products.js');
const { products, categoryInfo, storeNames, storeColors, storeIcons } = require(filePath);

let fixed = 0;
products.forEach(prod => {
  ['title_es', 'desc_es'].forEach(f => {
    if (prod[f]) {
      const orig = prod[f];
      const fixedStr = fixStr(orig);
      if (fixedStr !== orig) {
        prod[f] = fixedStr;
        fixed++;
      }
    }
  });
});

function jsonToJs(val, indent) {
  const s = JSON.stringify(val, null, 2);
  if (indent) return s.split('\n').join('\n' + indent);
  return s;
}

let out = '';
out += 'const products = ' + JSON.stringify(products, null, 2) + ';\n\n';
out += 'const categoryInfo = ' + JSON.stringify(categoryInfo, null, 2) + ';\n\n';
out += 'const storeNames = ' + JSON.stringify(storeNames, null, 2) + ';\n\n';
out += 'const storeColors = ' + JSON.stringify(storeColors, null, 2) + ';\n\n';
out += 'const storeIcons = ' + JSON.stringify(storeIcons, null, 2) + ';\n\n';
out += 'if (typeof module !== \'undefined\' && module.exports) {\n';
out += '  module.exports = { products, categoryInfo, storeNames, storeColors, storeIcons };\n';
out += '}\n';

fs.writeFileSync(filePath, out, 'utf-8');
console.log('Fixed ' + fixed + ' fields. Written to products.js (dual-format)');
