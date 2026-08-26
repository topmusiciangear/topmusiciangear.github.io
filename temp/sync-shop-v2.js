var fs = require('fs');
var build = fs.readFileSync('build-guides.js', 'utf8');
var shop = fs.readFileSync('js/shop-buttons.js', 'utf8');

// Find TEST_SHOP_BTN in build-guides.js using brace counting
function findBlock(src, startMarker) {
  var idx = src.indexOf(startMarker);
  if (idx === -1) return null;
  var depth = 0, inStr = false, sc = '', start = idx;
  // Find opening brace
  var braceStart = src.indexOf('{', idx);
  depth = 0; inStr = false;
  for (var i = braceStart; i < src.length; i++) {
    var c = src[i];
    if (inStr) { if (c === sc && src[i-1] !== '\\') inStr = false; }
    else {
      if (c === "'" || c === '"' || c === '`') { inStr = true; sc = c; }
      else if (c === '{') depth++;
      else if (c === '}') { depth--; if (depth === 0) return src.substring(idx, i + 1); }
    }
  }
  return null;
}

var newBlock = findBlock(build, 'const TEST_SHOP_BTN');
var oldBlock = findBlock(shop, 'const TEST_SHOP_BTN');

if (!newBlock || !oldBlock) {
  console.log('ERROR: Could not find TEST_SHOP_BTN blocks');
  process.exit(1);
}

var result = shop.replace(oldBlock, newBlock);
fs.writeFileSync('js/shop-buttons.js', result, 'utf8');
console.log('shop-buttons.js: ' + shop.length + ' -> ' + result.length + ' bytes (diff: ' + (result.length - shop.length) + ')');
